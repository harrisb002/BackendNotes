// general [debugging in the Node docs](https://nodejs.org/en/docs/guides/debugging-getting-started).

// To begin, associate a `launch.json` file with code.
// You can get more information on available attributes in the [VS Code docs](https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes).
// You don’t actually have to have a debug configuration and can roll with the default `Run and Debug`

//Watch conditions are cool!

const user = [
  {
    name: "ben",
    age: 30,
  },
  {
    name: "cooler dude",
    age: 100,
  },
];

const example = () => {
  console.log("Another function")
}

user.map((user) => {
  example()
    console.log(user.age || 'not known')
})