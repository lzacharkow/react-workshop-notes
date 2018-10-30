# 7. Higher-order Components
Use HOCs to share code between components. There are 2 ways to create an HOC, but you'll always want to follow the wrapper/decorator pattern...

### 🚫 Classical inheritance HOC
_Don't do this... I'm just showing you because you will come across something like this on the internet if you google HOCs._

This example extends another component directly. This will look familiar because it uses classical inheritance the way you're familiar with in Rails.

So why not just do it the Rails way? Because we want our React code to be as declarative and conflict-free as possible. In this example, I don't know which lifecycle methods are already taken by `MyHigherOrderComponent`, so I can run into issues that are hard to debug.
```js
class MyComponent extends MyHigherOrderComponent {
  constructor() {
    super();

    // MyComponent must declare `super()` within the constructor to
    // inherit all of MyHigherOrderComponent's methods.
  }
}
```

### ✅ Wrapper/Decorator HOC
Wrapper/Decorator HOCs give you something _like_ inheritance but without the conflicts that come from classical direct inheritance. The wrapper has its own distinct lifecycle methods and it passes information down to `MyComponent` via props.

Declare the HOC relationship on the export, like redux's `connect` decorator.
```js
export default myHigherOrderComponent(WrappedComponent);
```
The example in this folder can tell you more about how to write a wrapped HOC.

#### Gotchas
* PropTypes get magically merged
* It’s hard to tell where props are coming from in `MyComponent`. Find a naming convention for props that come from HOCs (like prefixing them with an underscore `_someHocProp`).
