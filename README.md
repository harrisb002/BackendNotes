### Commands

- `npm install typescript ts-node nodemon @types/node -D` 
    : ts-node allows for just in-time compilation
- `@types/`... can be usefull to allow for autocorrect for types in typescript
- `npx tsc --init`
- `tsc --watch`

- `node --loader ts-node/esm app.ts` : experimental but allows for the use of modules as well as ts-node
### Compiler options

- target: ESNext allows for `let` and `const`
- module: Allows to use `import` instead of `require`
- outDir: Folder to seperate source and compiled files
