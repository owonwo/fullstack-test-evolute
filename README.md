# Survey application
This is a simple multi-choice survey data collection application.
This is a monorepo project powered by Turborepo.
Both apps are in the `apps/` folder.

## What's inside?
This Turborepo includes the following packages/apps:

### Apps and Packages
- `web`: a [Next.js](https://nextjs.org/) app for the client
- `server`: a [Express](https://expressjs.com/) app for the server
- `@repo/ui`: a stub React component library shared by both `web` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

# Setup
### Install
```
npm install
```

### Develop
To develop all apps and packages, run the following command:
```
npm run dev
```
> All apps are configured to run on different ports and can be developed concurrently.

### Build
To build all apps and packages, run the following command:
```
npm run build
```

If you run into any issue while starting the Server? See project specific README files for detailed setup information below 
- [Web](apps/web/README.md)
- [Server](apps/server/README.md)

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
