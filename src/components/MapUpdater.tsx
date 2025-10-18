import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

const MapUpdater = ({ center, zoom }: MapUpdaterProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 2
    });
  }, [center, zoom, map]);

  return null;
};

export default MapUpdater;
