import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './MapObject.css'
import { defaultMarker } from "./defaultMarker";
import { popupContent, popupHead, popupText, okText } from "./popupStyles";


const Map = (props) => {
const position = props.position
const center = props.position
        return (
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
               <Marker position={center} icon={defaultMarker}>
        <Popup className="request-popup">
          <div style={popupContent}>
            <div className="title_shop">
            {props.shopName}
            </div>
            <img
              src={props.img}
              width="150"
              height="150"
              alt="no img"
            />
            
          </div>
        </Popup>
      </Marker>
            </MapContainer>           
        );
}
export default Map