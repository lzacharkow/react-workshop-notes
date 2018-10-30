# Rando notes
### componentWillReceiveProps vs componentDidUpdate
`componentWillReceiveProps` / `getDerivedStateFromProps` is _only_ meant for updating the state based on props. Anything other than that is a _side-effect_.

Side-effects should always happen in `componentDidMount`/`componentDidUpdate`.

### constructor vs componentDidMount
**Tldr;** The _constructor is always called_ no matter where the class is being run (in a browser, on a node server, etc) But _lifecycle methods are only run in the browser_ where there’s a DOM.

Sometimes you’ll notice that class variables (this.foo = ’bar’) are sometimes set in a component’s `constructor` and sometimes in `componentDidMount`.

This distinction isn’t important if you’re just developing a web app that’s run in a browser, but if you’re writing code that’s intended to be run on a server without a browser, then this matters because the lifecycle methods do _not_ run without a browser.

So if you’re writing a component that can be run without a browser (e.g., on a node server) then write your class variables in the `constructor`.

### Instead of using ternary to return something or null…
If you only want to return something if a condition is true, but don’t need the “else” case…
```js
// Instead of this...
thing ? <div>Return me</div> : null

// Do this...
thing && <div>Return me</div>
```

### Functions vs functional components
If it doesn’t take more than one prop, then don’t worry about making it a functional component. Just make it a function. You don’t need everything that comes with a component.
```js
// Instead of this...
function SimpleReturn({ oneProp }) {
	return <div>Something simple {oneProp}</div>;
}
SimpleReturn.propTypes...
SimpleReturn.defaultProps...

// Do this
function simpleReturn(oneProp) {
	return <div>Something simple {oneProp}</div>;
}
```

### Destructure and assign at the same time
You can assign new names to existing keys in an object…
```js
const obj = { x: 1, y: 2 };
let { x: newX, y: newY } = obj;

// now you can do something with `newX`
```

### Gotcha: componentDidUpdate can cause infinite loop
Anytime a componentDidUpdate causes a setState, you want to guard against that by doing something like this…
```js
componentDidUpdate(prevProps) {
	let { foo: prevFoo } = prevProps;
	let { foo: nextFoo } = this.props;

	if (prevFoo !== nextFoo) { ...do something }
}
```

### Name methods that return JSX `renderSomething`
```js
renderTabs = () => (
	<div>...</div>
)

render() {
	return (
		{this.renderTabs()}
  );
}
```

### Controller vs Uncontrolled inputs
**Uncontrolled**
You can give uncontrolled components a `defaultValue` to start with.
```html
<input type="text" defaultValue="something" />
```

**Controlled**
Controlled inputs have `value` props. They must also have `onChange`.
```html
<input type="text" value="something" onChange={this.handleChange} />
```
Value must be defined, otherwise you’ll get an error when it changes the first time. The error will say that the component switched from uncontrolled to controlled.

**Controlled, read-only**
If it’s a read-only component, give it a `readOnly` prop instead of `onChange`.
```html
<input type="text" value="something" readOnly />
```

### Idea: Build our new table as a compound component
```html
<Table>
	<HeadingRow>
		<HeadingCell value="id">ID</HeadingCell>
		<HeadingCell value="name">Name</HeadingCell>
	</HeadingRow>
	<Row data={someData}>
	<Row data={someData}>
	<Row data={someData}>
</Table>
```

### Links
- [React v16.6.0](https://reactjs.org/blog/2018/10/23/react-v-16-6.html) adds lazy, memo and contextType.
- [Prettier](prettier.io) automatically fixes code formatting.
- [Keycode info](http://keycode.info/) gives you JS event keycodes for easy keyboard events.
