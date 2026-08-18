# 4 · Higher-order functions

These use `map`, `filter`, `reduce`, lambdas, and closures (lesson 12).

---

## 4.1 — Sum of squares of evens

Given `[1, 2, …, 10]`, compute the sum of the squares of the even numbers:
`2² + 4² + 6² + 8² + 10² = 220`.

<details>
<summary>Hint</summary>

Chain `filter` (evens) into `map` (square) into `reduce` (sum). Named functions
or lambdas both work.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex4_sum_squares_evens.rald`

```emerald
def is_even(n: int) -> bool { return n % 2 == 0 }
def square(n: int) -> int { return n * n }

const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(reduce((a, b) => a + b, 0, map(square, filter(is_even, xs))))
```

```text
220
```

</details>

---

## 4.2 — A counter that counts by a step

Write `make_counter(step: int) -> () -> int` that returns a function which adds
`step` each time it is called (starting at 0). Make a step-2 counter and a
step-10 counter and call each a few times.

<details>
<summary>Hint</summary>

This is lesson 12's `make_counter`, but the captured `n` advances by `step`
instead of 1. Each call to `make_counter` creates a *fresh* `n`.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex4_counter.rald`

```emerald
def make_counter(step: int) -> () -> int {
    n: int = 0
    def next() -> int {
        n = n + step
        return n
    }
    return next
}

const by_two = make_counter(2)
const by_ten = make_counter(10)
print(by_two(), by_two(), by_two())
print(by_ten(), by_ten())
```

```text
2 4 6
10 20
```

</details>

---

## 4.3 — Compose and pipeline

Given `double(n)` and `add_one(n)`, build `double >> add_one` and print it
applied to `5`. Then pipeline `5` through both orders and print each.

<details>
<summary>Hint</summary>

`f >> g` means "do `f`, then `g`". `x |> f |> g` means the same, read left to
right. Order matters: `add_one` then `double` differs from `double` then
`add_one`.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex4_pipeline.rald`

```emerald
def double(n: int) -> int { return n * 2 }
def add_one(n: int) -> int { return n + 1 }

const double_then_add = double >> add_one
print(double_then_add(5))

print(5 |> double |> add_one)
print(5 |> add_one |> double)
```

```text
11
11
12
```

</details>
