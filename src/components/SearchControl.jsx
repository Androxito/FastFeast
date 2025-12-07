import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";

const SearchControl = ({ onSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      showMarker: true,
      showPopup: false,
      marker: {
        draggable: true,
      },
      autoClose: true,
      retainZoomLevel: false,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const lat = result.location.y;
      const lng = result.location.x;

      onSelect(parseFloat(lat.toFixed(6)), parseFloat(lng.toFixed(6)));
    });

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export default SearchControl;
