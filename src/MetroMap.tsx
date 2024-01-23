import React, { useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl/maplibre';
import Select from 'react-select';
import metroData from './assets/metro.json';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Station {
  text: string;
  longitude: number;
  latitude: number;
}

function MetroMap() {
  const [selectedStations, setSelectedStations] = useState<Station[]>([]);
  const handleSelectChange = (selectedOptions: { value: Station; label: string; }[] | null) => {
    setSelectedStations(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const geojson = {
    type: 'FeatureCollection',
    features: selectedStations.map(station => ({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [station.longitude, station.latitude]
      }
    }))
  };

  const options = metroData.nodes.map(station => ({
    value: station as Station,
    label: station.text,
  }));

  return (
    <div style={{width: "100vw", height: "100%"}}>
      <Select
        style={{height: "10vh", color: "black"}}
        isMulti
        name="stations"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelectChange as any}
        styles={{
            option: (provided) => ({
              ...provided,
              color: 'black',
            }),
          }}
      />
      <MapGL
        style={{width: "100%", height: "90vh"}}
        initialViewState={{
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12,
        }}
        mapStyle='https://api.maptiler.com/maps/0ad52f6b-ccf2-4a36-a9b8-7ebd8365e56f/style.json?key=y2DTSu9yWiu755WByJr3'
      >
        <Source type="geojson" data={geojson as any}>
          <Layer
            id="stations"
            type="circle"
            paint={{
              'circle-radius': 20,
              'circle-color': '#B42222',
              'circle-opacity': 0.5
            }}
          />
        </Source>
      </MapGL>
    </div>
  );
}

export default MetroMap;