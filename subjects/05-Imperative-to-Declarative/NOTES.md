# 5. Imperative vs. Declarative
When you write code, make it as declarative as possible. This example is taken from the lecture file:
```html
<div
  style={styles.theremin}
  onMouseEnter={this.play}
  onMouseLeave={this.stop}
  onMouseMove={this.changeTone}
/>
```

We can understand what happens when the user mouses over the div, but can you tell if the tone is playing when the component loads? Not yet.

A quote to sum up imperative vs declarative thinking:
> When thinking imperatively you can’t predict what will happen in the dynamic process.

Instead, break the component down like this:
```html
<div
  style={styles.theremin}
  onMouseEnter={this.play}
  onMouseLeave={this.stop}
  onMouseMove={this.changeTone}
>
  <Tone isPlaying={true} pitch={0.2} volume={0.2} />
  <Tone isPlaying={true} pitch={0.5} volume={0.05} />
</div>
```
Now the code can be tested as snapshots in time.

jQuery is an imperative framework. The exercise in this folder shows how to take the Bootstrap modal, which follows jQuery’s imperative API, and hiding it behind a declarative React API.
