# 1 · Warm-up

These need only what's in lessons 1–6: printing, names, arithmetic, decisions,
and loops.

---

## 1.1 — Say hello to yourself

Store your name in a `const` and print `"Hello, <name>!"` by concatenating
strings.

<details>
<summary>Hint</summary>

Use `+` to join `"Hello, "`, the name, and `"!"`. See lesson 3.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex1_hello_name.rald`

```emerald
const name = "Ada"
print("Hello, " + name + "!")
```

```text
Hello, Ada!
```

</details>

---

## 1.2 — Temperature converter

Write `to_fahrenheit(c: float) -> float` converting Celsius to Fahrenheit:

```text
F = C × 9/5 + 32
```

Print the result for `0.0`, `100.0`, and `36.6`.

<details>
<summary>Hint</summary>

Use `9.0` and `5.0` so the arithmetic stays in floats (remember, `/` always
gives a float anyway).

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex1_temperature.rald`

```emerald
def to_fahrenheit(c: float) -> float {
    return c * 9.0 / 5.0 + 32.0
}

print(to_fahrenheit(0.0))
print(to_fahrenheit(100.0))
print(to_fahrenheit(36.6))
```

```text
32.0
212.0
97.88
```

</details>

---

## 1.3 — FizzBuzz

Print the numbers 1 through 15. But for multiples of 3 print `"Fizz"`, for
multiples of 5 print `"Buzz"`, and for multiples of both print `"FizzBuzz"`.

<details>
<summary>Hint</summary>

A number is a multiple of `n` when `i % n == 0`. Test 15 first, then 3, then 5.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex1_fizzbuzz.rald`

```emerald
for i in range(1, 16) {
    if i % 15 == 0 {
        print("FizzBuzz")
    } elif i % 3 == 0 {
        print("Fizz")
    } elif i % 5 == 0 {
        print("Buzz")
    } else {
        print(i)
    }
}
```

```text
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

</details>

---

## 1.4 — Sum of even numbers

Compute the sum of all even numbers from 1 to 100 inclusive (`2 + 4 + … + 100`)
and print it.

<details>
<summary>Hint</summary>

Loop `range(1, 101)`, and add `i` to a running total only when `i % 2 == 0`.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex1_sum_even.rald`

```emerald
total: int = 0
for i in range(1, 101) {
    if i % 2 == 0 {
        total = total + i
    }
}
print(total)
```

```text
2550
```

</details>
