
const data = {
    username: 'calcur',
    reputation: 90,
    birthday: new Date(),
    address: {
        street: '123 Main St',
        city: 'Somewhere',
        zip: '12345',
    },
    hobbies: ['sleeping', 'cooking', 'swimming'],
    verified: true,
    name: null,
    email: undefined,
    speak: () => {
        console.log('hello nerds');
    },
};

console.log(data);

console.log(JSON.stringify(data, null, 4));


// Some major things to note:

// 1. Properties that are `undefined` are removed in the JSON, but properties that are `null` are not. `null` is a valid JSON type, while `undefined` is not.
// 2. Properties that contain functions as values are removed from JSON
// 3. Dates are converted to timestamps.

// Then, from a syntactical difference:, properties and string values require double quotes.

// When working with JSON, you can validate your JSON with tools like 
// [JSONLint.](https://jsonlint.com/) You can also create a `.json` file and validate it with any editors or editor plugins.

// ### Removing Properties, null, and undefined

// Both `null` and `undefined` are used to indicate the absence of a value, but I would say they have distinct use cases.
//  Think of `null` as a way to explicitly say there is no value for a property, and think of `undefined` as uninitialized.

// Say you have the ability for users to have a backup email. This may be optional, and as a result the lack of a backup email
//  could be indicated with `null`. This is different than something being undefined, which means it is a variable that hasn’t been given a value.

// The use of `undefined` is more at the JavaScript level, and `null` is used more by the developer.
//  You won’t often manually assign `undefined`, although it is possible.

// Properties that are undefined will not be included in JSON, so if you want to include the property without a value, you’ll want to use `null`.

// What if you want to remove a property? While setting it to the value `undefined` can work,
//  the more proper way of doing this would be the `delete` operator.

// This can be handy if you want to modify a record with a PATCH request where removing a property explicitly requires you to assign it `null`.




// Destructuring allows you to simplify retrieving certain values from an object and assigning them to variables. At first we will have:
const birthdate = data.birthdate;
const name = data.name;

// rename the variables like so:
const { birthdate: bday, name: n } = data;
console.log(bday, n);

// ?\This will grab the second hobby in the array.
const {
  hobbies: { [2]: hobby },
} = data;
console.log(hobby);
