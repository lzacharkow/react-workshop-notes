# 9. Render Optimizations
Every time a top-level component’s state changes, it re-renders. This means every child of it will also re-render.

Now open the lecture example in this file.

Given a todo list of 5000 items, every 5000 update when we add a new one to the list, if it’s kept in the list state.

To see this, open the inspector and look at “Performance”. You'll see that all 5000 items are rendered.
**Time:** 600ms

## Optimization: Check if the component should update
Use shouldComponentUpdate in each todo item
```js
  shouldComponentUpdate(nextProps, nextState) {
    // check the items that we need to listen to.
    return (
      nextProps.body !== this.props.body ||
      nextState.done !== this.state.done
    );
  }
```
**Time:** 400ms

## Optimization: PureComponent
Instead of using shouldComponentUpdate, extend React.PureComponent
```js
class TodoItem extends React.PureComponent {
    ...
}
```
This automatically does a _shallow_ comparison of the previous state and previous props to the new ones.
**Time:** 200ms

### When to use PureComponent
When a component is part of a bulk-update and may not need to update.
**eg** TodoItem

### When NOT to use PureComponent
When you _expect_ the component to re-render. PureComponent always does a comparison of state and prop changes to decide to update. This comparison becomes expensive if it happens everywhere and the result should have been to just go ahead and update.
**eg** TodoList

## Optimization: Windowing
Only render the items that are in the view. As the user scrolls, push more items into the view.

Check out the exercise solution for this.

Also see: **react-window, react-virtualized (predecessor)**
