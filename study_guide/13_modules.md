# 13 · Modules

Split code into files, and reach for the standard library.

## The idea

A **module** is just a file of Emerald code. Its top-level `def`s and `type`s
can be imported into other files. A leading `_` marks a name private. The
**standard library** is a set of ordinary modules that ship with the language —
it is resolved with no flags, after explicit `-I` directories.

## The code

First, the module being imported:

`study_guide/code/_shapes_mod.rald`

```emerald
# A module is just a file. Its top-level defs and types are importable.
type Rect = { w: int, h: int }

def area(r: Rect) -> int { return r.w * r.h }
def perimeter(r: Rect) -> int { return 2 * (r.w + r.h) }

# A name starting with _ is private: other files cannot import it.
def _secret() -> str { return "not exported" }
```

Then the program that uses it, plus parts of the standard library:

`study_guide/code/13_modules.rald`

```emerald
# Bring in a whole module and use it with a dot.
import _shapes_mod

# Bring in specific names, so you can use them unqualified.
from _shapes_mod import Rect, perimeter

const r: Rect = { w: 3, h: 4 }
print(_shapes_mod.area(r))
print(perimeter(r))

# The standard library is a set of ordinary Emerald modules. No -I needed.
import strings
import math
from lists import contains, sum as sum_of

print(strings.upper("emerald"))
print(strings.split("a,b,c", ","))
print(strings.join("-", ["x", "y", "z"]))
print(strings.strip("   padded   "))
print(strings.starts_with("emerald", "eme"))

print(math.max_i(3, 9), math.abs_i(0 - 4), math.gcd(12, 18))
print(math.floor(2.7), math.round(2.5), math.PI)

print(contains([1, 2, 3], 2), sum_of([1, 2, 3, 4]))

# sort gives you ordering; dict gives you lookup by name.
import sort
import dict
print(sort.sorted_ints([3, 1, 2]))

const ages = dict.new_map()
dict.set(ages, "ada", 36)
dict.set(ages, "alan", 41)
print(dict.get_or(ages, "ada", 0), dict.get_or(ages, "nobody", 0))
print(sort.sorted_strs(dict.keys(ages)))
```

## What it prints

```text
12
14
EMERALD
['a', 'b', 'c']
x-y-z
padded
True
9 4 6
2 3 3.14159265359
True 10
[1, 2, 3]
36 0
['ada', 'alan']
```

## Key ideas

- **A module is a file.** Put definitions at the top level and import them.
- **`import mod`** brings in the whole module; use it qualified: `mod.area(r)`.
- **`from mod import a, b`** pulls in specific names for unqualified use.
- **`from mod import x as y`** renames on import.
- **A leading `_` marks a name private.** `_secret` cannot be imported.
- **Module paths resolve** first against the importing file's directory, then
  the project's `src/` root, then each `-I <dir>`, then the standard library.
  A project can shadow a stdlib module with its own.
- **The standard library** is 11 ordinary modules — the ones you'll meet here:
  - `strings` — `upper`, `split`, `join`, `strip`, `starts_with`, and (lesson 14)
    `parse_int`.
  - `math` — `max_i`, `abs_i`, `gcd`, `floor`, `round`, `PI`.
  - `lists` — `contains`, `sum`, `first`, `take`, and more.
  - `sort` — `sorted_ints`, `sorted_strs`, and a general `sorted`.
  - `dict` — `new_map`, `set`, `get_or`, `bump`, `keys`; the type is `Map[V]`
    (keys are strings).
  - `result` — `Result`, `Option`, `ok`, `err`, `is_ok`, `unwrap_or`, `why`,
    and the full combinator suite (lesson 14).
  - `chars` — `is_alpha`, `to_lower`, etc.
  - `io` — `write`, `read`, `read_lines`, `exists` (lesson 15).
  - `sys` — `args`, `program`, `arg_count` (lesson 15).
  - `path` — pure path-component manipulation.
  - `fmt` — small format-string helpers.

> **Dictionaries and sets** are builtin runtime values constructed with
> `dict()` and `set()`, not modules. Dictionaries are string-keyed; sets use
> `|`, `&`, `-`, `^` for union, intersection, difference, and symmetric
> difference.

### For the mathematician

A module is a namespace: a context that assigns meanings to names. Importing is
bringing definitions into scope — nothing more. A dictionary (`Map`) is a
partial function from keys to values; `get_or(m, k, d)` is the total extension
of that partial function, returning the default `d` where the key is undefined.
Sorting a list by a comparator `a.n > b.n` is just choosing a total preorder and
producing a representative sorted sequence.

Next: [Errors →](14_errors.md)