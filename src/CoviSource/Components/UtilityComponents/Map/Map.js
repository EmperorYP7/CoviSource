import React, { useCallback, useRef, useState } from "react";
import propTypes from "prop-types";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./mapstyles.scss";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./Map.style";

const config = {
  googleMapsApiKey: "AIzaSyCxttBHhvoDHLXbUgnMtjO3OVDw46iFSQw",
  libraries: ["places"],
};

const options = {
  styles: styles,
  disableDefaultUI: true,
  zoomControl: true,
};

Map.propTypes = {
  currentPosition: propTypes.object,
  setter: propTypes.func || undefined,
  setpanTo: propTypes.any || undefined,
  width: propTypes.string,
  height: propTypes.string,
  zoom: propTypes.number || undefined,
  search: propTypes.bool || undefined,
  mapSearch: propTypes.bool,
};

function Map(props) {
  const {
    currentPosition,
    setter,
    setpanTo,
    width,
    height,
    zoom,
    search,
    mapSearch,
  } = props;
  const { isLoaded, loadError } = useLoadScript(config);
  const [position, setPosition] = useState({
    lat: currentPosition.lat,
    lng: currentPosition.lng,
  });
  const mapContainerStyle = {
    width: width ? width : "20vw",
    height: height ? height : "20vh",
  };
  const onLoad = () => {
    setter ? setter(position) : null;
  };
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  console.log(setPosition, setpanTo);

  if (loadError) {
    return "Error Loading Map";
  }
  if (!isLoaded) {
    return "Map loading...";
  }

  return (
    <div className="gmap">
      {mapSearch ? (
        <div className="mapsearch">
          {search && <MapSearch currentPosition={position} panTo={panTo} />}
        </div>
      ) : null}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={zoom ? zoom : 10}
        center={position}
        options={options}
        className="map-container"
        onLoad={onMapLoad}
      >
        <Marker onLoad={onLoad} position={position} />
      </GoogleMap>
    </div>
  );
}

MapSearch.propTypes = {
  currentPosition: propTypes.object,
  panTo: propTypes.func,
};

function MapSearch(props) {
  const { currentPosition, panTo } = props;
  const [position, setPosition] = useState(currentPosition);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => position.lat,
        lng: () => position.lng,
      },
      radius: 100 * 1000,
    },
  });
  if (ready) {
    console.log(position);
  }
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address: address });
      const { lat, lng } = await getLatLng(results[0]);
      const newPos = {
        lat: lat,
        lng: lng,
      };
      setPosition(newPos);
      panTo(newPos);
    } catch (err) {
      console.log("error!");
    }
  };

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Search for your institution here"
          className="mapsearch"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

// Map.defaultProps = {
//   places: false
// };

export default Map;
