import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './styles.scss';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/**
 * Map component
 * @returns {React.Node} - map
 */
class Map extends Component {
  /**
   * Constructor
   * @param {Object} props - component properties
   */
  constructor(props) {
    super(props);

    const { position, zoom } = props;

    this.state = {
      position,
      zoom,
    };
  }

  /**
   * Component did update
   * @param {Object} prevProps - component properties
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position) {
      this.setState({
        position: this.props.position,
      });
    }
  }

  /**
   * Click event
   * @param {Object} e - event
   * @returns {void}
   */
  handleClick = e => {
    this.setState({
      position: e.latlng,
    }, () => this.props.onChange(e.latlng));
  };

  /**
   * Renders component
   * @returns {React.Node} - map
   */
  render() {
    const { position, zoom } = this.state;
    return (
      <LeafletMap
        center={position}
        zoom={zoom}
        onClick={this.handleClick}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

Map.propTypes = {
  position: PropTypes.array,
  zoom: Number,
  onChange: PropTypes.func.isRequired,
};

Map.defaultProps = {
  position: [40.18, 44.51],
  zoom: 9,
};

export default Map;
