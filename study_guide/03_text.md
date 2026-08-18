# 3 · Text

Work with strings: join them, measure them, slice them, and convert other
values into them.

## The idea

Text in Emerald is a value of type `str` — a sequence of characters. This lesson
shows the everyday operations: joining strings, finding their length, quoting,
escape sequences, taking a slice, and turning other values into text.

## The code

`study_guide/code/03_text.rald`

```emerald
const name = "Ada"

# Joining text together is called concatenation. Use +.
print("Hello, " + name + "!")

# len() tells you how many characters are in a str.
print(len(name))

# Quotes can be single or double; use the other kind to include one.
print('She said "hi"')
print("it's fine")

# \n means "start a new line", \t means "tab".
print("line one\nline two")

# slice(text, from, to) takes a piece. Counting starts at 0, and the
# `to` position is not included.
const word = "emerald"
print(slice(word, 0, 2))
print(slice(word, 2, 7))

# str() turns any value into text, so you can join it onto a str.
const age = 36
print("age: " + str(age))

# print() with commas does that conversion for you, adding spaces.
print("age:", age)
```

## What it prints

```text
Hello, Ada!
3
She said "hi"
it's fine
line one
line two
em
erald
age: 36
age: 36
```

## Key ideas

- **Concatenate with `+`.** `"Hello, " + name + "!"` glues strings together.
- **`len(s)`** is the number of characters.
- **Either quote works.** Use `"..."` or `'...'`; pick the one that doesn't
  clash with the quotes you need inside.
- **`\n` is a newline, `\t` a tab.** A backslash inside a string escapes the
  next character.
- **`slice(s, from, to)`** copies characters from index `from` up to (but not
  including) `to`. Counting starts at 0, so `slice("emerald", 0, 2)` is `"em"`.
- **`str(x)`** converts any value to text.
- **`print` with commas** converts each argument and separates them with spaces
  — often the most convenient way to print a value alongside a label.

> **Off-by-one is the classic bug.** `slice(word, 2, 7)` gives characters at
> positions 2,3,4,5,6 — *five* characters, because `7 - 2 = 5`. The `to` index
> is exclusive. Keep saying "up to but not including" until it's automatic.

### For the mathematician

A string is a finite sequence (a word over an alphabet). `slice(s, i, j)` is the
subsequence `s[i..j)`, the half-open interval convention. Half-open intervals
make lengths additive: the length of `s[i..j)` is exactly `j - i`, with no
`+1` or `-1` fudge factors.

Next: [Decisions →](04_decisions.md)
