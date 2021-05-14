// data = [{
//     "id": 1,
//     "name": "mango",
//     "price": 1.99
// },
// {
//     "id": 2,
//     "name": "pear",
//     "price": 0.59
// },
// {
//     "id": 3,
//     "name": "watermelon",
//     "price": 5.99
// },
// {
//     "id": 4,
//     "name": "apricot",
//     "price": 2.58
// }]
// var stuff = data.map(p => p.price)

// console.log(stuff.reduce((sum, current) => sum + current))

// // ternary operation
// // return ? if condition is true : if condition is false

let cart = {
    items: {
        mango: {
            info: {
                name: 'mango',
                price: 1.99
            },
            quantity: 1
        },
        watermelon: {
            info: {
                name: 'watermelon',
                price: 8.99
            },
            quantity: 1
        },
        pear: {
            info: {
                name: 'pear',
                price: 0.59
            },
            quantity: 1
        }
    }
}

// console.log(Object.keys(cart.items));

let itemToAdd = {
    "id": 1,
    "name": "mango",
    "price": 1.99
}
// loop through list of cart items
// for (const item of Object.keys(cart.items)) {
    
// }

// if the object's name has not been found in cart items
if (!Object.keys(cart.items).includes(itemToAdd.name)) {
    // create new cart items
    cart.items.itemToAdd.name = {
        info: itemToAdd,
        quantity: 1
    }
}
else {
    // find item and increase its quantity +1
    cart.items[itemToAdd.name].quantity ++;
}

console.log(cart.items);