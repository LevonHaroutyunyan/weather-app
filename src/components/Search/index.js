import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { search } from '../../utils/helper';

import './styles.scss';

/**
 * Search component
 * @returns {React.Node} - search component
 */
class Search extends Component {
  state = {
    cities: this.props.cities,
    isOpen: false,
  };

  handleChange = ({ target: { value } }) => {
    const { cities } = this.props;

    this.setState({
      cities: search(cities, value),
      isOpen: true,
    });
  };

  handleClick = ({ target: { dataset } }) => {
    this.props.onSelect(dataset);
    this.setState({
      isOpen: false,
    });
  };

  /**
   * Search component
   * @returns {React.Node} - search component
   */
  render() {
    const { cities, isOpen } = this.state;
    return (
      <div className="filter">
        <input
          onChange={this.handleChange}
        />
        {isOpen && (
          <div className="filter-data">
            {cities && cities.slice(0, 9).map(city => (
              <div
                key={city.name}
                className="filter-data-item"
                data-lat={city.lat}
                data-lng={city.lng}
                onClick={this.handleClick}
              >
                {city.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

export default Search;
