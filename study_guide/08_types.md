# 8 · Types

A type is a promise about what kind of value a name holds — and the compiler
checks every promise.

## The idea

Every value has a **type**: `int`, `str`, `list[int]`, and so on. When you
write a type down, you're making a promise — "this name holds an `int`", "this
function takes a `str` and returns a `str`". The compiler reads your whole
program *before* running it and verifies every promise. If any could be broken,
it refuses to run the program and tells you where.

## The code

`study_guide/code/08_types.rald`

```emerald
# A *type* is a promise about what kind of value a name holds.
# The compiler checks every promise before your program ever runs.

const count: int = 3
const label: str = "apples"
print(count, label)

# Writing the type down is how you get help. This function promises to take
# an int and give back a str; the compiler holds it to that.
def describe(n: int) -> str {
    return str(n) + " apples"
}
print(describe(count))

# Types also travel through lists and functions.
const numbers: list[int] = [1, 2, 3]
def total(xs: list[int]) -> int {
    running: int = 0
    for x in xs { running = running + x }
    return running
}

# (A name like `sum` would not work here: `sum` is one of Emerald's builtin
# functions, and builtin names cannot be reused for your own variables.)
print(total(numbers))

# `any` means "I am not promising anything". It switches the checking off,
# so use it only when you must.
loose: any = 5
loose = "now a str"
print(loose)
```

## What it prints

```text
3 apples
3 apples
6
now a str
```

## Key ideas

- **A type is a promise.** `const count: int = 3` promises "`count` is an int".
- **The compiler checks before running.** Type errors are found up front, not
  when the program happens to execute a bad line.
- **Types compose.** You can write `list[int]` ("a list of ints") and functions
  over them, and the compiler checks the whole chain.
- **Builtin names are reserved.** Names like `sum` are already taken by the
  language, so don't use them for your own variables.
- **`any` opts out.** It means "I make no promise", which turns checking off
  for that value. It exists for escape hatches; proof mode (lesson 18) forbids
  it entirely.

## Why bother? A story

Suppose you wrote `def describe(n: int) -> str` and then, by accident, called
`describe("banana")`. Without types, the program might run and print something
nonsensical — or crash far from the actual mistake. With types, the compiler
stops and says: "you promised `describe` takes an `int`, but you gave it a
`str`". The bug is caught at the moment it is written, at the exact line,
instead of weeks later in production.

### For the mathematician

Types are sets, and the compiler is a proof assistant that checks your program
is a valid map between those sets. `any` is the top type (every value inhabits
it), and — as you'll see in lesson 10 — `never` is the bottom type (nothing
inhabits it). Writing `-> str` is committing to the codomain; the compiler
guarantees every code path produces an element of it. This is the same
"well-typed programs don't go wrong" idea that underlies typed λ-calculus and
proof assistants.

Next: [Records →](09_records.md)
