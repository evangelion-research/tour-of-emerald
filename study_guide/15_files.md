# 15 · Files

Read and write files, and look at command-line arguments.

## The idea

Programs that do real work read input from files and write results back. In
Emerald, file operations return `Result` values (lesson 14), so a missing file
is a *value you handle*, not a crash. This lesson writes a file, reads it back,
reads it as lines, and inspects a missing file — then peeks at command-line
arguments.

## The code

`study_guide/code/15_files.rald`

```emerald
import io
import sys
from result import is_ok, unwrap_or, why

# Writing a file. io.write gives back a Result, so failure is visible.
const written = io.write("/tmp/emerald_demo.txt", "first line\nsecond line\n")
print("written ok:", is_ok(written))

# Reading it back.
const text = io.read("/tmp/emerald_demo.txt")
print(unwrap_or(text, "(could not read)"))

# Reading it as a list of lines is usually what you want.
const lines = io.read_lines("/tmp/emerald_demo.txt")
for line in unwrap_or(lines, []) {
    print("line:", line)
}

# Reading a file that is not there fails as a value, not a crash.
const missing = io.read("/tmp/definitely_not_here_12345.txt")
print("missing ok:", is_ok(missing))
print(why(missing))

# Does it exist?
print(io.exists("/tmp/emerald_demo.txt"), io.exists("/tmp/nope_12345"))

# Command-line arguments. sys.args() is everything after the program name.
print("program:", len(sys.program()) > 0)
print("argument count:", sys.arg_count())
```

## What it prints

```text
written ok: True
first line
second line

line: first line
line: second line
missing ok: False
cannot read '/tmp/definitely_not_here_12345.txt'
True False
program: True
argument count: 0
```

## Key ideas

- **`io.write(path, text)`** writes a file and returns a `Result`.
- **`io.read(path)`** returns the whole file as a `Result[str]`.
- **`io.read_lines(path)`** returns the file as a `Result[list[str]]` — one
  string per line.
- **`io.exists(path)`** asks whether a file is there.
- **Missing files are values.** `is_ok(missing)` is `False`; `why(missing)`
  tells you what went wrong. No exception, no crash.
- **Command-line arguments:** `sys.program()` is the program's own name and
  `sys.arg_count()` the number of arguments; `sys.args()` is the arguments
  themselves (everything after the program name).

> **Paths are platform-specific.** `/tmp/...` works on Unix-like systems. On
> other systems, use an equivalent temporary directory; the lesson's ideas are
> unchanged.

Next: [Word count →](16_word_count.md)
