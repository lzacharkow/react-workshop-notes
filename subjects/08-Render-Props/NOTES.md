# 8. Render Props
This is an alternate solution to sharing code between components. It’s a good substitution for HOCs. Instead of wrapping your component as a decorator, you wrap the pieces of it that need the shared code in the render prop component...
```js
return (
  <RenderPropComponent
    render={renderProps => (
      <div>
        {doSomething(renderProps.foo)}
      </div>
    )}
  />
);
```
OR
```js
return (
  <RenderPropComponent>
    {renderProps => (
      <div>
        {doSomething(renderProps.foo)}
      </div>
    )}
  </RenderPropComponent>
);
```
Because `RenderPropComponent` is declared in render, it'll update every time the parent component changes and `renderProps` will be re-evaluated.

### Gotchas
* Lots of indented components can lead to the "triangle of death".
* Render props aren’t available in lifecycle methods. If you need this, use an HOC (or context).

### Next-level (you probably don't need to do this)...
You can _also_ implement a HOC _with_ a render prop…
```js
function myHigherOrderComponent(MyComponent) {

  return class extends React.Component {
    render() {

      return (
        <RenderPropComponent>
          {renderProps => (
	    <MyComponent {...this.props} foo={renderProps.foo} />
	  )}
        </RenderPropComponent>
      );

    }
  }

}
```
