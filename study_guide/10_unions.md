# 10 · Unions

A type that means "one of these", and how to handle every case with `match`.

## The idea

Sometimes a value can be *one of several kinds of thing*. A reply might be
`"yes"` or `"no"`; a shape might be a circle or a square; a name might be
present or absent. A **union** expresses exactly that, with `|`:

```text
type Answer = "yes" | "no"
type Shape  = Circle | Square
```

The classic pattern is a union of records, each carrying a `kind` tag saying
which one it is. Once you check the tag, the compiler knows which record you
have, and only lets you read the fields that exist for that case.

## The code

`study_guide/code/10_unions.rald`

```emerald
# A union type says "one of these". Write it with |.
type Answer = "yes" | "no"
const reply: Answer = "yes"
print(reply)

# The most useful shape in Emerald: several records, each with a tag
# saying which one it is.
type Circle = { kind: "circle", r: int }
type Square = { kind: "square", side: int }
type Shape  = Circle | Square

# Once you check the tag, the compiler knows which record you have, so
# `s.r` is allowed in the first branch and `s.side` in the second.
def area(s: Shape) -> int {
    if s.kind == "circle" { return 3 * s.r * s.r }
    if s.kind == "square" { return s.side * s.side }
    impossible: never = s     # explained below
    return 0
}
print(area({ kind: "circle", r: 2 }))
print(area({ kind: "square", side: 3 }))

# `never` is the type with no values at all. If you have handled every
# case, nothing is left, so assigning to a `never` succeeds. If you add
# a third shape and forget to handle it, this line stops compiling —
# the compiler finds the code you forgot to update.

# A value that may be missing is a union with None.
def greet(name: str | None) -> str {
    if name == None { return "hello, stranger" }
    return "hello, " + name
}
print(greet("ada"))
print(greet(None))

# `match` handles every case in one place, and must cover them all.
def name_of(s: Shape) -> str {
    match s {
        { kind: "circle" } -> { return "a circle" }
        { kind: "square" } -> { return "a square" }
    }
}
print(name_of({ kind: "circle", r: 1 }))

# A pattern can pull a field out into a name.
def report(s: Shape) -> str {
    match s {
        { kind: "circle", r: r } -> { return "circle, radius " + str(r) }
        _                        -> { return "not a circle" }
    }
}
print(report({ kind: "circle", r: 7 }))
print(report({ kind: "square", side: 2 }))
```

## What it prints

```text
yes
12
9
hello, ada
hello, stranger
a circle
circle, radius 7
not a circle
```

## Key ideas

- **A union says "one of these":** `A | B`. Members can be records, or even
  literal values like `"yes" | "no"` (called *literal types*).
- **Tag and narrow.** Checking `s.kind == "circle"` tells the compiler that in
  that branch, `s` is a `Circle` — so `s.r` is legal there and illegal
  elsewhere. This is *narrowing*.
- **`never` has no values.** After you've handled every case, nothing can be
  left, so `impossible: never = s` compiles. If you later add a `Triangle` to
  `Shape` and forget a branch, that line stops compiling — the compiler finds
  your forgotten case for you.
- **"Maybe there's no value"** is just the union `str | None`.
- **`match`** handles every case in one place, and the compiler requires the
  cases to be exhaustive.
- **Patterns can bind.** `{ kind: "circle", r: r }` pulls the radius into a
  name `r`; `_` is a wildcard that matches anything.

### For the mathematician

This is the **sum type** (coproduct, disjoint union) of type theory:
`Shape = Circle ⊔ Square`. A value of the union is a pair `(tag, payload)`.
Narrowing is *case analysis* (elimination): to define `f` on the union, you must
define it on each branch. The compiler forcing you to handle every case is the
universal property of the coproduct — and `never` is the empty type ∅, whose
appearance in a branch is exactly the "impossible case" (ex falso). `match` with
binding patterns is just pattern-matching induction.

Next: [Generics →](11_generics.md)
