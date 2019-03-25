import React, { Component } from 'react';

import { get, getCities } from '../utils/api';

import Search from './Search';
import Map from './Map';
import WeatherDetail from './WeatherDetail';

/**
 * App component
 * @returns {React.Node} - app
 */
class App extends Component {
  /**
   * Constructor
   * @param {Object} props - component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      position: [40.18, 44.51],
      result: null,
      cities: null,
    };
  }

  /**
   * Component did mount
   * @returns {void}
   */
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
      const forecast = await get(latitude, longitude);

      const cities = await getCities();

      this.setState({
        position: [latitude, longitude],
        forecast,
        cities,
      });
    });
  }

  /**
   * Click event
   * @param {Array} latlng - latitude & longitude
   * @returns {void}
   */
  handleChange = async latlng => {
    const result = await get(latlng.lat, latlng.lng);

    this.setState({
      position: [latlng.lat, latlng.lng],
      forecast: result,
    });
  };

  /**
   * App component
   * @returns {React.Node} - app
   */
  render() {
    const { cities, forecast, position } = this.state;

    return (
      <div className="container">
        <Search
          cities={cities}
          onSelect={this.handleChange}
        />
        <Map
          position={position}
          onChange={this.handleChange}
        />
        <WeatherDetail forecast={forecast} />
      </div>
    );
  }
}

export default App;
