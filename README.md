# next-redux-saga Github API (WIP) by Arup 

## This fetures 
### Next.js 
    - SSR 
    - Automated code Splitting
    - Simple page based routing
    - Built in CSS support
### Redux Saga
    - everyone knows and time tested 

## How to use

Clone the code then Install packages and run:

```bash
npm install
npm run dev
# or
yarn
yarn build
yarn next
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## The idea behind the example

Usually splitting your app state into `pages` feels natural, but sometimes you'll want to have global state for your app. This is an example using `redux` and `redux-saga` that works with universal rendering. This is just one way it can be done. If you have any suggestions or feedback please submit an issue or PR.

![](http://i.imgur.com/ldWyJPF.png)

![](http://i.imgur.com/YfyXqoz.png)

![](http://i.imgur.com/soWyl68.png)

![](http://i.imgur.com/AxHvaRJ.png)

Our page is located at `pages/index.js` so it will map the route `/`. To get the initial data for rendering we can implementing the static method `getInitialProps`. 
We initialize the redux store and dispatch required actions until we are ready to return the initial state to be rendered. Since the component is wrapped with `next-redux-wrapper`, the component is automatically connected to Redux and wrapped with `react-redux Provider`, that allows us to access redux state immediately and send the store down to children components so they can access to the state when required.

For safety it is recommended to wrap all pages, no matter if they use Redux or not, so that you should not care about it anymore in all child components.

`withRedux` function accepts `makeStore` as first argument, all other arguments are internally passed to `react-redux connect()` function. `makeStore` function will receive initialState as one argument and should return a new instance of redux store each time when called, no memoization needed here.

To pass the initial state from the server to the client we pass it as a prop called `initialState` so then it's available when the client takes over.

The trick here for supporting universal redux is to separate the cases for the client and the server. When we are on the server we want to create a new store every time, otherwise different users data will be mixed up. If we are in the client we want to use always the same store. That's what we accomplish in `store.js`


All pages are also being wrapped by `next-redux-saga` using a helper function from `store.js`:

```js
import withRedux from 'next-redux-wrapper'
import nextReduxSaga from 'next-redux-saga'
import configureStore from './store'

export function withReduxSaga(BaseComponent) {
  return withRedux(configureStore)(nextReduxSaga(BaseComponent))
}

/**
 * Usage:
 *
 * class Page extends Component {
 *   // implementation
 * }
 *
 * export default withReduxSaga(Page)
 */
```


Since `redux-saga` is like a separate thread in your application, we need to tell the server to END the running saga when all asynchronous actions are complete. This is automatically handled by wrapping components in `next-redux-saga`. If you refresh `pages/details.js`, the issues JSON data will **NOT** be loaded on the server, however, the saga is running on the client. When you click *Back to Search Result*, you will be taken to `pages/index.js` and the issues JSON data will be fetched from the client. The issues JSON data will only be fetched **once** from the client or the server.

For simplicity and readability, the actions, reducers, sagas, and store creators have been split into seperate files: `actions.js`, `reducer.js`, `saga.js`, `store.js`

## TODO
Next will write Unit , Snapshot Tests using Jest , enzyme and Integration tests using Cypress 
