# 1 · Hello, world

The traditional first program: print a line of text.

## The idea

A program is a list of instructions, run one after another. The simplest useful
instruction is `print(...)`, which writes its arguments to the screen and then
moves to a new line.

Anything after a `#` on a line is a **comment**. The computer ignores it
completely — it exists to explain the program to a human (including future-you).

## The code

`study_guide/code/01_hello.rald`

```emerald
# Anything after a # is a comment. The computer ignores it; it is for you.
print("Hello, world!")
```

## What it prints

```text
Hello, world!
```

## Key ideas

- `print(...)` displays text on the screen.
- Text is written between quotes: `"Hello, world!"`.
- `#` starts a comment; everything from `#` to the end of the line is ignored.
- A program runs top to bottom, one line at a time.

## Try it yourself

Change the message and run it again. Add a second `print` line. Watch the output
appear in the same order as the lines in your file.

---

Here's a slightly bigger version, with three instructions and a first taste of
arithmetic:

`study_guide/code/01_greet.rald`

```emerald
print("Hello, world!")
print("I am learning Emerald.")
print("Two plus two is", 2 + 2)
```

```text
Hello, world!
I am learning Emerald.
Two plus two is 4
```

`print` can take several arguments separated by commas; it writes them all on
one line, separated by spaces. `2 + 2` is an expression that computes `4`, and
`print` turns it into text for you.

Next: [Names & values →](02_names_and_values.md)
