import React, {useState, useEffect} from 'react';
import './style.css';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import IconLocation from '../../icons/location.png'
import IconAirport from '../../icons/airport.png'

const iconLocation = new L.Icon({
  iconUrl: IconLocation,
  iconSize: [35,35],
})

const iconAirport = new L.Icon({
  iconUrl: IconAirport,
  iconSize: [25,25],
})

function Map() {

  return (
      <div className='main-container-map'>
        <div className='container-event'>
          <h3 className='text-light'>Eventos</h3>

          <div className='event'>
            <img src={IconLocation} alt="Icon" />

            <div className='text-event'>
              <label className='text-light' style={{fontSize: '17px'}}>Reunião de pais</label>
              <label className='text-light' style={{fontSize: '14px'}}>12/12/2025 ás 18:00</label>
              <label className='text-light' style={{fontSize: '16px'}}><b>Local</b> Santana, SP</label>
            </div>

          </div>

        </div>
        <MapContainer
          center={[-23.533773, -46.625290]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />      
          <Marker position={[-23.5024844, -46.6247267]} icon={iconLocation}>
            <Popup>Reunião: Inicio 18:00 até 20:00</Popup>
            <Tooltip>Reunião</Tooltip>
          </Marker>
          <Marker position={[-23.5117, -46.6297]} icon={iconAirport}>
            <Popup>Aeroporto</Popup>
          </Marker>
        </MapContainer>
      </div>
  );
}

export default Map;

