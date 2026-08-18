# 4 · Decisions

Make the program choose between alternatives with `if`, `elif`, and `else`.

## The idea

A program usually needs to do different things depending on its data. `if`
runs a block of code only when a question — an expression that gives `True` or
`False` — is true.

## The code

`study_guide/code/04_decisions.rald`

```emerald
const temperature = 18

# `if` runs a block only when its question is True.
if temperature > 25 {
    print("hot")
} elif temperature > 15 {
    print("mild")
} else {
    print("cold")
}

# The questions you can ask:
print(1 == 1)     # equal to
print(1 != 2)     # not equal to
print(1 < 2)      # less than
print(2 <= 2)     # less than or equal
print(3 > 2)      # greater than
print(3 >= 4)     # greater than or equal

# Combine questions with and / or / not.
const age = 20
const has_ticket = True
if age >= 18 and has_ticket { print("come in") }
if not has_ticket { print("no ticket") }

# WATCH OUT: unlike maths, you cannot chain comparisons.
# Write `1 < x and x < 10`, never `1 < x < 10`.
const x = 5
if 1 < x and x < 10 { print("x is between 1 and 10") }
```

## What it prints

```text
mild
True
True
True
True
True
False
come in
x is between 1 and 10
```

## Key ideas

- **`if` / `elif` / `else`** test conditions in order. The first one that is
  `True` runs; the rest are skipped. `else` is the catch-all.
- **Comparisons** are `==`, `!=`, `<`, `<=`, `>`, `>=`. Note `==` for equality
  (a single `=` is assignment, a very different thing).
- **Combine** conditions with `and`, `or`, `not`.
- **Blocks use braces `{ }`.** Indentation is only for readability, not
  meaning.
- **You cannot chain comparisons.** `1 < x < 10` is an error. Write
  `1 < x and x < 10`.

## Try it yourself

Change `temperature` to `30`, then to `10`, and predict which word prints each
time.

### For the mathematician

Comparison chaining like `a < b < c` is convenient in prose but ambiguous to a
compiler; Emerald asks you to be explicit with `and`. The condition expressions
are just propositions, and `and`/`or`/`not` are the usual logical connectives
∧, ∨, ¬.

---

## Truthiness: what counts as True?

`study_guide/code/04_truthiness.rald`

```emerald
# Some values count as False even though they are not the value False.
# These are: None, False, 0, 0.0, "" (empty text), [] (empty list).
if not 0 { print("0 is falsy") }
if not "" { print("empty text is falsy") }
if not [] { print("an empty list is falsy") }

# Everything else counts as True.
if "anything" { print("non-empty text is truthy") }
if 42 { print("any non-zero number is truthy") }
```

```text
0 is falsy
empty text is falsy
an empty list is falsy
non-empty text is truthy
any non-zero number is truthy
```

An `if` condition doesn't have to be a comparison — any value can be used. A
small, fixed set of values count as "false": `None`, `False`, `0`, `0.0`,
`""`, and `[]`. Everything else counts as true. This is *truthiness*, and it
lets you write `if not ""` or `if name` as a shorthand.

> **Tip:** the idiom `if x == None` and `if x != None` will appear a lot; it's
> how you test "is there a value here?".

Next: [Loops →](05_loops.md)
