// Functions that take other functions as arguements

// Invoking a function on every member of an array, The manual method!
// Basically built in map :\

// let data = [1, 2, 3, 4, 5];

// const modify = (data, func) => {
//   for (let i = 0; i < data.length; i++) {
//     data[i] = func(data[i]);
//   }
// };

// const callBackFunc = (x) => x * 2;

// modify(data, callBackFunc);

// console.log(data);

// data = data.map((x) => x * x);

// console.log(data);

// // Pipeline functions
// const functions = {
//   double: (x) => x * 2,
//   sqr: (x) => x * x,
//   half: (x) => x / 2,
// };

// // Create the pipeline for how to innoke the functions
// const algorithm = (functions) => {
//   return (x) => {
//     let result = functions.double(x);
//     result = functions.sqr(result);
//     result = functions.half(result);
//     return result;
//   };
// };

// // Getting a function that will go through these steps
// const algo = algorithm(functions);

// // Now can invoke with a parameter
// console.log(algo(2));

// let newData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// // Predicates is a function that returns true/false
// // Used in filter() method to determine if it is included in resulting array
// let squares = newData.filter((x) => Math.sqrt(x) % 1 == 0);

// console.log(squares)

// let summing = [5, 10, 20];
// // Use reduce to collect information accross array
// const result = summing.reduce((prev, current) => {
//     prev += current;
//     return prev
// })

// console.log(result)



//apply 10% off coupon
//remove any over $20
//Sum up cost and calculate avg

const products = [
    { name: 'laptop charger', price: 25 },
    { name: 'keyboard', price: 22 },
    { name: 'mouse', price: 18 },
    { name: 'monitor', price: 30 },
    { name: 'cable', price: 5 },
];

const discounted = products.map((product) => ({
    name: product.name,
    price: product.price * 0.9,
}));
console.log(discounted);

const cheap = discounted.filter((product) => product.price <= 20);
console.log(cheap);

const total = cheap.reduce((prev, current) => {
    prev += current.price;
    return prev;
}, 0);

console.log(total);
console.log('average:', total / cheap.length);