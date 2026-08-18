# 18 · Promises

Three promises the compiler can check for you: purity, termination, and
completeness.

## The idea

Types catch "wrong kind of value" mistakes. Emerald goes further and lets the
compiler check three deeper properties of your code:

1. **Purity** — this function computes; it does not print, read files, use
   randomness, or call impure things.
2. **Termination** — this function always finishes; its recursion visibly makes
   progress.
3. **Completeness** (proof mode) — nowhere in the program is there an `any` or a
   `partial`; every value has a real type and every function is known to
   terminate.

## The code

`study_guide/code/18_promises.rald`

```emerald
# Emerald can check three promises about your code that most languages cannot.

# --- Promise 1: this function computes, it does not meddle. ---
# `pure` means: no printing, no reading files, no randomness, and it may only
# call other pure functions. The compiler enforces it.
def area(w: int, h: int) -> int pure {
    return w * h
}
print(area(3, 4))

# A pure function may only call pure things. Uncommenting the print below
# would fail with E_TYPE_PURE_CALL.
def double(n: int) -> int pure {
    # print("peeking")      <- not allowed in a pure function
    return n * 2
}
print(double(21))

# --- Promise 2: this function finishes. ---
# Functions are *total* by default: every recursive call must visibly get
# closer to stopping, by walking into a smaller piece of its own input.
type Nat = { zero: True } | { zero: False, prev: Nat }

def to_int(n: Nat) -> int pure {
    if n.zero == True { return 0 }
    return 1 + to_int(n.prev)      # n.prev is structurally smaller: allowed
}
const three: Nat = { zero: False, prev: { zero: False, prev: { zero: False, prev: { zero: True } } } }
print(to_int(three))

# Counting down on a plain int is *not* recognised as getting smaller, so a
# function like that must be marked `partial` — which declares "this one is
# not a proof".
def countdown(n: int) -> int partial {
    if n <= 0 { return 0 }
    return countdown(n - 1)
}
print(countdown(100))

# --- Promise 3: no gaps. ---
# Run `emeraldc --check --proof thisfile.rald` and the compiler additionally
# rejects `any` and `partial` anywhere in the program. What is left is code
# where every value has a real type and every function is known to finish.
```

## What it prints

```text
12
42
3
0
```

## Key ideas

- **`pure`** after the return type promises "no side effects". A pure function
  may not print, read files, use randomness, or call impure functions — and the
  compiler enforces all of it. It is safe to reorder, memoise, and test in
  isolation.
- **Total by default.** A recursive call is only accepted if it recurses on a
  *structurally smaller* piece of the input — the `n.prev` above, not `n - 1`.
  This is how the compiler knows the function terminates.
- **`partial` opts out.** When you recurse in a way the compiler can't prove
  (like `countdown(n - 1)` on a plain int), you must say `partial` — an honest
  "this one is not a proof".
- **Proof mode.** `emeraldc --check --proof file.rald` rejects `any` and
  `partial` everywhere. What remains is code where every value has a real type
  and every function is known to finish.

## Why this matters

Most bugs fall into a few buckets: wrong types, unexpected side effects, and
infinite loops. The ordinary compiler catches the first everywhere; `pure`
catches the second; totality catches the third. Proof mode is the "pedal to the
metal" setting: accept nothing with a gap in it.

### For the mathematician

This is the heart of the language. `pure` is referential transparency — a pure
function is a genuine function in the mathematical sense, and `f(x) = f(x)`
always holds. Totality is exactly the difference between a partial function
(defined on some inputs) and a total function (defined on all): a function is
total when it terminates on every input. Structural recursion is induction on
the structure of the data (here, the natural number `Nat` built from a `zero`
case and a `prev` successor case). Proof mode is a (lightweight) version of the
Curry–Howard idea: a well-typed, total, pure program is a constructive proof
that it works. You are not far from dependent types here.

Next: [Reference →](19_reference.md)
