import {CompositeLayer} from '@deck.gl/core';

const defaultProps = {
  layerCatalog: [],
  json: {}
};

export default class JSONLayer extends CompositeLayer {
  initializeState() {
    this.state = {
      layers: []
    };
  }

  updateState({props, oldProps}) {
    const layersChanged =
      props.json !== oldProps.json || props.layerCatalog !== oldProps.layerCatalog;

    if (layersChanged) {
      // Optionally accept JSON strings by parsing them
      const json = typeof props.json === 'string' ? JSON.parse(props.json) : props.json;
      this.state.layers = this._getJSONLayers(json, props.layerCatalog);
    }
  }

  _getJSONLayers(jsonLayers = [], layerCatalog) {
    // assert(Array.isArray(jsonLayers));
    return jsonLayers.map(jsonLayer => {
      const Layer = layerCatalog[jsonLayer.type];
      return Layer && new Layer(jsonLayer);
    });
  }

  renderLayers() {
    return this.state.layers;
  }
}

JSONLayer.layerName = 'jsonLayer';
JSONLayer.defaultProps = defaultProps;
