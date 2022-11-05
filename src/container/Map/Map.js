import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import ItemBoxResturant from "../item-resturant";
import { useEffect, useMemo, useState, useCallback } from "react";
import "./react-leaflet-popup.css";
const MapItem = (props) => {
  return (
    <a href={`reservation/${1}`}>
      <div className="mapCart" style={{ display: "flex" }}>
        <div className="" style={{ flex: "1" }}>
          <img
            src={props.img}
            alt=""
            className=" card-image "
          ></img>
        </div>
        <div className="" style={{ padding: "2px 4px"}}>
          <div className="headitem">
            <div className="card-title card-item div-inline pointing">
              <h6> {props.title}</h6>
            </div>

            <div className=" ">
              <span>{props?.category}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const Map = ({ latitude, longitude, restaurants, restaurant }) => {
  const [map, setMap] = useState(null);

  const zoom = 15;
  useEffect(() => {
    if (map && restaurant && longitude && latitude) {
      map.setView([longitude, latitude], zoom);
    }
  }, [latitude, longitude, restaurant?.id, map]);

  const displayMap = useMemo(() => (
    <MapContainer
      ref={setMap}
      center={{ lng: longitude, lat: latitude }}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      {/* <MyComponent longitude={longitude} latitude={latitude} /> */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {restaurant && (
        <Popup
          position={[longitude, latitude]}
          style={{ margin: "0" }}
          margin="0"
        >
          <MapItem
            id={restaurant?.id}
            img={restaurant?.image}
            title={restaurant?.name}
            city={restaurant?.city.name}
            description={restaurant?.description}
            category={restaurant?.category.name}
            status={restaurant?.status}
          />
        </Popup>
      )}
      {restaurants &&
        restaurants.map(
          (r, i) =>
            r?.location && (
              <Marker
                position={[
                  r?.location.coordinates[1],
                  r?.location.coordinates[0],
                ]}
                draggable={false}
                animate={true}
                key={i}
              >
                <Popup>
                  <MapItem
                    id={r?.id}
                    img={r?.image}
                    title={r?.name}
                    city={r?.city.name}
                    description={r?.description}
                    category={r?.category.name}
                    status={r?.status}
                  />
                </Popup>
              </Marker>
            )
        )}
    </MapContainer>
  ));
  return (
    <div
      style={{
        height: "100%",
        width: " 100%",
      }}
    >
      {displayMap}
    </div>
  );
};

export default Map;
