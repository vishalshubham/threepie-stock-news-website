## Threepie Stock News Website

Below you will find some information on how to setup and run Threepie Stock News Website project locally.<br>

## Table of Contents
- [Basic Setup](#setup)
- [Dependencies](#dependencies)
  - [Production dependencies](#production-dependencies)
  - [Development dependencies](#development-dependencies)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)

## Setup
- Install visual studio code from below link
```sh
https://code.visualstudio.com/download
```
- Install Node.js and npm from below link
```sh
https://nodejs.org/en/
```
- Go to Users/[User Name]/Sites like (Users/vishalchaudhary/Sites)
- git clone ```https://github.com/vishalshubham/threepie-stock-news-website.git```

## Dependencies

### `Production Dependencies`
```sh
npm install --save react react-dom @types/react @types/react-dom
```
### `Development Dependencies`
```sh
npm install --save-dev babel-cli babel-core babel-loader babel-preset-react
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install --save-dev style-loader css-loader less-loader less ts-loader
npm install --save-dev node-sass-chokidar
npm install --save-dev npm-run-all
npm install --save-dev react-scripts
```

## Available Scripts

### Dev commands

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.<br> Your app is ready to be deployed!

### Package commands

#### npm list
#### npm list --depth=0
#### npm view/info <package> version
Lists installed packages and versions
#### sudo npm i -g npm 
Update npm version to latest

## Git commit message format
[Title] This is a Git title

[Changes]
- This is change 1 inside this commit.
- This is change 2 inside this commit.

[Testing]
- Link to see the change [https://localhost:3000]
- Step 1 to test the change
- Step 2 to test the change

## References
- https://codeburst.io/setting-up-a-react-project-from-scratch-d62f38ab6d97
- https://www.codecademy.com/articles/react-setup-i
- https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
- https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter
- https://blog.logrocket.com/how-why-a-guide-to-using-typescript-with-react-fffb76c61614
- https://www.youtube.com/watch?v=2QaI5ajg4Hw
- https://blog.lucify.com/building-interactive-visualizations-with-react-d3-and-typescript-206c7172b0d2
- https://spin.atomicobject.com/2017/07/20/d3-react-typescript/
- https://medium.com/@Connorelsea/using-sass-with-create-react-app-7125d6913760
