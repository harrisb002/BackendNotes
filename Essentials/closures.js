// A function it takes a snapshot of the variables available to it and retains that access. 
// This is most commonly noticed when you create a function within a function, where the inner function 
// maintains access to variables defined within the same scope even when the outer function finishes execution.
// Here is a very basic example of this concept:

function delay(message) {
    setTimeout(() => {
        console.log(message);
    }, 2000);
}

delay('hello');
console.log('delay function complete');

// The function delay completes almost immediately, but the function provided to`setTimeout` 
// retains a reference to `message`, which is why it is able to still display the message after two seconds. 

// Everything that is referenced by this function is called its lexical scope. 

// This is the same concept:

```jsx
const algorithm = (f1, f2, f3) => {
    return (x) => {
        let result = f1(x);
        result = f2(result);
        result = f3(result);
        return result;
    };
};
```

// This `result` that we return retains a reference to all the local variables, 
// meaning it has access to `f1`, `f2`, and `f3`, even after the execution of the `algorithm` function is complete.

const functions = [(x) => x * 2, (x) => x * x, (x) => x / 2];
const algo = algorithm(...functions);
console.log(algo(2));

// We can see this in the debugger by setting a breakpoint on the final console.log. 
// In our locals, we can expand to see the closure:

// In these examples, the inner functions “close over” the variables of their containing functions, 
// allowing these variables to be accessible even after the containing functions finish executing.