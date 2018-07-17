/**
 * A simple mapbox-gl wrapper that works with deck props
 * App is responsible for importing mapboxgl and passing it in as a prop:
 *   import mapboxgl from 'mapbox-gl';
 *   const map = new MapboxMap({mapboxgl, ... });
 */
export default class MapboxMap {
  constructor(props) {
    const {mapboxgl, mapboxApiAccessToken, viewState} = props;

    mapboxgl.accessToken = mapboxApiAccessToken || process.env.MapboxAccessToken; // eslint-disable-line

    this._map = new mapboxgl.Map({
      ...props,
      interactive: false,
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch
    });
  }

  setProps(props) {
    const {viewState} = props;

    if (viewState) {
      this._map.jumpTo({
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch
      });
    }
  }

  finalize() {
    this._map.remove();
  }
}
