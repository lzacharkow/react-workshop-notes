////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make `withMouse` a "higher-order component" that sends the mouse position
//   to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function withMouse(Component) {
  return class WithMouse extends React.Component {
    state = {
      mouse: {},
    };

    getMouseCoordinates = (e) => {
      const { clientX: x, clientY: y } = e;
      this.setState({ mouse: { x, y } });
    }

    render() {
      return (
        <div onMouseMove={this.getMouseCoordinates}>
          <Component {...this.props} mouse={this.state.mouse} />
        </div>
      );
    }
  };
}

function withCat(Component) {
  return class WithCat extends React.Component {
    static propTypes = {
      mouse: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired
    };

    render() {
      let { mouse } = this.props;
      let style = { top: mouse.y, left: mouse.x };

      return (
        <React.Fragment>
          <div
            className="cat"
            style={style}
          />
          <Component {...this.props} />
        </React.Fragment>
      );

      // return (
      //   <div
      //     className="cat"
      //     style={
      //       this.props.mouse && ({
      //         top: this.props.mouse.y,
      //         left: this.props.mouse.x,
      //       })
      //     }
      //     >
      //     <Component {...this.props} />
      //   </div>
      // );
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  };

  render() {
    const { mouse } = this.props;

    return (
      <div className="container">
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    );
  }
}

const AppWithMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
