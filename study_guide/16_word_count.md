# 16 · Word count

A complete little program, end to end.

## The idea

You now have all the pieces of a real program: text handling, lists, records,
a dictionary, sorting, and functions to keep each idea in one place. This lesson
ties them together to solve a classic task — count how often each word appears
in some text, and print the most common words first.

The problem is broken into four small functions, each doing one step, so the
whole reads like a plan:

1. **`words_of`** — split text into clean, lowercase words.
2. **`tally`** — count each word into a dictionary.
3. **`to_counts`** — turn the dictionary into a sortable list of records.
4. **`top`** — sort by count and take the first `n`.

## The code

`study_guide/code/16_word_count.rald`

```emerald
import strings
import chars
import dict
from dict import Map
import sort
import lists

type Count = { word: str, n: int }

# Step 1 — turn a line of text into clean, lowercase words.
# Anything that is not a letter counts as a separator.
def words_of(text: str) -> list[str] {
    out: list[str] = []
    current: list[str] = []
    for c in text {
        if chars.is_alpha(c) {
            append(current, chars.to_lower(c))
        } else {
            if len(current) > 0 {
                append(out, strings.join("", current))
                current = []
            }
        }
    }
    if len(current) > 0 { append(out, strings.join("", current)) }
    return out
}

# Step 2 — tally them. dict.bump adds 1 to a counter, starting it at 0.
def tally(ws: list[str]) -> Map[int] {
    counts = dict.new_map()
    for w in ws { dict.bump(counts, w, 1) }
    return counts
}

# Step 3 — turn the tally into a list we can sort.
def to_counts(counts: Map[int]) -> list[Count] {
    out: list[Count] = []
    for k in sort.sorted_strs(dict.keys(counts)) {
        append(out, { word: k, n: dict.get_or(counts, k, 0) })
    }
    return out
}

# Step 4 — order by count, highest first. Ties stay alphabetical, because
# the list arrived sorted by word and the sort is stable.
def more_common(a: Count, b: Count) -> bool { return a.n > b.n }

def top(cs: list[Count], n: int) -> list[Count] {
    const ordered = sort.sorted(cs, more_common)
    if len(ordered) <= n { return ordered }
    return lists.take(ordered, n)
}

def report(text: str, n: int) -> None {
    const table = top(to_counts(tally(words_of(text))), n)
    for row in table {
        print(strings.pad_right(row.word, 10, " ") + str(row.n))
    }
}

const sample = "the quick brown fox jumps over the lazy dog. The dog barks, and the fox runs."

print("word counts:")
report(sample, 5)

print("")
print("total words:", len(words_of(sample)))
print("distinct words:", len(dict.keys(tally(words_of(sample)))))
```

## What it prints

```text
word counts:
the       4
dog       2
fox       2
and       1
barks     1

total words: 16
distinct words: 11
```

## Key ideas

- **Decompose the problem.** Four small, well-named functions beat one big
  block. Each function's name says what it does.
- **Build lists up** with `append` (as in `words_of`).
- **A dictionary counts** naturally: `dict.bump(counts, word, 1)` adds one to a
  word's tally, creating the entry at 0 if needed.
- **`Map[int]`** is "a map from string keys to int values".
- **Sorting needs a comparator.** `sort.sorted(list, cmp)` sorts by a function
  that says whether `a` should come before `b`. Because the list was sorted
  alphabetically first and the sort is *stable*, equal counts keep alphabetical
  order.
- **`lists.take(list, n)`** keeps just the first `n` items.

> **Punctuation is the separator.** `chars.is_alpha(c)` accepts letters only,
> so `"dog."` becomes `"dog"`, and `"The"` is lowercased to `"the"` — which is
> why `the` counts to 4. If you wanted a different rule (say, keep apostrophes),
> you'd change `words_of` and nothing else.

### For the mathematician

This is the "word frequency" problem — building a histogram, the discrete
analogue of a probability mass function. The pipeline
`words_of → tally → to_counts → top` is a composition of four maps between
data structures; each is separately checkable and separately testable. Sorting
by a comparator with a *stable* sort is how you get a total order that respects
two keys at once (count descending, then word ascending) — a lexicographic
order on a product, read right-to-left.

Next: [Tensors →](17_tensors.md)
