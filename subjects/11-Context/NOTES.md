# 11. Context

**Note: Check out the new way to use context in React v16.6! This folder shows how to use it the old way.**

Context is an api for passing information between component without passing props.

First, make the context. You can pass in a default context.
```js
const TabsContext = React.createContext({ activeIndex: 2 });
```
Every context has a Provider and Consumer. Think of it as pub/sub relationship.
```js
// In your parent...

state = { value: 3 }

render() {
  return (
    <TabsContext.Provider
      value={{ activeIndex: this.state.value }}
    >
      {this.props.children}
    </TabsContext.Provider>
  );
}
```
