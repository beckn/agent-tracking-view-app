import "./App.css";
import React, { useEffect, useState } from "react";
import MapChild from "./MapChild";
import Marker from "./Marker";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  if (status === Status.FAILURE) return <p>My map</p>;
  return <p>Map is loading</p>;
};

const App = () => {
  return (
    <Wrapper render={render} apiKey={"AIzaSyDj_jBuujsEk8mkIva0xG6_H73oJEytXEA"}>
      <MapChild zoom={14}>
        <Marker
          position={{ lat: 12.973437, lng: 77.60877119999999 }}
          icon={"/yellowcar.png"}
        />
      </MapChild>
    </Wrapper>
  );
};

export default App;
