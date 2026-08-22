# 17 · Tensors

Grids of numbers whose shapes are checked by the compiler.

## The idea

A **tensor** is a grid of numbers: a plain list is 1-D, a table is 2-D, and so
on. Tensors are the building blocks of neural networks and most numerical work.

What makes Emerald's tensors special is that the **shape is part of the type**.
`Tensor[f32, [2, 3]]` is "a tensor of 32-bit floats with 2 rows and 3 columns".
That means a function can *demand* a given shape, and a mismatched
matrix-multiply is caught by the compiler — before the program runs.

## The code

`study_guide/code/17_tensors.rald`

```emerald
# A tensor is a grid of numbers: a plain list of numbers is 1-D, a table is
# 2-D, and so on. Tensors are what neural networks are made of.

# `dim` names a size. These are *names*, not numbers — that is the point.
dim Rows, Cols

# Building tensors. The shape is the list of sizes: [2, 3] is 2 rows of 3.
const a = zeros([2, 3])
const b = ones([2, 3])
print(a)
print(b)

# Printing a tensor shows its dtype and shape, not its contents — a real one
# has millions of numbers. To see actual values, index into it and use item().
print(item(b[0][0]), item(b[1][2]))

# You can also build one from ordinary nested lists.
const m = tensor([[1.0, 2.0], [3.0, 4.0]])
print(m)
print(shape(m), ndim(m), dtype(m))
print(item(m[0][0]), item(m[0][1]), item(m[1][0]), item(m[1][1]))

# Arithmetic happens on the whole grid at once, not one number at a time.
print(b + b)
print(m * m)
print(m * 10.0)

# matmul is matrix multiplication: a [2,3] times a [3,2] gives a [2,2].
print(matmul(ones([2, 3]), ones([3, 2])))

# Because the shape is part of the type, a function can demand a given shape,
# and the compiler checks the demand before the program ever runs.
def row_sums(t: Tensor[f32, [Rows, Cols]]) -> Tensor[f32, [Rows]] {
    return sum(t, 1)
}
const sums = row_sums(tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]))
print(sums, item(sums[0]), item(sums[1]))

# Reshaping is checked too: 2*3 and 3*2 both hold six numbers, so this is fine.
print(reshape(tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]), [3, 2]))

# transpose flips rows and columns.
print(transpose(tensor([[1.0, 2.0], [3.0, 4.0]])))

# item() pulls a single number back out of a one-number tensor.
print(item(sum(tensor([1.0, 2.0, 3.0]), 0)))

# randn needs an explicit seed, so a run is repeatable by construction.
print(shape(randn([2, 2], 42)))
```

## What it prints

```text
Tensor[f32, [2, 3]]
Tensor[f32, [2, 3]]
1.0 1.0
Tensor[f32, [2, 2]]
[2, 2] 2 f32
1.0 2.0 3.0 4.0
Tensor[f32, [2, 3]]
Tensor[f32, [2, 2]]
Tensor[f32, [2, 2]]
Tensor[f32, [2, 2]]
Tensor[f32, [2]] 6.0 15.0
Tensor[f32, [3, 2]]
Tensor[f32, [2, 2]]
6.0
[2, 2]
```

## Key ideas

- **`dim` names a size** (`dim Rows, Cols`). These are *names* standing for a
  dimension, not numbers — so the same code works at any size while still being
  checked.
- **Build tensors** with `zeros(shape)`, `ones(shape)`, or `tensor(nested)`.
- **Printing a tensor shows `dtype` and `shape`, not contents** (real tensors
  are huge). To see a number, index in (`m[0][0]`) and call `item()`.
- **Inspect** with `shape(t)`, `ndim(t)` (number of dimensions), `dtype(t)`.
- **Arithmetic is element-wise and whole-grid:** `b + b`, `m * m`, `m * 10.0`.
- **`matmul(a, b)`** is matrix multiplication; a `[2,3]` times a `[3,2]` gives a
  `[2,2]`.
- **Shapes are types.** `def row_sums(t: Tensor[f32, [Rows, Cols]]) ->
  Tensor[f32, [Rows]]` declares the exact shape contract, enforced by the
  compiler.
- **`sum(t, axis)`** reduces along an axis: axis 0 sums columns, axis 1 sums
  rows (here turning `[Rows, Cols]` into `[Rows]`).
- **`reshape`, `transpose`** rearrange a tensor; reshape is itself shape-checked.
- **`randn(shape, seed)`** needs an explicit seed, so runs are reproducible.

> **`Eq[a, b]`** is Emerald's propositional equality for dimension expressions.
> A value of type `Eq[a, b]` in scope lets a `Tensor[f32, [a]]` be used as
> `Tensor[f32, [b]]` across a function boundary — this is how the type system
> proves that two differently-named dimensions are equal when the code
> guarantees they must be. It's an advanced feature; the tensor lessons in this
> tour work with concrete shapes.

### For the mathematician

A tensor is a multilinear object: a 0-D tensor is a scalar, 1-D a vector, 2-D a
matrix, and `Tensor[f32, [d₁, …, dₙ]]` is an element of `ℝ^(d₁×…×dₙ)` (with
`f32` the finite-precision arithmetic). Putting the shape in the type turns
dimension errors — the `(n×k)·(m×l)` mismatch of matrix multiplication — into
compile-time errors. `sum(t, axis)` is a contraction; `transpose` swaps the two
indices of a 2-tensor; `matmul` is the tensor contraction over the inner index.
Shape-checked tensor types are a lightweight form of the *dependent types* that
encode "this multiplication is well-formed" statically. `Eq[a, b]` with `refl`
is a homogenous equality type over dimension terms — an inhabitant is a proof
that two dimension expressions denote the same size.

Next: [Promises →](18_promises.md)
