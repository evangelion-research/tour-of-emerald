# Welcome & setup

This page explains what Emerald is, who it is for, and how to run a program.

## What is Emerald?

Emerald is a **compiled**, **statically-typed** language. "Statically-typed"
means the compiler checks the types of everything in your program *before* the
program runs, so an entire class of mistakes — calling a function with the wrong
kind of value, reading a field that doesn't exist, forgetting to handle a case —
is caught early.

Emerald has a Python-flavored surface with braces instead of indentation,
TypeScript-style structural typing instead of classes, and a compiler written in
modern C that emits native binaries. A few ideas you won't find in every
language:

1. **Values and names.** There are five basic kinds of value: `int`, `float`,
   `str`, `bool`, and `None`. A `const` name remembers a value forever; a name
   written with a type (`score: int = 0`) may change.
2. **Records and unions.** Data is grouped into *records*
   (`{ x: 3, y: 4 }`) and combined with *unions* (`Circle | Square`). This is
   how Emerald expresses the "product types" and "sum types" of mathematics.
3. **Errors are values.** There are no exceptions. A function that can fail
   returns a `Result[T, E]`, and you handle the failure explicitly with `try`
   and `catch`.
4. **Functions are values.** You can store them, pass them around, and build new
   ones from old ones.
5. **Tensors with checked shapes.** For numerical work, a tensor's shape is part
   of its type.
6. **Promises the compiler enforces.** A function can be marked `pure` (no side
   effects), and the compiler can prove that a function *terminates*. In proof
   mode, Emerald rejects code that has gaps.

## Installing Emerald

> Emerald is pre-1.0, so the exact installation steps and command-line flags are
> still settling. The examples in this tour are written against the language as
> it exists here. One flag is already stable enough to mention: the compiler is
> invoked as `emeraldc`.

To follow along, you will need the Emerald compiler, `emeraldc`. Build it from
the upstream source at [github.com/evangelion-research/emerald](https://github.com/evangelion-research/emerald)
and make sure `emeraldc` is on your `PATH`.

Check it works:

```text
$ emeraldc --version
```

## Your first program

Create a file called `hello.rald`:

```emerald
print("Hello, world!")
```

Run it:

```text
$ emeraldc run hello.rald
Hello, world!
```

> Emerald source files use the `.rald` extension in this tour. If that changes
> before 1.0, the tour will be updated to match.

That's the whole loop: **write a `.rald` file, run it, read the output.** Every
lesson from here on follows it.

## Checking more than "it runs"

Later you'll meet two flags worth knowing up front:

```text
$ emeraldc run       hello.rald   # run a program
$ emeraldc --check --proof hello.rald   # also prove purity & termination, reject gaps
```

The plain run catches type errors. `--check --proof` goes further and rejects
`any` and `partial` anywhere in the program, leaving only code whose types are
complete and whose functions are known to finish. This is the "promise" idea
from [lesson 18](18_promises.md).

## A note to new programmers

Programming is just giving the computer a very precise list of instructions.
You'll learn a handful of building blocks — values, names, decisions, loops,
functions — and then spend the rest of your life combining them. Emerald's
compiler is your ally: when it complains, it is telling you, in effect, "I can
see that this *might* go wrong, and I refuse to run it." That's a feature, not a
nuisance. Every compiler error is a bug you didn't have to hunt down at runtime.

Take the lessons slowly, type in every example, and *predict* each program's
output before you run it. Guessing and being surprised is how you learn.

## A note to mathematicians

If you are comfortable with mathematics, you already know more programming than
you might think:

- A **type** is like a set: `int` is ℤ (well, a machine-sized part of it),
  `bool` is the two-element set {True, False}, `str | None` is a disjoint union.
- A **record** is an ordered tuple with named coordinates (a finite product).
- A **union** is a disjoint union (coproduct); **pattern matching** is case
  analysis.
- A **function** `f: A -> B` is exactly a function between sets — it is *total*:
  defined on every element of `A`. Emerald even lets the compiler enforce that
  (lesson 18).
- A **generic** `def first[T](...)` is a universally quantified statement
  "for all types T".
- **Structural recursion** — a function that calls itself only on a strictly
  smaller piece of its input — is induction. Emerald's totality checker is
  literally checking that your recursion is well-founded.

Throughout the tour, a short **For the mathematician** note appears wherever the
connection deserves a sentence.

## A note to programmers coming from Python, JavaScript, or Go

- **Indentation is not significant.** Blocks are written with braces `{ }`, not
  whitespace.
- **Comparisons don't chain.** `1 < x < 10` is a type error in Emerald; write
  `1 < x and x < 10`.
- **`const` is the default.** A name is only allowed to change if you annotate
  it with a type. `x = 5` (no `const`, no type) does not create a variable.
- **There are no exceptions.** Errors are returned as values (lesson 14).
- **Division is always floating point.** `9 / 2` is `4.5`; `10 / 5` is `2.0`,
  not `2`.

Ready? [Lesson 1: Hello, world →](01_hello_world.md)