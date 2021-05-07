# Contributing Guidelines

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use 
[Github Flow](https://guides.github.com/introduction/flow/index.html)). 
We actively welcome your pull requests.

This project has 2 branches:

- `main` -- This is the default branch of the project but we recommend you not to create 
a PR on this branch because it always has tested and completely bug-free code.

- `dev` -- If you want to work on the website, you may create a PR to this branch. 
Just make sure you regularly keep this branch updated in your fork.

**Note:** Head [here](#Docker-pointer) if you're looking for instructions on setting up with Docker. 
(recommended for beginners)

### Contributing to Frontend

The frontend is made using Create React App.

1. Fork this repository

1. Clone it on your local machine through git:
```bash
git clone https://github.com/<YOURNAME>/CoviSource.git
cd CoviSource
```
or through [GitHub CLI](https://cli.github.com/) (recommended):

```bash
gh repo <YOURNAME>/CoviSource
cd CoviSource
```

3. Make sure you're on `dev` branch:
```bash
git checkout dev
```

4. Create a new branch for your feature/update:
```bash
git branch example-feature
git checkout example-feature
```

5. Issue the following commands in the root directory of the project (i.e. `CoviSource/`): 
```bash
cd client
yarn install
yarn start
```

6. Make changes and push it to your fork, and create a PR on `dev` branch of this repo.

### Contributing to Backend

The backend for this project is made using TypeScript, PostgreSQL,
GraphQL, Redis, Apollo and other libraries.

**Note:** Head [here](#Docker-pointer) if you're looking for instructions on setting up with Docker. 
(recommended for beginners)

1. Fork this repository

1. Clone it on your local machine through git:
```bash
git clone https://github.com/<YOURNAME>/CoviSource.git
cd CoviSource
```

or through [GitHub CLI](https://cli.github.com/) (recommended):
```bash
gh repo <YOURNAME>/CoviSource
cd CoviSource
```

3. Make sure you're on `dev` branch:
```bash
git checkout dev
```

4. Create a new branch for your feature/update:
```bash
git branch example-feature
git checkout example-feature
```

5. Create a Postgres Database named `covisourcetestdb` (Install postgres [on Windows through Chocolatey](https://community.chocolatey.org/packages/postgresql12/12.0) and on [Mac through Homebrew](https://formulae.brew.sh/formula/postgresql@9.5#default))
```bash
createdb covisourcetestdb
```

6. Issue the following commands in the root directory of the project: 
```bash
yarn install
yarn watch
```

7. Let `yarn watch` run in background. Open a new terminal and issue:
```bash
yarn dev
```

8. Make changes and push it to your fork, and create a PR on `dev` branch of this repo.

<div id="Docker-pointer"></div>

## Setting up with Docker

It is assumed that you have Docker setup and running on your local machine.
If not, check out [how to install Docker?](https://docs.docker.com/engine/install/)

1. Fork this repository

1. Clone it on your local machine through git:
```bash
git clone https://github.com/<YOURNAME>/CoviSource.git
cd CoviSource
```

or through [GitHub CLI](https://cli.github.com/) (recommended):
```bash
gh repo <YOURNAME>/CoviSource
cd CoviSource
```

4. Go to client and install dependencies
```bash
cd client
yarn
```

3. For Linux and macOS (Darwin), issue the command:
```bash
cd ..
make
```

For Windows, issue the command:
```bash
cd ..
docker-compose up
```

This should get everything setup and running.

4. Once, all the containers are up and running, open http://localhost:3000
on your browser.

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](../LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/EmperorYP7/CoviSource/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/EmperorYP7/CoviSource/issues); it's that easy!
