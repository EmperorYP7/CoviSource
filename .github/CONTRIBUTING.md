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

This project has 4 branches:

- `frontend` -- This is the default branch for the frontend of the project but 
we recommend you not to create a PR on this branch because it always 
has tested and completely bug-free code.

- `frontend-dev` -- If you want to work on the frontend of this website, you may create a PR
to this branch. Just make sure you regularly keep this branch updated in your fork.

- `backend` -- This is the default branch for the backend of the project but 
we recommend you not to create a PR on this branch because it always 
has tested and completely bug-free code.

- `backend-dev` -- If you want to work on the backend of this website, you may create a PR
to this branch. Just make sure you regularly keep this branch updated in your fork.

### Contributing to Frontend

The frontend is made using Create React App.

1. Fork this repository

1. Clone it on your local machine through git:
```bash
git clone https://github.com/<YOURNAME>/CoviSource.git
```
or through GitHub CLI (recommended):
```bash
gh repo <YOURNAME>/CoviSource
```

3. Make sure you're on `frontend-dev` branch

4. Issue the following commands in the root directory of the project: 
```bash
yarn install
yarn start
```

5. Make changes and push it to your fork, and create a PR on this repo.

### Contributing to Backend

The backend for this project is made using TypeScript, PostgreSQL,
GraphQL, redis, Apollo and other libraries.

1. Fork this repository

1. Clone it on your local machine through git:
```bash
git clone https://github.com/<YOURNAME>/CoviSource.git
```
or through GitHub CLI (recommended):
```bash
gh repo <YOURNAME>/CoviSource
```

3. Make sure you're on `backend-dev` branch

4. Create a Postgres Database named covisourcedb
```bash
createdb covisourcedb
```

5. Issue the following commands in the root directory of the project: 
```bash
yarn install
yarn watch
```

6. Let `yarn watch` run in background. Open a new terminal and issue:
```bash
yarn dev
```

7. Make changes and push it to your fork, and create a PR on this repo.

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](../LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/EmperorYP7/CoviSource/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](); it's that easy!


