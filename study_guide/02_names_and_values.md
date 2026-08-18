# 2 · Names & values

Give values names so you can use them again, and meet the five basic kinds of
value.

## The idea

A **value** is a piece of information: a number, some text, a truth value. A
**name** lets you remember a value so you can use it later. Emerald has two
ways to make a name:

- `const greeting = "hello"` — the name is fixed forever. It will always point
  at this value.
- `score: int = 0` — the name may change. You write its type, then assign to it
  freely later.

## The code

`study_guide/code/02_names.rald`

```emerald
# A *name* remembers a value so you can use it later.
# `const` means: this name will never point at anything else.
const pi = 3.14159
const greeting = "hello"

print(greeting, pi)

# A name that DOES change is written with its type, then assigned freely.
score: int = 0
score = score + 10
score = score + 5
print("score:", score)

# Reading `score` does not change it. Only `=` changes it.
const doubled = score * 2
print(score, doubled)
```

## What it prints

```text
hello 3.14159
score: 15
15 30
```

## Key ideas

- `const name = value` creates an immutable name; the compiler will stop you
  from assigning to it again.
- `name: type = value` creates a **mutable** name; only these can be reassigned.
- Reading a name never changes it. Only `=` (assignment) changes it.
- Prefer `const`. Only reach for a mutable name when you genuinely need the
  value to change — you'll see the pattern in the loops lesson.

## Try it yourself

- Predict what `score` is after each assignment line above, before running.
- Make a new `const` and print it.

---

## The five basic values

`study_guide/code/02_values.rald`

```emerald
# A *value* is a piece of information. Emerald has five basic kinds.

print(42)          # an int   — a whole number
print(2.5)         # a float  — a number with a fractional part
print("emerald")   # a str    — text, always in quotes
print(True)        # a bool   — either True or False
print(None)        # None     — "there is no value here"
```

```text
42
2.5
emerald
True
None
```

Emerald's five basic kinds of value:

| Kind | Examples | Meaning |
| --- | --- | --- |
| `int` | `42`, `-7`, `0` | a whole number |
| `float` | `2.5`, `-0.1`, `3.0` | a number with a fractional part |
| `str` | `"emerald"`, `"42"` | text, always in quotes |
| `bool` | `True`, `False` | a truth value |
| `None` | `None` | "there is no value here" |

`42` and `"42"` are *different kinds* of value: one is a number you can add,
the other is text. The compiler keeps them apart.

### For the mathematician

The basic types are the ground sets you build on: `int` is (a bounded part of)
ℤ, `float` is an approximation of ℝ, `bool` is the two-element set
{True, False}, and `None` is a one-element set {None} — the "unit type", written
`()` in some systems. `str` is the set of finite strings over an alphabet. Later
you'll combine these into products (records) and coproducts (unions).

---

## Arithmetic

`study_guide/code/02_arithmetic.rald`

```emerald
print(2 + 3)      # add
print(10 - 4)     # subtract
print(6 * 7)      # multiply
print(9 / 2)      # divide  -> always gives a float, even for whole numbers
print(9 % 2)      # remainder after dividing ("modulo")

# Careful: division always produces a float.
print(10 / 5)     # 2.0, not 2

# Parentheses control what happens first, as in ordinary arithmetic.
print(2 + 3 * 4)
print((2 + 3) * 4)

# Mixing ints and floats gives a float.
print(1 + 0.5)
```

```text
5
6
42
4.5
1
2.0
14
20
1.5
```

The operators behave as you'd expect, with two rules to remember:

- **`/` always gives a float.** `10 / 5` is `2.0`, not `2`. If you want the
  whole-number part, there are builtins (like `int(...)`) you'll meet later.
- **`%` is the remainder**, handy for "is this even?" tests: `n % 2 == 0`.
- Parentheses force the order of evaluation, exactly as in arithmetic. `*` and
  `/` bind tighter than `+` and `-`.

### For the mathematician

`/` producing a float mirrors how you'd expect division of integers to land you
in ℚ (approximated here by `float`). `%` is the value `a mod b` in the range
`0 .. b-1`. If you want `floor(a/b)`, reach for `math.floor` (lesson 13) rather
than relying on integer division.

Next: [Text →](03_text.md)
