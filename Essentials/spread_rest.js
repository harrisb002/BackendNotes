// Often see the use of `...` (ellipses) to extract data from objects and arrays. 
// This will be used as the **spread operator** and the **rest operator**. 
// These are similar but a bit different. 
// Spread is used to spread out data, and rest is used to gather data. 

// We’ll talk about the spread operator first. 

// The spread operator will copy all attributes of an object to be used within another object. 
// The first use case of this would be copying an object. 

// 
// const data2 = { ...data };
//

// Is this a shallow copy or a deep copy? 
// It will copy over all property values, so it is a shallow copy. 
// This change will be seen across both `data` and `data2`.

data2.address.city = 'test';
​
// However, assigning a new object will not be seen in both:
// data2.address = 'test';
// ​
// This can also be used to extend an object:
const user = {
    username: 'calcur',
    reputation: 90,
};

const notifs = { ...user, notifcations: true };

console.log(notifs);
​
// This same thing can be done with an array:
const data = [1, 2, 3];
console.log([...data, 4, 5]);
​
// Can use this to apply multiple values across multiple parameters.
// Say we have a function with three parameters. This will return a new function combining all of the steps:

const algorithm = (f1, f2, f3) => {
    return (x) => {
        let result = f1(x);
        result = f2(result);
        result = f3(result);
        return result;
    };
};

// We can pass an object with multiple properties using the spread operator and `object.values`: 

const functions2 = {
    double: (x) => x * 2,
    sqr: (x) => x * x,
    half: (x) => x / 2,
};

const algo = algorithm(...Object.values(functions));
console.log(algo(2));

// You could also use an array without needing `Ojbect.values`.


const functions = [(x) => x * 2, (x) => x * x, (x) => x / 2];
const algo2 = algorithm(...functions);