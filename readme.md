# Teleport
[![npm](https://img.shields.io/npm/v/@teleporthq/teleport-lib-js.svg)](https://github.com/teleporthq/teleport-lib-js)
[![Build Status](https://travis-ci.com/teleporthq/teleport-lib-js.svg?branch=master)](https://travis-ci.com/teleporthq/teleport-lib-js)
[![Codecov](https://img.shields.io/codecov/c/github/teleporthq/teleport-lib-js.svg)](https://codecov.io/gh/teleporthq/teleport-lib-js)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Teleport is a suite of open-source libraries and tools used by [teleportHQ](https://teleporthq.io/?g), an online platform which simplifies the process of creating, maintaining and publishing user interfaces for desktop and mobile devices.

## Motivation
In a world in which information is delivered through multiple channels and different technologies, we believe that there are many benefits in decoupling the description of User Interfaces from the code which will render them. 

This approach is not new. Our concept has been greatly influenced by Facebooks's [React](https://reactjs.org/) library, where React is a component based User Interface description language and [ReactDOM](https://reactjs.org/docs/react-dom.html) and [React-Native](https://facebook.github.io/react-native/) are implementations of the same User Interface description in different targets.

However, we wanted to go one step further and to propose a format which would be 100% code-free and which could eventually become a  **protocol** for a bi-directional and friction-less communication layer between the designers's tools and developers' technologies and frameworks. 

## Principles
At a high-level, a User Interface can have 3 main *digital states*: a `description state` (such as a Photoshop or Sketch file), a `code state`, (such as a HTML file) and an `instance state` (such as the DOM equivalent of an HTML file). These 3 states are the design-to-code pipeline for the user interface of any standard web application:

```
design state ---> code state ---> instance state 
```

Until very recently, those three states where completely distinct and managed by specialized tools, respectively, design tools, code editors, and browsers. It is only in the past two years that *code* and *instance* states (and tools) got significantly closer through hot-reloading mechanisms.

Teleport closes the gap and allows for a real-time experience through all the digital states of a user interface.
