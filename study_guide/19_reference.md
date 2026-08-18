# Reference

A cheat sheet for the Emerald you've met in this tour. Everything here appears
somewhere in lessons 1–18; this page collects it in one place.

## Running a program

```text
emeraldc run file.rald                 # run it
emeraldc --check --proof file.rald     # also reject `any` and `partial`
```

## Comments

```emerald
# everything from # to the end of the line is ignored
```

## Values

| Type | Examples |
| --- | --- |
| `int` | `42`, `-7`, `0` |
| `float` | `2.5`, `-0.1`, `3.0` |
| `str` | `"emerald"`, `'hi'` |
| `bool` | `True`, `False` |
| `None` | `None` |

## Names

```emerald
const x = 5          # immutable (preferred)
y: int = 5           # mutable; needs a type
y = y + 1            # reassignment
```

## Operators

```emerald
2 + 3    2 * 3    10 - 4    9 / 2    # 4.5 (always float)
9 % 2    1 == 1   1 != 2    1 < 2    2 <= 2   3 > 2   3 >= 4
a and b   a or b   not a
```

- `/` always produces a `float`; `%` is the remainder.
- Comparisons do **not** chain: write `1 < x and x < 10`.

## Truthiness

These count as `False`: `None`, `False`, `0`, `0.0`, `""`, `[]`. Everything
else counts as `True`.

## Control flow

```emerald
if cond { ... } elif cond { ... } else { ... }

for x in list { ... }
for i in range(5) { ... }        # 0..4
for i in range(1, 4) { ... }     # 1..3
while cond { ... }

break        # leave the loop
continue     # next iteration
```

## Built-in functions

| Call | Result |
| --- | --- |
| `print(a, b)` | print on one line, space-separated |
| `len(x)` | length of a list or string |
| `slice(x, from, to)` | a copy of the half-open `[from, to)` piece |
| `str(x)` | any value as a string |
| `append(list, item)` | add an item to the end (mutates) |
| `range(n)` / `range(a, b)` | `0..n-1` / `a..b-1` |
| `int(x)` | convert to int (e.g. truncating a float) |
| `map(f, list)` | new list of `f(x)` for each item |
| `filter(p, list)` | items where `p(x)` is true |
| `reduce(f, start, list)` | fold the list down to one value |

## Lists

```emerald
const xs = [1, 2, 3]
xs[0]                # first item (0-based)
xs[0] = 9            # only if xs was declared mutable:  xs: list[int] = [...]
append(xs, 4)        # xs becomes [9, 2, 3, 4]
[1, 2] == [1, 2]     # True — compares by contents
```

Type: `list[int]`, `list[str]`, `list[Point]`, …

## Functions

```emerald
def double(n: int) -> int {
    return n * 2
}

def shout(m: str) -> None {
    print(m + "!")
}

def add_one(n: int) -> int { return n + 1 }   # one-line body is fine
```

- `return expr` ends the function immediately.
- Parameters and return type are always written.
- No meaningful result → return `None`.

## Types

```emerald
type Name = { x: int, y: int }       # a record shape
type Shape = Circle | Square         # a union
type Point3 = Point & { z: int }     # extend a shape
type Box[T] = { item: T }            # a generic type
```

- Literal types: `"yes" | "no"`.
- `any` — no promise (opt-out; forbidden in proof mode).
- `never` — no values (used for exhaustiveness checks).

## Records

```emerald
const p = { x: 3, y: 4 }
p.x                 # field read
here: Point = { x: 0, y: 0 }
here.x = 10         # field write (mutable record)
```

- Records compare by contents.
- A record with extra fields still satisfies a smaller shape (structural).

## Unions & matching

```emerald
type Circle = { kind: "circle", r: int }
type Square = { kind: "square", side: int }
type Shape  = Circle | Square

def area(s: Shape) -> int {
    if s.kind == "circle" { return 3 * s.r * s.r }
    if s.kind == "square" { return s.side * s.side }
    impossible: never = s
    return 0
}

def name_of(s: Shape) -> str {
    match s {
        { kind: "circle", r: r } -> { return "circle, radius " + str(r) }
        _                        -> { return "not a circle" }
    }
}
```

- Checking `s.kind` narrows the type in that branch.
- `match` must cover every case; `_` is a wildcard; patterns can bind fields.

## Generics

```emerald
def first[T](xs: list[T]) -> T { return xs[0] }
def pair[A, B](a: A, b: B) -> { left: A, right: B } { return { left: a, right: b } }
```

## Functions as values

```emerald
const f: (int) -> int = add_one
const double = (n: int) => n * 2        # lambda
const later = () => sum_of_squares(xs)  # zero-arg lambda (defers work)

xs |> squares |> sum_of     # pipeline: sum_of(squares(xs))
squares >> sum_of           # composition into a new function
```

## Modules

```emerald
import strings
from lists import contains, sum as sum_of

strings.upper("emerald")        # qualified
contains([1, 2, 3], 2)          # unqualified
```

- A module is a file; leading `_` marks a name private.

## Standard library (the parts used in this tour)

| Module | Functions |
| --- | --- |
| `strings` | `upper`, `split`, `join`, `strip`, `starts_with`, `parse_int`, `pad_right` |
| `math` | `max_i`, `abs_i`, `gcd`, `floor`, `round`, `PI` |
| `lists` | `contains`, `sum`, `first`, `take` |
| `dict` | `new_map`, `set`, `get_or`, `bump`, `keys` — type `Map[V]` (str keys) |
| `sort` | `sorted_ints`, `sorted_strs`, `sorted(list, cmp)` |
| `io` | `write`, `read`, `read_lines`, `exists` |
| `sys` | `args`, `program`, `arg_count` |
| `result` | `Result`, `Option`, `ok`, `err`, `is_ok`, `unwrap_or`, `why` |
| `chars` | `is_alpha`, `to_lower` |

## Errors (no exceptions)

```emerald
from result import Result, Option, is_ok, unwrap_or, why, ok, err

def safe_divide(a: int, b: int) -> Result[int] {
    if b == 0 { return err("division by zero") }
    return ok(int(a / b))
}

is_ok(r)           # True / False
unwrap_or(r, d)    # value, or default d on failure
why(r)             # the failure reason
```

- `Result` is `{ ok: True, val: v }` or `{ ok: False, err: reason }`.
- `Option` is `{ some: True, val: v }` or `{ some: False }`.

## Tensors

```emerald
dim Rows, Cols
zeros([2, 3])            # 2×3 of 0.0
ones([2, 3])             # 2×3 of 1.0
tensor([[1.0, 2.0], [3.0, 4.0]])
shape(t)  ndim(t)  dtype(t)  item(t[0][0])
b + b     m * m     m * 10.0          # element-wise
matmul(a, b)                          # matrix multiply
sum(t, axis)                          # 0 = down columns, 1 = across rows
reshape(t, [r, c])  transpose(t)
randn([2, 2], seed)                   # reproducible by construction
```

Type: `Tensor[f32, [Rows, Cols]]` — the shape is part of the type.

## Promises

```emerald
def area(w: int, h: int) -> int pure { ... }        # no side effects
def countdown(n: int) -> int partial { ... }        # opts out of termination proof
```

- Total by default: recursion must walk into a structurally smaller input.
- `emeraldc --check --proof` rejects `any` and `partial`.

---

Back to the [index](index.md), or on to the [Exercises](exercises/index.md).
