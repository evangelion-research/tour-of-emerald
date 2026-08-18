# 6 · Lists

Hold many values in order, and build new lists from nothing.

## The idea

A **list** holds many values in a fixed order, all of the same type. You index
into it by position (starting at 0), and — if the list is mutable — you can
change items and append to it.

## The code

`study_guide/code/06_lists.rald`

```emerald
# A list holds many values in order. All of them must be the same type.
const primes = [2, 3, 5, 7]
print(primes)
print(len(primes))

# Positions are counted from 0, so the first item is at 0.
print(primes[0], primes[3])

# A list you intend to change needs its type written down.
scores: list[int] = [10, 20]
scores[0] = 99          # replace the item at position 0
append(scores, 30)      # add one on the end
print(scores)

# Building a list from nothing is the most common thing you will do.
squares: list[int] = []
for i in range(1, 6) {
    append(squares, i * i)
}
print(squares)

# slice(list, from, to) copies a piece out, leaving the original alone.
print(slice(squares, 0, 3))
print(squares)

# Lists compare by their contents.
print([1, 2] == [1, 2])

# Lists of text work the same way.
names: list[str] = []
append(names, "ada")
append(names, "alan")
print(names, len(names))
```

## What it prints

```text
[2, 3, 5, 7]
4
2 7
[99, 20, 30]
[1, 4, 9, 16, 25]
[1, 4, 9]
[1, 4, 9, 16, 25]
True
['ada', 'alan'] 2
```

## Key ideas

- **Write a list** with square brackets: `[2, 3, 5, 7]`.
- **All items share one type.** `[1, "a"]` would be a type error.
- **`len(list)`** is the number of items.
- **Index from 0.** `primes[0]` is the first item; `primes[3]` is the fourth.
- **To change a list, annotate its type:** `scores: list[int] = [10, 20]`.
  Then `scores[0] = 99` replaces an item, and `append(scores, 30)` adds one at
  the end.
- **Build up from empty:** start with `[]`, loop, and `append`.
- **`slice(list, from, to)`** copies a piece (exclusive of `to`), leaving the
  original untouched.
- **Lists compare by contents**, so `[1, 2] == [1, 2]` is `True`.

> **Two print styles.** `print(primes)` shows `[2, 3, 5, 7]`, but
> `print(names)` shows `['ada', 'alan']` — strings inside a container are shown
> with quotes, while a bare string prints unquoted. It's the same list either
> way; only the display differs.

### For the mathematician

A list of `int` is the type `list[int]`, a finite sequence of integers — think
of an element of `ℤⁿ` or of the free monoid on ℤ, depending on whether you care
about the fixed length. Indexing from 0 (rather than 1) means position `i` is
reached after `i` steps from the start, which pairs naturally with the
half-open `slice` convention. Mutating a list is an *imperative* operation —
contrast it with `map` in lesson 12, which builds a new list and leaves the old
one alone (the functional style Emerald steers you towards).

Next: [Functions →](07_functions.md)
