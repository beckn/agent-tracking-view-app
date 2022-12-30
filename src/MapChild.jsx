import React from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

const MapChild = ({ center, zoom, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  const calculateAndDisplayRoute = async (start, end, mapComp) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setOptions({
      polylineOptions: {
        strokeColor: "#f37a20",
      },
    });
    directionsRenderer.setMap(mapComp);
    await directionsService
      .route({
        origin: start,
        destination: end,
        travelMode: "DRIVING",
      })
      .then((response, status) => {
        console.log("status", response);
        directionsRenderer.setDirections(response);
      })
      .catch((e) => {
        console.error("error", e);
        window.alert("Directions request failed due to " + e.message);
      });
  };

  useDeepCompareEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        })
      );
    }
    calculateAndDisplayRoute(
      "J. P. Nagar, Bengaluru, Karnataka, India",
      "Wework Galaxy, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka, India",
      map
    );
  }, [ref, map, center, zoom]);

  return (
    <>
      <div ref={ref} id="map" style={{ width: "100vw", height: "100vh" }} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default MapChild;
