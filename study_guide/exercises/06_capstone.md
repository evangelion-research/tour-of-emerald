# 6 · Capstone

Two complete programs that combine most of the tour. Take your time with these.

---

## 6.1 — Letter frequency

Write a program that counts how often each letter appears in some text (ignoring
case and non-letters) and prints the letters in alphabetical order, each with
its count. Try it on `"banana"`.

<details>
<summary>Hint</summary>

This is a trimmed-down version of lesson 16's word counter: collect lowercase
letters, `dict.bump` each into a `Map[int]`, then iterate
`sort.sorted_strs(dict.keys(counts))`.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex6_letter_frequency.rald`

```emerald
import strings
import chars
import dict
from dict import Map
import sort

def letters_of(text: str) -> list[str] {
    out: list[str] = []
    for c in text {
        if chars.is_alpha(c) { append(out, chars.to_lower(c)) }
    }
    return out
}

def report(text: str) -> None {
    counts: Map[int] = dict.new_map()
    for c in letters_of(text) { dict.bump(counts, c, 1) }
    for k in sort.sorted_strs(dict.keys(counts)) {
        print(k, dict.get_or(counts, k, 0))
    }
}

report("banana")
```

```text
a 3
b 1
n 2
```

</details>

---

## 6.2 — A tiny calculator

Model an arithmetic expression as a union, then evaluate it safely.

- `Expr` is a `num` (an int), an `add`, a `mul`, or a `div` of two `Expr`s.
- Declare an `error DivByZero` failure.
- `eval(e: Expr) -> Result[int, DivByZero]` returns the value, or a failure on
  division by zero.

Evaluate `5 + 2 * 3`, `10 / 2`, and `10 / 0`, printing each result (or its
failure reason).

<details>
<summary>Hint</summary>

Use `match` on `e` with one arm per case. In the `add`/`mul`/`div` arms, use
`try` to unwrap the two children. `div` must also check for a zero divisor.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex6_calculator.rald`

```emerald
from result import Result, ok, err, unwrap_or, why

error DivByZero

type Expr = { tag: "num", val: int }
          | { tag: "add", left: Expr, right: Expr }
          | { tag: "mul", left: Expr, right: Expr }
          | { tag: "div", left: Expr, right: Expr }

def eval(e: Expr) -> Result[int, DivByZero] {
    match e {
        { tag: "num", val: val } -> { return ok(val) }
        { tag: "add", left: left, right: right } -> {
            const a = try eval(left)
            const b = try eval(right)
            return ok(a + b)
        }
        { tag: "mul", left: left, right: right } -> {
            const a = try eval(left)
            const b = try eval(right)
            return ok(a * b)
        }
        { tag: "div", left: left, right: right } -> {
            const a = try eval(left)
            const b = try eval(right)
            if b == 0 { return err(DivByZero {}) }
            return ok(int(a / b))
        }
    }
}

const expr = {
    tag: "add",
    left: { tag: "num", val: 5 },
    right: { tag: "mul", left: { tag: "num", val: 2 }, right: { tag: "num", val: 3 } },
}
const okdiv = { tag: "div", left: { tag: "num", val: 10 }, right: { tag: "num", val: 2 } }
const baddiv = { tag: "div", left: { tag: "num", val: 10 }, right: { tag: "num", val: 0 } }

print(unwrap_or(eval(expr), 0))
print(unwrap_or(eval(okdiv), 0))
print(why(eval(baddiv)))
```

```text
11
5
division by zero
```

> Using `try` inside `match` arms propagates failures cleanly: if either child
> fails, the failure returns immediately — no nesting of `if ok` checks. This
> is the same mechanism from lesson 14.

</details>

### For the mathematician

This is an **algebraic data type** — a tree whose nodes are sums and products —
together with its **evaluation** function. `match` is structural induction on
the tree; `try` threads a possible failure (the "exception") monadically
through the recursion. This is the same shape as defining a tiny programming
language and its denotational semantics.
