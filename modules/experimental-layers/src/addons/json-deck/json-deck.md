# JSONDeck (Experimental)

Creates a `Deck` instance from a JSON description.

The JSON is expected to contain at minimum "layers" and "initialViewState" fields.

The JSON for each layer should be formatted as in described in JSONLayer.


## Usage

```js
import {JSONDeck} from '@deck.gl/experimental-layers';
import mapboxgl from 'mapbox-gl';

import json from './us-map.json';

export const deckgl = new JSONDeck({
  canvas: 'deck-canvas',
  mapContainer: 'map',
  mapboxgl,
  layerCatalog: require('@deck.gl/layers'),
  json
});
```


## Properties


### json : Object | String

A JSON string or a parsed JSON structure.


### layerCatalog : Object

Allows the application to specify which layer types the JSONDeck can use. Expects a map from layer names to layer classes. No layers are supported by default.


### viewCatalog : Object

Allows the application to specify which view types the JSONDeck can use. Expects a map from view names to view classes. The most common views are supported by default.


### mapboxgl : MapboxGL

Optionally lets application import mapbox-gl and supply it. Most Mapbox-gl versions should be compatible.


### `mapboxApiAccessToken` : String

Can be specified as a top level prop, or in JSON (the latter takes precedence).



## JSON Properties

All properties in `prop.json` are passed directly to `Deck`, with the following exceptions


### `json.views` : Array

If supplied, used to create `View` instances from JSON descriptors.

Instantiates views: `{type: MapView, ...props}` to `MapView(...props)`


### `json.layers` : Array

Passed to an instance of `JSONLayer` as the top level layer.


### `json.map` : Boolean

- If set to `true` display a base map. See remarks below.


### `json.mapboxApiAccessToken` : String

Passed to mapbox-gl, takes precedence over `props.mapboxApiAccessToken`/


### `style` : String

An optional mapbox-gl compatible style URL.


## Remarks

* Displaying a base map requires `mapboxgl` top level prop to be provided, a valid `mapboxApiAccessToken` in top level props or props.json, and the view state to have longitude, latitude, zoom fields.
