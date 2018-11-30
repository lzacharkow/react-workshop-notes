# 11. Context

**Note: Check out the new way to use context in React v16.6! This folder shows how to use it the old way.**

Context is an api for passing information between component without passing props.

First, make the context. You can pass in a default context.
```js
const ExampleContext = React.createContext({ selectedOption: 2 });
```
Every context has a Provider and Consumer. Think of it as pub/sub relationship.

The Provider receives the context as its `value` prop.
```js
class Parent extends React.Component {

  state = { selectedOption: 3 }

  render() {
    return (
      <ExampleContext.Provider
        value={{ selectedOption: this.state.selectedOption }}
      >
        {this.props.children}
      </ExampleContext.Provider>
    );
  }
}

function Child() {
  return (
    <ExampleContext.Consumer>
      {value => (
        value.selectedOption
      )}
    </ExampleContext.Consumer>
  );
}

class App extends React.Component {
  render() {
    return (
      <Parent>
        <Child />
        <Child />
      </Parent>
    );
  }
}
```
