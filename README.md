This is a redo of the second day of Backend. These are the steps with comments:

1. npm init -y (builds the package.json)
2. npm i express
3. .gitignore for /node_modules
4. npm i -D nodemon
5. configure package.json
6. create main/server file
7. npm run dev

Info pages:

- expressjs.com (documentation and current version)

package.json configuration steps:

1. "type": "module", (to use new import syntax)
2. "sripts" {
   "dev": "nodemon ./src/server.js",
   }

Example of folder/file structure:

- src folder:
  --> server.js (ONE file that is going to be executed)
