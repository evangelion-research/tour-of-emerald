# A Tour of Emerald

A guided, hands-on introduction to **Emerald** — a compiled, statically-typed
programming language that treats types as promises the compiler checks before
your program runs.

This repository holds the complete text of the tour, written as plain Markdown.
Read it on the [Tour of Emerald website](https://evangelion-research.github.io/tour-of-emerald/)
or in any Markdown viewer.

- **Lessons** live in [`study_guide/`](study_guide/) — start at
  [`study_guide/index.md`](study_guide/index.md).
- **Runnable examples** live in [`study_guide/code/`](study_guide/code/). Each
  program has its expected output alongside it in
  [`study_guide/code/expected/`](study_guide/code/expected/).
- **Exercises** (with solutions) live in
  [`study_guide/exercises/`](study_guide/exercises/).

## What is Emerald?

Emerald is a Python-flavored language with braces instead of indentation,
TypeScript-style structural typing instead of classes, a two-generation GC, and
a compiler written in modern C that emits native binaries via your system cc.

```emerald
type Point = { x: int, y: int }
type Point3 = Point & { z: int }  # structural "inheritance"

def mag2(p: Point) -> int {
    return p.x * p.x + p.y * p.y
}

p: Point3 = { x: 3, y: 4, z: 5 }
print(mag2(p))          # Point3 is-a Point by shape
```

A few things that set it apart:

- **Types are promises.** The compiler checks every promise before your program
  runs — no surprises at runtime. Literal types, unions, generics, and flow
  narrowing make the checker verify exhaustive case analysis.
- **Errors are values, not exceptions.** A function that can fail says so in its
  type and hands back a `Result[T, E]`. `try` propagates failure; `catch`
  handles it exhaustively. Nothing crashes silently.
- **Records and unions.** Data is modelled with records (like `{ x: int,
  y: int }`) and unions (like `Circle | Square`), with pattern matching that
  must cover every case.
- **Shape-checked tensors.** For numerical or machine-learning work, tensor
  shapes are part of the type, so a matrix-multiply mismatch is a compile error,
  not a runtime crash.
- **Compiler-checked promises.** Functions can be marked `pure` (no side
  effects), are total by default (structural recursion only), and
  `emeraldc --check --proof` rejects code with gaps in it.
- **Green threads.** `spawn`, `join`, and `chan` for cooperative concurrency —
  nothing is interrupted mid-statement, so the language needs no locks.
- **A standard library of ordinary Emerald.** Eleven modules: `result`, `chars`,
  `strings`, `builder`, `lists`, `sort`, `math`, `io`, `sys`, `path`, `fmt` —
  plus builtin `dict()` and `set()` collections.

## Who is this for?

The tour is written to be approachable by **two audiences at once**:

- **New programmers**, who learn the language from the ground up.
- **Mathematicians and scientists**, who will recognise familiar ideas —
  algebraic data types, structural recursion as induction, and types as
  propositions. A short "For the mathematician" note appears where the
  connection is worth spelling out.

## How the tour is organised

The tour follows the pattern of *A Tour of Go*: a series of short lessons, each
built around one idea and one runnable program.

| Section | What you learn |
| --- | --- |
| [Welcome & setup](study_guide/00_getting_started.md) | What Emerald is, how to run it |
| [01 · Hello, world](study_guide/01_hello_world.md) | The smallest program |
| [02 · Names & values](study_guide/02_names_and_values.md) | `const`, variables, the five basic values, arithmetic |
| [03 · Text](study_guide/03_text.md) | Strings: joining, slicing, converting |
| [04 · Decisions](study_guide/04_decisions.md) | `if`/`elif`/`else`, truthiness, comparisons |
| [05 · Loops](study_guide/05_loops.md) | `for`, `while`, `range`, `break`/`continue` |
| [06 · Lists](study_guide/06_lists.md) | Ordered collections, indexing, building lists |
| [07 · Functions](study_guide/07_functions.md) | Defining and calling functions |
| [08 · Types](study_guide/08_types.md) | Why types exist, and how to read them |
| [09 · Records](study_guide/09_records.md) | Grouping values under names |
| [10 · Unions](study_guide/10_unions.md) | "One of these" types and pattern matching |
| [11 · Generics](study_guide/11_generics.md) | Functions and types that work for any type |
| [12 · Functions as values](study_guide/12_functions_as_values.md) | Lambdas, `map`/`filter`/`reduce`, pipelines |
| [13 · Modules](study_guide/13_modules.md) | Importing code and the standard library |
| [14 · Errors](study_guide/14_errors.md) | `error` declarations, `try`/`catch`, `Result` instead of exceptions |
| [15 · Files](study_guide/15_files.md) | Reading and writing files, command-line args |
| [16 · Word count](study_guide/16_word_count.md) | A complete program, end to end |
| [17 · Tensors](study_guide/17_tensors.md) | Grids of numbers with checked shapes |
| [18 · Promises](study_guide/18_promises.md) | `pure`, termination, and proof mode |
| [19 · Concurrency](study_guide/19_concurrency.md) | Green threads, tasks, and channels |
| [Reference](study_guide/20_reference.md) | Syntax and standard-library cheat sheet |

## Quick start

```text
# Requires a C compiler
$ emeraldc run hello.rald
Hello, world!

# Check + proof mode
$ emeraldc --check --proof file.rald
```

The compiler is invoked as `emeraldc`. Source files use the `.rald` extension.

## Status

Emerald is pre-1.0. The tour documents the language as it exists in the
[upstream repository](https://github.com/evangelion-research/emerald); names,
the standard library, and the command-line interface may still change before
the 1.0 release.
