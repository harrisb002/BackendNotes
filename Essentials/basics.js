// Functions are first class citizens and can be:
// - Literals
// - Assigned as properties in an object
// - Passed and returned from functions
// - Be stored in data structures

const operations = [(x) => x * 2, (x) => x * x, (x) => x / 2];
console.log(
  "Functions can be used as Array value literals as well as Obj Properties:"
);

console.log("Using operations:");
console.log(operations[0](5));
console.log(operations[1](5));
console.log(operations[2](5));
console.log();

const objProperties = {
  double: (x) => x * 2,
  square: (x) => x * x,
  half: (x) => x / 2,
};

console.log("Using Operation Properties:");
console.log(objProperties.double(5));
console.log(objProperties.square(5));
console.log(objProperties.half(5));
console.log();

console.log("Functions having Properties of there own:");
console.log("Using Memoization, to act as a Caching layer (like w/ factorials)\n"

);

console.log("Using hash value here, not ussualy costly but whatevs");
console.log(
  "Caching hash output to access later, instead of recalculating if prev used.\n"
);

const crypto = require("crypto");

function sha256(data) {
    // Create the cache for the value if does not exist in Cache
    if(!sha256.cache) {
        console.log("Initializing cache for: ", data)
        sha256.cache = {}
    }

    // If not found then add
    if(!sha256.cache[data]) {

        const hash = crypto.createHash("sha256");
        hash.update(data);
        sha256.cache[data] = hash.digest('hex')
    } else {
        console.log('cache found')
    }


  return sha256.cache[data]
}

console.log("Creating hash with 'Hey'");
console.log("Hash: ", sha256("Hey"));
console.log();

console.log("Creating hash again with 'Hey'");
console.log("Hash: ", sha256("Hey")); // Cache hit
console.log();

console.log("Creating hash with 'HeyThere'");
console.log("Hash: ", sha256("HeyThere"));
console.log();

console.log("function sha256 defined: ", sha256);
