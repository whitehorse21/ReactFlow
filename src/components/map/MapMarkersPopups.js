import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { Box, Typography } from '@material-ui/core';
//
import {
  MapControlPopup,
  MapControlMarker,
  MapControlScale,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlFullscreen
} from './controls';

// ----------------------------------------------------------------------

MapMarkersPopups.propTypes = {
  data: PropTypes.array
};

export default function MapMarkersPopups({ data, ...other }) {
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    zoom: 2
  });

  return (
    <>
      <MapGL {...viewport} onViewportChange={setViewport} {...other}>
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />

        {data.map((country) => (
          <MapControlMarker
            key={country.name}
            latitude={country.latlng[0]}
            longitude={country.latlng[1]}
            onClick={() => setTooltip(country)}
          />
        ))}

        {tooltip && (
          <MapControlPopup longitude={tooltip.latlng[1]} latitude={tooltip.latlng[0]} onClose={() => setTooltip(false)}>
            <Box sx={{ color: 'common.white' }}>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    height: '18px',
                    minWidth: '28px',
                    marginRight: '8px',
                    borderRadius: '4px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/${tooltip.country_code.toLowerCase()}.svg)`
                  }}
                />
                <Typography variant="subtitle2">{tooltip.name}</Typography>
              </Box>
              <Typography component="div" variant="caption">
                Timezones: {tooltip.timezones}
              </Typography>
              <Typography component="div" variant="caption">
                Lat: {tooltip.latlng[0]}
              </Typography>
              <Typography component="div" variant="caption">
                Long: {tooltip.latlng[1]}
              </Typography>
              <Box
                component="img"
                alt={tooltip.name}
                src={tooltip.photo}
                sx={{
                  mt: 1,
                  height: 90,
                  width: '100%',
                  borderRadius: 1,
                  objectFit: 'cover'
                }}
              />
            </Box>
          </MapControlPopup>
        )}
      </MapGL>
    </>
  );
}
