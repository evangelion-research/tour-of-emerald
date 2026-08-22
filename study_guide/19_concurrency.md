# 19 · Concurrency

Start and coordinate independent tasks with green threads and channels.

## The idea

Sometimes a program needs to do several things at once — compute primes in the
background while the main program stays responsive, or fan work out to several
workers. Emerald's answer is **green threads**: lightweight, cooperative tasks
that communicate through **channels**.

Three primitives are all you need:

- **`spawn(f)`** — start a new task running `f`.
- **`chan(n)`** — create a channel with `n` buffer slots. Send on one end,
  receive on the other.
- **`join(t)`** — wait for a task to finish and collect its result.

Tasks are **cooperative**: exactly one runs at a time. Control changes hands
only at a channel operation, a `sleep`, a `join`, or an explicit
`task_yield()`. Because a statement is never interrupted halfway, `xs[i] = xs[i]
+ 1` is atomic and the language needs no locks.

## The code

`study_guide/code/19_concurrency.rald`

```emerald
# Green threads: cooperative tasks that talk over channels.
#
# `spawn` starts a task. `chan` connects two tasks. `join` waits for one
# to finish. Tasks are cooperative: exactly one runs at a time, and
# control changes hands only at a channel operation, a sleep(), a join(),
# or an explicit task_yield(). Nothing here needs a lock, because nothing
# can be interrupted mid-statement.

# --- the work ---------------------------------------------------------------
def is_prime(n: int) -> bool {
    if n < 2 { return False }
    d = 2
    while d * d <= n {
        if n % d == 0 { return False }
        d = d + 1
    }
    return True
}

# --- worker and reader -------------------------------------------------------
#
# A channel carries values between tasks. `chan(4)` makes a buffered
# channel with room for 4 items. `Chan[T]` is the type of a channel that
# carries T values.
results: Chan[str] = chan(4)

# The worker computes primes and sends them down the channel.
def worker(name: str) -> None {
    for n in range(2, 20) {
        if is_prime(n) { send(results, name + " found " + str(n)) }
    }
}

# The reader drains results as they arrive, printing each one.
def reader() -> None {
    while True {
        line = recv(results)   # None once the channel is closed
        if line == None { break }
        print(line)
    }
}

# Run both at once: the reader drains as the worker fills.
w = spawn(() => worker("w1"))
r = spawn(reader)

join(w)              # wait for the worker to finish
chan_close(results)  # signal "no more values"
join(r)              # wait for the reader to drain the rest

print("done")
```

## What it prints

```text
w1 found 2
w1 found 3
w1 found 5
w1 found 7
w1 found 11
w1 found 13
w1 found 17
w1 found 19
done
```

## Key ideas

- **`spawn` starts a task** concurrently. It takes a function of no arguments —
  wrap your worker in a lambda to capture any data it needs: `spawn(() =>
  worker("w1"))`.
- **`chan(n)` creates a buffered channel.** `send(c, val)` puts a value in;
  `recv(c)` takes one out. A send blocks if the buffer is full; a receive
  blocks if the buffer is empty. With `n = 0` you get a *rendezvous* channel
  where send and recv synchronise.
- **`Chan[T]` is typed.** `send` must carry a `T`; `recv` yields `T | None`
  because the closed channel adds `None` to the type. The compiler checks both
  ends.
- **`chan_close(c)`** tells receivers "no more values are coming". After the
  buffer drains, every `recv` returns `None`. Closing is how a producer signals
  consumers to stop — no sentinel values needed. Sending on a closed channel is
  a runtime error.
- **`join(t)` blocks until the task finishes**, and returns the task's result
  value. `Task[T]` is the type of a task that returns a `T`.
- **Cooperative means no locks.** A task never loses the CPU mid-statement, so
  every statement is atomic. The cost is that a task without a switch point
  (like `while True {}` with no channel operation) hangs the whole program.
- **Deadlock is reported, not hung.** If every task is blocked forever, the
  runtime prints a deadlock error with the file and line, rather than hanging.

> **Watch the loop-variable trap.** A `for` loop variable is one shared cell,
> so closing over it directly gives every task the last value. Bind it in a
> helper: `def start(name: str) -> Task[None] { return spawn(() => worker(name)) }`
> gives each task its own copy.

### For the mathematician

Green threads are the **communicating sequential processes** (CSP) pattern:
tasks are processes, channels are typed communication links, and the runtime
guarantees that each process runs atomically between switch points. `recv` on
a closed channel returning `None` (rather than blocking forever) makes every
receive loop *total* — it is a finite computation with a well-defined stop
condition, not an open-ended wait. `Chan[T]` and `Task[T]` make the types of
communicated values part of the program's static contract, the same way
`Result[T, E]` makes failure part of it.

Next: [Reference →](20_reference.md)