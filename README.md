# [<img src="dev/images/icon.png" width="28" height="28" alt="Icon">](#-champions) Champions

[<img src="https://travis-ci.org/hook/champions.svg?branch=master" alt="Build Status">](https://travis-ci.org/hook/champions)
[<img src="https://img.shields.io/gitter/room/hook/champions.svg" alt="Join the chat at https://gitter.im/hook/champions">](https://gitter.im/hook/champions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Download

[![Join the chat at https://gitter.im/hook/champions](https://badges.gitter.im/hook/champions.svg)](https://gitter.im/hook/champions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

  Clone this repository with git.

### Installation

  Install all [NPM](https://www.npmjs.com/) packages and update packages that need it.

```
  $ npm install
```

##### Windows

If you are developing in a Windows environment, make sure to set your line endings preferences
to [autocrlf](https://help.github.com/articles/dealing-with-line-endings/).

### Local Development

  Run a webpack-dev-server and navigate to [localhost:8080](http://localhost:8080) test changes.

```
  npm start
```

Environment variables

| Name | Default value | Description |
| -- | -- | -- |
| WEBPACK_HOSTNAME | `localhost` | Hostname (or IP address) for the dev server |
| WEBPACK_PORT | *8080* | Port for the dev server |
| WEBPACK_OPEN | **true** | Open the default browser at the current dev server |

### Linting and Testing

  Periodically lint your code and run tests to ensure basic functionality has not broken.
  ESLint and SassLint can be enabled inside your IDE for
  [WebStorm](//www.jetbrains.com/webstorm),
  [Sublime Text](//www.sublimetext.com) or
  [Atom](//atom.io).

```
  npm test
```

### Deployment

  Lint, Test, Build and publish to gh-pages branch is done automatically by Travis-CI on `git push`.
