# 2 · Functions & data

These use functions, lists, and records (lessons 6–9).

---

## 2.1 — Factorial

Write `factorial(n: int) -> int` returning `n!` (the product `1 × 2 × … × n`,
with `0! = 1`). Print `factorial(0)`, `factorial(5)`, and `factorial(10)`.

<details>
<summary>Hint</summary>

Start `result` at `1` and multiply by each `i` in `range(1, n + 1)`. For
`n = 0` the loop body never runs, so the answer stays `1` — which is exactly
right.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex2_factorial.rald`

```emerald
def factorial(n: int) -> int {
    result: int = 1
    for i in range(1, n + 1) {
        result = result * i
    }
    return result
}

print(factorial(0))
print(factorial(5))
print(factorial(10))
```

```text
1
120
3628800
```

</details>

---

## 2.2 — Fibonacci

Write `fib(n: int) -> int` returning the n-th Fibonacci number, with
`fib(0) = 0`, `fib(1) = 1`, and `fib(n) = fib(n-1) + fib(n-2)`. Print
`fib(10)`.

<details>
<summary>Hint</summary>

Keep two running values, `a` and `b`, and step them forward `n` times. This is
faster than the literal recursive definition, and avoids the termination
question entirely (see lesson 18).

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex2_fibonacci.rald`

```emerald
def fib(n: int) -> int {
    a: int = 0
    b: int = 1
    for i in range(n) {
        next: int = a + b
        a = b
        b = next
    }
    return a
}

print(fib(10))
```

```text
55
```

</details>

---

## 2.3 — Distance between points

Define `type Point = { x: int, y: int }` and write
`distance_squared(p: Point, q: Point) -> int`, the squared Euclidean distance
`(p.x − q.x)² + (p.y − q.y)²`. Print it for `(0,0)`→`(3,4)` and
`(1,1)`→`(2,2)`.

<details>
<summary>Hint</summary>

Compute `dx` and `dy` as `const`s, then return `dx * dx + dy * dy`. (We square
rather than take a square root to stay with `int`s — the square root is a
builtin away, but squaring keeps the exercise self-contained.)

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex2_distance.rald`

```emerald
type Point = { x: int, y: int }

def distance_squared(p: Point, q: Point) -> int {
    const dx = p.x - q.x
    const dy = p.y - q.y
    return dx * dx + dy * dy
}

const origin = { x: 0, y: 0 }
const target = { x: 3, y: 4 }
print(distance_squared(origin, target))
print(distance_squared({ x: 1, y: 1 }, { x: 2, y: 2 }))
```

```text
25
2
```

</details>

---

## 2.4 — Maximum of a list

Write `maximum(xs: list[int]) -> int` returning the largest value in a
non-empty list. Print it for `[3, 1, 4, 1, 5, 9, 2]`.

<details>
<summary>Hint</summary>

Start `best` at `xs[0]`, then walk the list, replacing `best` whenever you see
something bigger.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex2_maximum.rald`

```emerald
def maximum(xs: list[int]) -> int {
    best: int = xs[0]
    for x in xs {
        if x > best { best = x }
    }
    return best
}

print(maximum([3, 1, 4, 1, 5, 9, 2]))
```

```text
9
```

</details>
