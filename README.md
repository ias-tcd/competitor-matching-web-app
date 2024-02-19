# Competitor Matching Web App

This repo contains the source code for the web-app for TCD SwEng Group 20's project with Integral Ad Science - a competitor matching machine learning model.

We use React, Typescript, Vite, pnpm and Docker to run this web application.

# Version requirements

You must have the following installed before continuing:

|   Dependency   | Version  |                   Install                   |
| :------------: | :------: | :-----------------------------------------: |
|     Docker     |    24    | [docs](https://docs.docker.com/get-docker/) |
| docker-compose |    2     |       Will install with docker above        |
|    Node.js     | 20.11.\* |   [docs](https://nodejs.org/en/download)    |
|      pnpm      | 8.14.\*  |    [docs](https://pnpm.io/installation)     |

# First steps

After cloning the repostitory do the following:

```bash
# Create a .env file and populate it with the API url
echo VITE_APP_API_URL=http://localhost:8000 >> .env

# Install the dependencies locally
pnpm install

# Build the docker image
make build

# Run the application in a docker container
make run
```

The application should now be available to view in your browser at http://localhost:5173/

You can use ctrl-C to quit the application.

Any changes made to the source code will mean the docker image must be rebuilt. Running `make run` after a change will take care of this.

# Deployment

This application is deployed using Docker and GitHub Actions to an AWS EC2 instance.
You can find the application [here](http://ec2-34-243-132-123.eu-west-1.compute.amazonaws.com/).

# Useful Commands

Below are some useful commands and what they do.

```bash
# Remove the docker container (helpful if there is an issue with your build such as caching old dependencies)
make down

# Remove the docker container and restart the application (building a new container)
make restart

# Format the code
pnpm run prettier

# Run typescript over the source code
pnpm run tsc

# Lint the code
pnpm run lint
```

# Pre-Commit Hooks

This project uses [husky](https://github.com/typicode/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged?activeTab=readme) to run pre-commit hooks before each commit is made. These help with code review by automatically formatting the code and blocking if any staged code is in violation of the linter.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
