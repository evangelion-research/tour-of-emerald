# 9 · Records

Group several values together under named fields.

## The idea

A **record** is a bundle of values, each with a name. It's Emerald's way of
modelling a thing that has several parts: a point has an `x` and a `y`, a person
has a `name` and an `age`. Other languages call a similar idea an *object* or a
*struct*.

You write a record with `{ field: value, ... }` and read a field with a dot:
`point.x`.

## The code

`study_guide/code/09_records.rald`

```emerald
# A record groups several values under names. It is Emerald's answer to
# what other languages call an object.
const point = { x: 3, y: 4 }
print(point)
print(point.x, point.y)

# `type` gives a shape a name, so you can talk about it.
type Point = { x: int, y: int }

def distance_squared(p: Point) -> int {
    return p.x * p.x + p.y * p.y
}
print(distance_squared(point))

# A record you intend to change: write the type, then assign fields.
here: Point = { x: 0, y: 0 }
here.x = 10
print(here)

# Records compare by their contents, not by identity.
print({ x: 1, y: 2 } == { x: 1, y: 2 })

# The shape is what matters, not the name. This record has x and y
# (and more besides), so it counts as a Point everywhere a Point is wanted.
const labelled = { x: 1, y: 2, name: "origin-ish" }
print(distance_squared(labelled))

# `&` builds a bigger shape out of a smaller one: a Point3 is a Point
# that also has a z.
type Point3 = Point & { z: int }
const p3: Point3 = { x: 1, y: 2, z: 3 }
print(distance_squared(p3), p3.z)

# Lists of records are how you store many of the same thing.
type Person = { name: str, age: int }
const people: list[Person] = [
    { name: "ada", age: 36 },
    { name: "alan", age: 41 },
]
for person in people {
    print(person.name, "is", person.age)
}
```

## What it prints

```text
{x: 3, y: 4}
3 4
25
{x: 10, y: 0}
True
5
5 3
ada is 36
alan is 41
```

## Key ideas

- **Write a record** with `{ field: value, ... }`.
- **Read a field** with a dot: `point.x`.
- **Name a shape** with `type Name = { ... }`, then use it in parameters,
  return types, and list element types.
- **To change a field**, the record must be declared with its type
  (`here: Point = ...`), after which `here.x = 10` is allowed.
- **Records compare by contents**, not by identity: two separately-written
  records with the same fields are equal.
- **Structural typing.** What matters is the *shape*. A record with extra
  fields still counts as a `Point` wherever a `Point` is wanted.
- **`&` extends a shape.** `Point & { z: int }` is a `Point` that also has `z`.
- **Lists of records** model collections of the same kind of thing.

### For the mathematician

A record type `{ x: int, y: int }` is a finite product `ℤ × ℤ`, with `x` and `y`
as the projections (the dot access). *Structural typing* means a value's type is
determined by its shape, not by a name — so `{ x, y, name }` is a value of type
`{ x, y }` because it simply forgets the extra coordinate, a projection onto the
product's factor. The `&` operator is intersection of record types. Records
compare by contents: equality is defined field-by-field, coordinate-wise
equality of the tuple.

Next: [Unions →](10_unions.md)
