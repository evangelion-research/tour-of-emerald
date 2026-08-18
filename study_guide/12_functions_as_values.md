# 12 · Functions as values

Store functions, build new ones, and shape data with `map`, `filter`, and
`reduce`.

## The idea

A function is a value like any other: you can put it in a name, pass it to
another function, and return it. A **lambda** is a small function with no name,
written inline. On top of that, Emerald provides three classic higher-order
tools — `map`, `filter`, `reduce` — plus `|>` and `>>` to compose functions into
a pipeline.

## The code

`study_guide/code/12_functions_as_values.rald`

```emerald
# A function is a value like any other: you can store it and pass it on.
def add_one(n: int) -> int { return n + 1 }

const f: (int) -> int = add_one
print(f(1))

# A lambda is a small function with no name. Its body is one expression.
const double = (n: int) => n * 2
print(double(21))

# map() runs a function over every item, giving back a new list.
const xs = [1, 2, 3, 4]
print(map((n) => n * n, xs))

# filter() keeps only the items your function says True for.
print(filter((n) => n % 2 == 0, xs))

# reduce() folds a list down to one value, carrying a running result.
print(reduce((running, n) => running + n, 0, xs))

# |> sends a value into a function, so a pipeline reads left to right.
def sum_of(ns: list[int]) -> int { return reduce((a, b) => a + b, 0, ns) }
def squares(ns: list[int]) -> list[int] { return map((n) => n * n, ns) }
print(xs |> squares |> sum_of)

# >> glues two functions into one.
const sum_of_squares = squares >> sum_of
print(sum_of_squares(xs))

# A lambda with no parameters is a way to delay work until you want it.
const later = () => sum_of_squares(xs)
print("nothing computed yet")
print(later())

# A function defined inside another function remembers the names around it,
# and can change them.
def make_counter() -> () -> int {
    n: int = 0
    def next() -> int {
        n = n + 1
        return n
    }
    return next
}
const tick = make_counter()
print(tick(), tick(), tick())
```

## What it prints

```text
2
42
[1, 4, 9, 16]
[2, 4]
10
30
30
nothing computed yet
30
1 2 3
```

## Key ideas

- **A function type** is written `(params) -> result`; `(int) -> int` is "int
  in, int out", and `() -> int` is "no input, int out".
- **Lambdas** use `=>` with a single-expression body: `(n) => n * n`. Parameter
  types can be inferred from context, so `(n) => n * n` works when `n` is known
  to be an int.
- **`map(f, list)`** returns a new list of `f` applied to each item.
- **`filter(p, list)`** keeps items for which `p` returns true.
- **`reduce(f, start, list)`** folds the list to one value using a running
  result.
- **`x |> f`** pipes a value into a function: `x |> f |> g` means `g(f(x))`,
  read left to right.
- **`f >> g`** composes two functions into a new one.
- **A zero-argument lambda defers work** until it is called — a tiny form of
  laziness.
- **Closures:** a function defined inside another remembers — and can change —
  the names around it. `make_counter` returns a `next` that owns its private
  `n`.

### For the mathematician

`map` is the functor action on lists; `filter` is a predicate-based sublist;
`reduce` is a fold (catamorphism) — the universal way to consume a list, the
discrete analogue of an integral/accumulating sum. `f >> g` is ordinary
composition `g ∘ f`. A closure is exactly a function together with a captured
environment — in the λ-calculus sense, a function value closes over its free
variables. Lesson 18 will show that Emerald keeps a careful eye on which of
these functions can *change* state and which cannot.

Next: [Modules →](13_modules.md)
