# 5 · Tensors

These use the shape-checked tensors of lesson 17.

---

## 5.1 — Element-wise arithmetic and reductions

Build `a = [[1.0, 2.0], [3.0, 4.0]]` and `b = [[10.0, 20.0], [30.0, 40.0]]`.
Print their element-wise sum, the two column sums and two row sums of `a`, and
the total of all four elements of `a`.

<details>
<summary>Hint</summary>

`sum(t, 0)` sums down the columns, `sum(t, 1)` sums across the rows. Index into
the result and use `item()` to see a number.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex5_tensor_ops.rald`

```emerald
dim R, C

const a = tensor([[1.0, 2.0], [3.0, 4.0]])
const b = tensor([[10.0, 20.0], [30.0, 40.0]])

print(a + b)
print(item(sum(a, 0)[0]), item(sum(a, 0)[1]))
print(item(sum(a, 1)[0]), item(sum(a, 1)[1]))
print(item(sum(sum(a, 0), 0)))
```

```text
Tensor[f32, [2, 2]]
4.0 6.0
3.0 7.0
10.0
```

</details>

---

## 5.2 — Matrix multiplication

Multiply a 2×3 tensor of ones by a 3×2 tensor of ones with `matmul`, and print
two of the resulting entries.

<details>
<summary>Hint</summary>

Each entry of the result is a dot product over the inner dimension of length 3,
so every entry is `1+1+1 = 3.0`.

</details>

<details>
<summary>Show solution</summary>

`study_guide/exercises/code/ex5_matmul.rald`

```emerald
const z = matmul(ones([2, 3]), ones([3, 2]))
print(z)
print(item(z[0][0]), item(z[1][1]))
```

```text
Tensor[f32, [2, 2]]
3.0 3.0
```

</details>
