import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { timeToDate, timeToHours, combineByDay } from '../../utils/helper';

import './styles.scss';

/**
 * Detailed weather info
 * @returns {React.Node} - weather details
 */
class WeatherDetail extends Component {
  /**
   * Constructor
   * @param {Object} props - component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
    };
  }

  /**
   * React lifecycle
   * @param {Object} prevProps - component prperties
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    if (prevProps.forecast !== this.props.forecast && this.props.forecast.cod !== '400') {
      this.setState({
        forecast: combineByDay(this.props.forecast),
      });
    }
  }

  /**
   * Detailed weather info
   * @returns {React.Node} - weather details
   */
  render() {
    const { forecast } = this.state;

    return (
      <div className="weather-detail">
        <div className="day">
          <div className="title">&nbsp;</div>
          <div className="content">
            <div className="content-item">
              <div>Hour</div>
              <div>&nbsp;</div>
              <div>&deg;C</div>
              <div>Wind</div>
            </div>
          </div>
        </div>
        {forecast && forecast.map(day => (
          <div key={day[0].dt} className="day">
            <div className="title">{timeToDate(day[0].dt)}</div>
            <div className="content">
              {day.map(hours => (
                <div key={hours.dt} className="content-item">
                  <div>{timeToHours(hours.dt)}</div>
                  <div className="img"><img alt="icon" src={`http://openweathermap.org/img/w/${hours.weather[0].icon}.png`} /></div>
                  <div>{hours.main.temp}&deg;C</div>
                  <div>{Math.round(hours.wind.deg)}&deg;</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

WeatherDetail.propTypes = {
  forecast: PropTypes.object,
};

export default WeatherDetail;
