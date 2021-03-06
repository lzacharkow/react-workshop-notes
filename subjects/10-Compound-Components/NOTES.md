# 10. Compound Components
How do you make components that are re-usable for different situations?
Let’s say you have a Tabs component…
```html
<Tabs 
  tabData={[{ name: 'Tacos', panel: <div>...</div> }]} 
/>
```
Then your coworker wants them to be on the bottom instead of the top. You may make a `tabPosition="top"/"bottom"` attribute

Then another coworker wants disabled tabs.
You may make a `disabledTabs=[tabIndexes]` attribute

### Instead, split big component into pieces so they can be composed
```html
<Tabs>
  <TabList>
    <Tab>Cats</Tab>
    <Tab>Dogs</Tab>
  </TabList>
  <TabPanels>
    <Panel>Cats: An animal that rules.</Panel>
    <Panel>Dogs: A different animal, that drools.</Panel>
  </TabPanel>
</Tabs>
```

### But how do pass state down to child components?
Given Tabs has a state with `activeIndex` and we want to give it to the TabList and TabPanels.

Clone the children in Tabs and add a new prop, `_activeIndex` to their prop list via the cloneElement method.

```js
// in Tabs
render() {
  return (
    <div>
      {React.Children.map(this.props.children, child => {
        if (child.type === TabList) {
          return React.cloneElement(child, 
	    {
              _activeIndex: this.state.activeIndex,
	    }
	  );
        } else {
          return child;
        }
      })}
    </div>
  );
}
```

Then, clone the children in TabList and do evaluation on every tab to decide if it’s active.

```js
function TabList({ children, _activeIndex }) {
  return (
    <div>
      {React.Children.map(children, (child, index) => (
        React.cloneElement(child, 
          {
	    _isActive: _activeIndex === index,
          }
        )
      )}
    </div>
  );
}
```

We map through the children because we don’t want to mutate anything directly. It leads to problems.

### Then for panels…
```js
// in Tabs
render() {
  return (
    <div>
      {React.Children.map(this.props.children, child => {
        if (child.type === TabList) {
          return React.cloneElement(child, 
	    {
              _activeIndex: this.state.activeIndex,
            }
	  );
        } else if (child.type === TabPanels) {  // <-- NEW
          return React.cloneElement(child, 
	    {
              _activeIndex: this.state.activeIndex,
            }
	  );
        } else {
          return child;
        }
      })}
    </div>
  );
}
```

In the panel only render the current panel
```js
function TabPanels({ children, _activeIndex }) {
  return (
    <div>
      {React.Children.toArray(children)[_activeIndex]}
    </div>
  );
}
```

### How do you pass down methods that children can call up to the parent?
Just pass them in the cloneElement
```
setFoo(foo) {
  this.setState({ foo });
}

render() {
  return (
    <div>
      {React.Children.map(this.props.children, child => {
        if (child.type === TabList) {
          return React.cloneElement(child, 
	    {
              _activeIndex: this.state.activeIndex,
              _handleTabClick: setFoo // <-- NEW
            }
	  );
        } else {
          return child;
        }
      })}
    </div>
  );
}
```
