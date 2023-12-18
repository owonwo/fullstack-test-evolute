
# Getting Started

## Installation
```bash
$ npm install
```
## Configuration
Before starting the project, make sure to set up your database credentials in the `.env.development.local` file.

Duplicate the `.env.example` file provided in this project.
Rename the copied file to `.env.development.local`, set the value for each variable and restart the server if changes don't apply.

## Start Dev Server
Run
```bash
$ npx turbo dev
# or
$ npm run dev
```
See `scripts` in `package.json` file for other commands

## Todo
- [x] Add Create Survey endpoint
- [x] Add Save Survey response endpoint
- [ ] Survey result aggregation (WIP)
- [ ] Better format of Validation errors
- [ ] Unit test the important endpoints
- [ ] Remove unnecessary boilerplate code
- [ ] Fix Typescript boilerplate errors/warnings
