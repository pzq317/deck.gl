import {Deck, MapView, FirstPersonView, OrbitView} from '@deck.gl/core';
import JSONLayer from '../json-layer/json-layer';
import MapboxMap from '../mapbox-map/mapbox-map';

const DEFAULT_VIEW_CATALOG = {MapView, FirstPersonView, OrbitView};

export default class JSONDeck {
  constructor(props) {
    // Optionally accept JSON strings by parsing them
    const json = typeof props.json === 'string' ? JSON.parse(props.json) : props.json;

    // Create map if requested (props.mapboxgl is supplied)
    this.map = this._createMap(props, json);

    const newProps = this._parseJsonProps(props);

    newProps.onViewStateChange = ({viewState}) => {
      if (this.map) {
        this.map.setProps({viewState});
      }
    };

    if ('canvas' in props) {
      newProps.canvas = props.canvas;
    }

    this.deck = new Deck(newProps);
    this.deck.setProps(props);
  }

  finalize() {
    this.map.finalize();
  }

  setProps(props) {
    this.deck.setProps(this._parseJsonProps(props));
  }

  // Parse `json` prop and extract `views` and `layers`
  _parseJsonProps(props) {
    const {layerCatalog = [], viewCatalog = []} = props;

    // Optionally accept JSON strings by parsing them
    const json = typeof props.json === 'string' ? JSON.parse(props.json) : props.json;

    // Create a deck instance with props, views and layers extracted from JSON
    const newProps = Object.assign({}, props, json, {
      json,
      // Use the composite JSON layer to render any layers
      layers: new JSONLayer({json: json.layers, layerCatalog})
    });

    if ('views' in props) {
      newProps.views = this.getJSONViews(json.views, viewCatalog);
    }

    return newProps;
  }

  // Instantiates views: `{type: MapView, ...props}` to `MapView(...props)`
  _getJSONViews(jsonViews, viewCatalog) {
    // assert(Array.isArray(jsonLayers));
    return jsonViews.map(jsonView => {
      const View = viewCatalog[jsonView.type] || DEFAULT_VIEW_CATALOG[jsonView.type];
      return View && new View(jsonView);
    });
  }

  // Creates the base mapbox map
  // TODO - map should only be created once and made visible or invisible based on json settings
  // TODO - support base map in multiple views / multiple base maps?
  _createMap(props, json) {
    const mapboxApiAccessToken = json.mapboxApiAccessToken || props.mapboxApiAccessToken;
    const style = json.style || props.style || 'mapbox://styles/mapbox/light-v9';

    return (
      props.mapboxgl &&
      json.map &&
      new MapboxMap({
        mapboxgl: props.mapboxgl,
        container: props.mapContainer,
        mapboxApiAccessToken,
        style,
        viewState: json.initialViewState || json.viewState,
        reuseMap: true
      })
    );
  }
}
