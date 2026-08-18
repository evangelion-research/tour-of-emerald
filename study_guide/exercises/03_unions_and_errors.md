# 3 · Unions & errors

These use unions, `match`, `Option`, and `Result` (lessons 10 and 14).

---

## 3.1 — Shape area

Define a `Shape` union with two cases — a circle (radius `r`) and a rectangle
(width `w`, height `h`) — and write `area(s: Shape) -> int`. Print the area of
a circle of radius 2 and a rectangle of 3×4.

<details>
<summary>Hint</summary>

Give each record a `kind` tag, check it with `if`, and use the
`impossible: never = s` trick to prove you handled every case (lesson 10).

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex3_shape_area.rald`

```emerald
type Circle = { kind: "circle", r: int }
type Rect   = { kind: "rect", w: int, h: int }
type Shape  = Circle | Rect

def area(s: Shape) -> int {
    if s.kind == "circle" { return 3 * s.r * s.r }
    if s.kind == "rect"   { return s.w * s.h }
    impossible: never = s
    return 0
}

print(area({ kind: "circle", r: 2 }))
print(area({ kind: "rect", w: 3, h: 4 }))
```

```text
12
12
```

> Try adding a `Triangle` case and watch the compiler point out the line you
> forgot to update.

</details>

---

## 3.2 — First item, or a default

`lists.first` returns an `Option` (`{ some: True, val: v }` or
`{ some: False }`). Write `first_or(xs: list[int], default: int) -> int` that
returns the first item, or `default` if the list is empty. Try it on `[10, 20]`
and on `[]`.

<details>
<summary>Hint</summary>

Inspect the option's `some` field directly with `if`, exactly as lesson 14
inspects a `Result`'s `ok` field.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex3_first_or.rald`

```emerald
import lists

def first_or(xs: list[int], default: int) -> int {
    const o = lists.first(xs)
    if o.some == True { return o.val }
    return default
}

print(first_or([10, 20], 0))
print(first_or([], 0))
```

```text
10
0
```

</details>

---

## 3.3 — Parse and double

Write `parse_double(s: str) -> Result[int]` that parses `s` as an integer and
returns its double — or a `Result` failure if `s` isn't a number. Print the
success of `"21"` and the reason for `"banana"`.

<details>
<summary>Hint</summary>

`strings.parse_int` returns a `Result`. Inspect its `ok` field; on success
return `ok(r.val * 2)`, on failure return `err(r.err)`.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex3_parse_double.rald`

```emerald
import strings
from result import Result, ok, err, unwrap_or, why

def parse_double(s: str) -> Result[int] {
    const r = strings.parse_int(s)
    if r.ok == True { return ok(r.val * 2) }
    return err(r.err)
}

print(unwrap_or(parse_double("21"), 0))
print(why(parse_double("banana")))
```

```text
42
invalid digit in 'banana'
```

</details>
