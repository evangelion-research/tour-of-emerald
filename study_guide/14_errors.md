# 14 · Errors

No exceptions: a function that can fail says so in its type.

## The idea

In many languages, when something goes wrong the program "throws an exception"
— a hidden, unwinding crash you have to remember to catch. Emerald does
something different: **failure is a value**. A function that might fail returns
a `Result`, and the caller must deal with it — the compiler makes sure of it.

Three simple pieces:

- **`error`** — declare a kind of failure. `error NotFound { key: str }` is
  sugar for a record with a tag.
- **`try`** — unwrap a `Result`, or hand the failure back to your caller.
- **`catch`** — handle every possible failure, exhaustively.

Under the hood, it's all just tagged unions — which you already met in
lesson 10. But the compiler checks that you never forget a case.

## The code

`study_guide/code/14_errors.rald`

```emerald
# Emerald has no exceptions. A function that can fail says so in its type.
# `error` declares a kind of failure — it is sugar for a record with a tag.
error Fail { reason: str }

# `Result[T, E]` means "produces a T, or fails with an E".
# E is the error type: the exact set of failures this function can return.
def safe_divide(a: int, b: int) -> Result[int, Fail] {
    if b == 0 { return err(Fail { reason: "division by zero" }) }
    return ok(int(a / b))
}

# `try e` unwraps a successful result. If it failed, the failure is handed
# straight back to this function's caller — so the return type must agree.
def double_after_divide(a: int, b: int) -> Result[int, Fail] {
    const n = try safe_divide(a, b)
    return ok(n * 2)
}

# `catch` handles every failure case. It is an expression — its value is
# whatever the success value or the matching arm produces.
def describe(a: int, b: int) -> str {
    return catch safe_divide(a, b) {
        Fail e -> "failed: " + e.reason
    }
}

print(describe(10, 2))
print(describe(10, 0))
print(unwrap_or(double_after_divide(6, 3), 0))
print(unwrap_or(double_after_divide(6, 0), 0))

# An Option[T] is the simpler "maybe there's nothing", with no reason.
import lists
const found = lists.first([10, 20])
const empty = lists.first([])
print(found, empty)

# You can inspect an Option directly: it is just a tagged union.
if found.some == True { print("found:", found.val) }
if empty.some == False { print("empty list") }
```

## What it prints

```text
5
failed: division by zero
4
0
{some: True, val: 10} {some: False}
found: 10
empty list
```

## Key ideas

- **`error Name { fields }`** declares a kind of failure. It desugars to a
  record with a literal `_tag` — the mechanism that lets the compiler tell
  errors apart and prove a `catch` is exhaustive.
- **`Result[T, E]`** is a success carrying a `T`, or a failure carrying an
  `E`. Build one with `ok(value)` and `err(Error { ... })`.
- **`try e`** unwraps a result. On success it gives you the value; on failure
  it returns the failure straight to your caller. This only works when
  your function's own return type can carry that error.
- **`catch e { ... }`** is an expression. Every error the expression can
  produce must be named by an arm or by a catch-all `_`. A missing arm is a
  compile error (not a surprise at runtime). Arms may bind the error to read
  its fields: `Fail e -> e.reason`.
- **`Option[T]`** is the no-reason version: `{ some: True, val: v }` or
  `{ some: False }`. `lists.first` returns one.
- **The type advertises failure.** `safe_divide`'s return type says exactly
  which failures it can produce. Nothing crashes silently; the compiler
  makes sure you can't ignore a `Result` by accident.

> **`unwrap_or` / `why` / `map_error` / `catch_all`** and friends live in
> `stdlib/result.rald`. They are ordinary Emerald, not builtin magic — use them
> when a function value reads better than an expression. The lesson above uses
> `unwrap_or` from this module for the printing examples.

### For the mathematician

`Result[T, E]` is the coproduct `T ⊔ E` where `E` is a union of error types;
`Option[T]` is the coproduct `T ⊔ 1` — a value plus the unit ("nothing").
`try` is monadic bind (propagate the failure), and `catch` is exhaustive case
analysis on the coproduct. Because the type encodes failure, totality is easier
to state: a function is total if it is defined on every input, *including* the
ones that fail — it just returns the `err` branch instead of crashing. The
compiler proving that a `catch` covers every case is the same machinery that
proves a `match` exhaustive (lesson 10).

Next: [Files →](15_files.md)