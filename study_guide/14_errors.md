# 14 · Errors

No exceptions: a function that can fail says so in its type.

## The idea

In many languages, when something goes wrong the program "throws an exception"
— a hidden, unwinding crash you have to remember to catch. Emerald does
something different: **failure is a value**. A function that might fail returns
a `Result`, and the caller must deal with it explicitly.

- A `Result[T]` is either a success carrying a value, or a failure carrying a
  reason.
- An `Option[T]` is the simpler "maybe there's nothing", with no reason
  attached.

Both are just tagged unions under the hood — which you already met in lesson 10.

## The code

`study_guide/code/14_errors.rald`

```emerald
# Emerald has no exceptions. A function that can fail says so in its type,
# and hands back a value describing what happened.
from result import Result, Option, is_ok, unwrap_or, why, ok, err
import strings

# strings.parse_int gives back a Result: either a value or a reason.
const good = strings.parse_int("123")
const bad  = strings.parse_int("banana")

print(is_ok(good), is_ok(bad))
print(unwrap_or(good, 0), unwrap_or(bad, 0))
print(why(bad))

# You can look inside a Result directly: it is just a tagged union.
if good.ok == True { print("parsed", good.val) }
if bad.ok == False { print("failed:", bad.err) }

# Writing your own failing function.
def safe_divide(a: int, b: int) -> Result[int] {
    if b == 0 { return err("division by zero") }
    return ok(int(a / b))
}
print(unwrap_or(safe_divide(10, 2), 0))
print(why(safe_divide(10, 0)))

# An Option is for "maybe there is nothing", with no reason attached.
import lists
const found = lists.first([10, 20])
const empty = lists.first([])
print(found, empty)
```

## What it prints

```text
True False
123 0
invalid digit in 'banana'
parsed 123
failed: invalid digit in 'banana'
5
division by zero
{some: True, val: 10} {some: False}
```

## Key ideas

- **`Result[T]`** is success-with-value or failure-with-reason. Build one with
  `ok(value)` and `err(reason)`.
- **`is_ok(r)`** asks "did it succeed?"; **`unwrap_or(r, default)`** gets the
  value or a fallback; **`why(r)`** gets the failure's reason.
- **Look inside directly** if you like: a `Result` has an `ok` flag and either
  a `val` (on success) or an `err` (on failure).
- **`Option[T]`** is the no-reason version: `{ some: True, val: v }` or
  `{ some: False }`. `lists.first` returns one.
- **The type advertises failure.** `def safe_divide(...) -> Result[int]` tells
  every caller "this can fail, handle it". Nothing crashes silently; the
  compiler makes sure you can't ignore a `Result` by accident.

### For the mathematician

`Result[T]` is the coproduct `T ⊔ E` where `E` is the error type (here, a
string reason); `Option[T]` is the coproduct `T ⊔ 1` — a value plus the unit
("nothing"). "Exceptions as control flow" is replaced by *explicitly threading
the sum type* through your functions, which is precisely the monadic
`Either`/`Maybe` pattern. Because the type encodes failure, totality (lesson 18)
is easier to state: a function is total if it is defined on every input,
*including* the ones that fail — it just returns the `err` branch instead of
crashing.

Next: [Files →](15_files.md)
