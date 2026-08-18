# 11 · Generics

Write a function once, for every type.

## The idea

Many functions do the same thing no matter what type they're handed. "Give me
the first item of a list" is the same job whether the list holds `int`s or
`str`s. A **generic** writes that function once, using a placeholder name for
"some type, decided at each call".

## The code

`study_guide/code/11_generics.rald`

```emerald
# Sometimes a function works the same way whatever type it is given.
# A name in [square brackets] stands for "some type, decided at each call".

def first[T](xs: list[T]) -> T {
    return xs[0]
}
print(first([1, 2, 3]))
print(first(["a", "b"]))

# Because T could be anything, the function cannot look inside a T —
# it can only move it around. That restriction is what makes it reusable.

def pair[A, B](a: A, b: B) -> { left: A, right: B } {
    return { left: a, right: b }
}
print(pair(1, "one"))
print(pair(True, 2.5))

# Type names can be generic too.
type Box[T] = { item: T }

def unwrap[T](b: Box[T]) -> T { return b.item }

const boxed_int: Box[int] = { item: 42 }
const boxed_str: Box[str] = { item: "hi" }
print(unwrap(boxed_int), unwrap(boxed_str))

# A generic function can take a function as a parameter.
def apply_twice[T](f: (T) -> T, x: T) -> T {
    return f(f(x))
}
def add_one(n: int) -> int { return n + 1 }
print(apply_twice(add_one, 10))
```

## What it prints

```text
1
a
{left: 1, right: 'one'}
{left: True, right: 2.5}
42 hi
12
```

## Key ideas

- **Type parameters go in square brackets:** `def first[T](xs: list[T]) -> T`.
- **The same function is instantiated per call.** `first([1,2,3])` makes `T =
  int`; `first(["a","b"])` makes `T = str`.
- **You can't look inside a `T`.** Since `T` could be anything, the body can
  only move values of type `T` around — never call methods on them or read
  fields. That restriction is what makes the function work for *every* type.
- **Several parameters** are fine: `[A, B]`.
- **Generic types** too: `type Box[T] = { item: T }`.
- **Function types are just types.** `(T) -> T` is "a function from `T` to
  `T`", and it can itself be a parameter.

### For the mathematician

`def first[T](xs: list[T]) -> T` is the universal statement
"for all types T, first : list T → T". You are quantifying over types. The
"cannot look inside a `T`" rule is *parametricity* (a.k.a. "theorems for free"):
a function that is polymorphic in `T` must behave the same way for every `T`,
because it has no information about which `T` it got. `pair` builds a product
`A × B`, and `apply_twice` is second-order: it takes a function as an argument
and composes it with itself.

Next: [Functions as values →](12_functions_as_values.md)
