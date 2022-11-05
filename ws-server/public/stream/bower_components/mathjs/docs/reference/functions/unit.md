# Function unit

Create a unit. Depending on the passed arguments, the function
will create and return a new math.type.Unit object.
When a matrix is provided, all elements will be converted to units.


## Syntax

```js
math.unit(unit : string)
math.unit(value : number, unit : string)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`args` | * &#124; Array &#124; Matrix | A number and unit.

### Returns

Type | Description
---- | -----------
Unit &#124; Array &#124; Matrix | The created unit


## Examples

```js
var a = math.unit(5, 'cm');    // returns Unit 50 mm
var b = math.unit('23 kg');    // returns Unit 23 kg
a.to('m');                     // returns Unit 0.05 m
```


## See also

[bignumber](bignumber.md),
[boolean](boolean.md),
[complex](complex.md),
[index](index.md),
[matrix](matrix.md),
[number](number.md),
[string](string.md)


<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->