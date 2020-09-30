import React from 'react';
import './map-selected.css';
import { YMaps, Map, Placemark } from "react-yandex-maps";

class MapSelected extends React.Component {

  onPlacemarkClick = point => () => {
    this.props.updateData(point.id);
  };

  render() {
    return (
      <div className="map-selected">
        <YMaps>
          <Map
            width='100%'
            height='100%'
            defaultState={{
              center: [55.75, 37.57],
              zoom: 11
            }} >
            {this.props.points.map((point, index) => (
              <Placemark
                key={index}
                geometry={point.coords}
                onClick={this.onPlacemarkClick(point)}
              />
            ))}
          </Map>
        </YMaps>
        <div class="block">
          <div class="block-count">
            {this.props.points.length} шт.
          </div>
          <div class="block-desc">
            доступной к заказу техники
          </div>
        </div>
      </div>
    )
  }
}

export default MapSelected;