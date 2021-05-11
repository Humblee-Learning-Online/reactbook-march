data = [{
    "id": 1,
    "name": "mango",
    "price": 1.99
},
{
    "id": 2,
    "name": "pear",
    "price": 0.59
},
{
    "id": 3,
    "name": "watermelon",
    "price": 5.99
},
{
    "id": 4,
    "name": "apricot",
    "price": 2.58
}]
var stuff = data.map(p => p.price)

console.log(stuff.reduce((sum, current) => sum + current))

// ternary operation
// return ? if condition is true : if condition is false