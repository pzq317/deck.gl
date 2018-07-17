import {JSONDeck} from '@deck.gl/experimental-layers';
import mapboxgl from 'mapbox-gl';

import json from './json-files/us-map.json';
// import json from './json-files/dot-text.json';
// import json from './json-files/screen-grid.json';

const layerCatalog = Object.assign(
  {},
  require('@deck.gl/layers'),
  require('@deck.gl/experimental-layers')
);

export const deckgl = new JSONDeck({
  canvas: 'deck-canvas',
  mapContainer: 'map',
  mapboxgl,
  layerCatalog,
  json
});
