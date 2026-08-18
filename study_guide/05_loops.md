# 5 · Loops

Repeat a block of work: `for` over a list, `for` with `range`, and `while`.

## The idea

A loop runs the same block of code over and over. Emerald has two loop forms:

- **`for x in list`** — once for each item in a list (or each character in
  text).
- **`while condition`** — as long as the condition stays true.

Inside a loop you can keep a running total in a mutable name, and you can
`break` out early or `continue` to the next turn.

## The code

`study_guide/code/05_loops.rald`

```emerald
# `for` repeats a block once for each item in a list.
for fruit in ["apple", "pear", "fig"] {
    print("I have a", fruit)
}

# range(n) makes the list 0, 1, ... n-1. It is how you count.
for i in range(3) {
    print("step", i)
}

# range(from, to) starts somewhere else. `to` is not included.
for i in range(1, 4) {
    print(i, "squared is", i * i)
}

# Adding up as you go: keep a running total in a changing name.
total: int = 0
for i in range(1, 11) {
    total = total + i
}
print("1 + 2 + ... + 10 =", total)

# `while` repeats as long as its question stays True.
countdown: int = 3
while countdown > 0 {
    print(countdown)
    countdown = countdown - 1
}
print("lift off")

# `break` leaves the loop early. `continue` skips to the next turn.
for i in range(10) {
    if i == 3 { continue }
    if i > 5 { break }
    print("i is", i)
}

# A for loop also walks through text, one character at a time.
for letter in "hi" {
    print(letter)
}
```

## What it prints

```text
I have a apple
I have a pear
I have a fig
step 0
step 1
step 2
1 squared is 1
2 squared is 4
3 squared is 9
1 + 2 + ... + 10 = 55
3
2
1
lift off
i is 0
i is 1
i is 2
i is 4
i is 5
h
i
```

## Key ideas

- **`for x in list`** binds `x` to each item in turn.
- **`range(n)`** gives `0, 1, …, n-1` — exactly `n` values.
- **`range(from, to)`** gives `from, …, to-1` — again, `to` is excluded, so
  `range(1, 4)` is `1, 2, 3`.
- **Accumulate** by keeping a mutable name (`total: int = 0`) and updating it
  each turn. This is the single most common pattern in programming.
- **`while cond`** loops until `cond` becomes false — watch that the condition
  eventually *does* become false, or the loop never ends.
- **`break`** exits the loop; **`continue`** jumps to the next iteration. In the
  example above, `i == 3` is skipped, and the loop stops before printing `6`
  or later.
- A `for` loop also walks over a string character by character.

### For the mathematician

`range(a, b)` is the half-open interval `[a, b)`, so the number of iterations
is `b - a`. The running-total pattern is just the recursive definition of a sum
written iteratively: `totalₙ = totalₙ₋₁ + iₙ`. Loops are where mutable state
earns its keep — a neat preview of why later lessons push you to prefer pure,
immutable functions *most* of the time, and reach for mutation only when you
need it.

Next: [Lists →](06_lists.md)
