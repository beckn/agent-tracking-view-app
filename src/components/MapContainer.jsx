import "../App.css";
import React, { useEffect, useState } from "react";
import MapChild from "./MapChild";
import Marker from "./Marker";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useIntervalAsync from "../customHook/useIntervalAsync";

const render = (status) => {
  if (status === Status.FAILURE) return <p>My map</p>;
  return <p>Map is loading</p>;
};

const MapContainer = () => {
  // const [start, setStart] = useState("12.906343,77.585683");
  // const [end, setEnd] = useState("12.973437,77.608771");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [vehicleLat, setVehicleLat] = useState(0);
  const [vehicleLang, setVehicleLang] = useState(0);

  useEffect(() => {
    const URL = window.location.href;
    const encodedMetaData = URL.slice(URL.indexOf("=") + 1);

    if (!encodedMetaData.includes("http")) {
      const decodedMetaData = JSON.parse(window.atob(encodedMetaData));
      setTrackingUrl(decodedMetaData.poll_url);
      setStart(decodedMetaData.start);
      setEnd(decodedMetaData.end);
    }
  }, []);

  const fetchTrackingDetails = React.useCallback(async () => {
    if (trackingUrl.length > 0) {
      await fetch(trackingUrl)
        .then((res) => res.json())
        .then((result) => {
          const gps = "12.906343,77.585683".split(",");
          setVehicleLat(parseFloat(gps[0]));
          setVehicleLang(parseFloat(gps[1]));
        })
        .catch((e) => console.error(e));
    }
  }, [trackingUrl]);

  useIntervalAsync(fetchTrackingDetails, 2000);

  if (!start.length || !end.length) {
    return <p>Fetchng pickup and source location</p>;
  }

  return (
    <Wrapper render={render} apiKey={"AIzaSyDj_jBuujsEk8mkIva0xG6_H73oJEytXEA"}>
      <MapChild start={start} end={end} zoom={14}>
        <Marker
          position={{ lat: vehicleLat, lng: vehicleLang }}
          icon={"/yellowcar.png"}
        />
      </MapChild>
    </Wrapper>
  );
};

export default MapContainer;
