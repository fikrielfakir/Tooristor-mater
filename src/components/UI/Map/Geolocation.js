import { React, useState, useEffect } from 'react'
import {
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet'

import icon from './constants'

import List from '../Component/List'
import L from 'leaflet'
import 'leaflet-easybutton/src/easy-button'
import 'leaflet-easybutton/src/easy-button.css'

import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

const { BaseLayer } = LayersControl

function LeafletgeoSearch() {
  const map = useMap()
  const provider = new OpenStreetMapProvider({
    params: {
      'accept-language': 'id',
      countrycodes: 'id',
      addressdetails: 1,
    },
  })

  useEffect(() => {
    const searchControl = new SearchControl({
      notFoundMessage: 'Sorry, that address could not be found.',
      provider,
      marker: {
        icon,
      },
    })

    map.addControl(searchControl)

    return () => map.removeControl(searchControl)
  }, [])

  return null
}


export default function MyMapMe() {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!map) return;

    L.easyButton("fa-map-marker", () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }).addTo(map);
  }, [map]);

  return (
    <div className="flex ml-auto">
      <List />
      <div className="w-4/5">
        <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={20}
          style={{ height: '100vh' }}
          whenCreated={setMap}
        >
          <LeafletgeoSearch />
          <LayersControl>
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
              />
            </BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  )
}