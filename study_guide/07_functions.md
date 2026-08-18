# 7 · Functions

Wrap a piece of work in a name you can call.

## The idea

A **function** is a named piece of work: it takes inputs (called
**parameters**), does something with them, and gives back one value (its
**return** value). Once defined, you can call it anywhere, as often as you like.

The shape of a definition is:

```text
def NAME(parameter: Type) -> ReturnType {
    ...body...
    return value
}
```

## The code

`study_guide/code/07_functions.rald`

```emerald
# A function is a named piece of work you can run whenever you like.
#   def NAME(INPUTS) -> WHAT_IT_GIVES_BACK { ... }

def double(n: int) -> int {
    return n * 2
}

print(double(5))
print(double(double(5)))

# Inputs are called parameters. A function can take several.
def area(width: int, height: int) -> int {
    return width * height
}
print(area(3, 4))

# A function that does something rather than computing something
# gives back None. Say so with `-> None`.
def shout(message: str) -> None {
    print(message + "!")
}
shout("hello")

# `return` stops the function immediately.
def sign(n: int) -> str {
    if n > 0 { return "positive" }
    if n < 0 { return "negative" }
    return "zero"
}
print(sign(3), sign(-3), sign(0))

# Names made inside a function belong to it, and vanish when it ends.
def scoped() -> int {
    hidden: int = 1
    return hidden
}
print(scoped())

# Functions calling functions is how programs are built.
def perimeter(w: int, h: int) -> int { return 2 * (w + h) }
def describe(w: int, h: int) -> str {
    return "area " + str(area(w, h)) + ", perimeter " + str(perimeter(w, h))
}
print(describe(3, 4))
```

## What it prints

```text
10
20
12
hello!
positive negative zero
1
area 12, perimeter 14
```

## Key ideas

- **Define with `def name(params) -> type { ... }`.** The return type is
  declared, not guessed.
- **`return expr`** hands a value back and ends the function immediately. After
  `return`, nothing else in the function runs.
- **Parameters are typed.** `area(width: int, height: int)` takes two ints.
- **No useful result? Return `None`.** Declare it as `-> None`; a function whose
  purpose is an effect (like printing) ends without a meaningful value.
- **Early return** is a clean way to handle cases: `sign` returns at the first
  branch that matches.
- **Scope:** a name defined inside a function exists only there. Once the
  function returns, it is gone.
- **Functions call functions.** This is how large programs are assembled from
  small, well-named pieces.

### For the mathematician

A function `def f(x: A) -> B` is a function `f: A → B` in the mathematical
sense, with the *domain* and *codomain* written down. The compiler checks that
the body is defined for the whole domain. The idea that a function has one
return value (not several) is exactly the ordinary notion of a function — as
opposed to a subroutine that just "does things". Functions that return `None`
are not really functions `A → B` at all; they are *effects*, which is why
lesson 18 will ask you to mark them and keep them apart from pure computations.

Next: [Types →](08_types.md)
