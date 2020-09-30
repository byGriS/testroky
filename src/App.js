import React from 'react';
import './App.css';

import cars from './assets/cars';

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import MapSelected from './components/MapSelected/MapSelected'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCar : -1,
    }
  }

  updateData = (value) => {
    this.setState({ selectedCar: value })
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar-wrap">
          <Sidebar 
            cars={cars} 
            selectedCar={this.state.selectedCar}
            updateData={this.updateData}
          />
        </div>
        <div className="content-wrap flex flex-column">
          <div className="header-wrap">
            <Header />
          </div>
          <div className="map-wrap flex-1">
            <MapSelected 
              points={cars}
              updateData={this.updateData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
