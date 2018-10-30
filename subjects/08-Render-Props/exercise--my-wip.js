////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a <GeoPosition> component that encapsulates the geo state and
//   watching logic and uses a render prop to pass the coordinates back to
//   the <App>
//
// Got extra time?
//
// - Create a <GeoAddress> component that translates the geo coordinates to a
//   physical address and prints it to the screen (hint: use
//   `getAddressFromCoords`)
// - You should be able to compose <GeoPosition> and <GeoAddress> beneath it to
//   naturally compose both the UI and the state needed to render it
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import getAddressFromCoords from "./utils/getAddressFromCoords";
import LoadingDots from "./LoadingDots";

class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return this.props.render(this.state.coords, this.state.error);
  }
}

class GeoAddress extends React.Component {
  state = { address: null };

  fetchAddress() {
    let { lat, lng } = this.props;

    if (lat && lng) {
      getAddressFromCoords(lat, lng).then(address => {
        this.setState({ address });
      })
    }
  }

  componentDidMount() {
    this.fetchAddress();
  }
  componentDidUpdate() {
    // this.fetchAddress();
  }

  render() {
    return (
      <p>Address is {this.state.address || <LoadingDots />}</p>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <GeoPosition
        render={(coords, error) => (
          <div>
            <h1>Geolocation</h1>
            {error ? (
              <div>Error: {error.message}</div>
            ) : (
              <React.Fragment>
                <dl>
                  <dt>Latitude</dt>
                  <dd>{coords.latitude || <LoadingDots />}</dd>
                  <dt>Longitude</dt>
                  <dd>{coords.longitude || <LoadingDots />}</dd>
                </dl>
                <GeoAddress lat={coords.latitude} lng={coords.longitude} />
              </React.Fragment>
            )}
          </div>
        )}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
