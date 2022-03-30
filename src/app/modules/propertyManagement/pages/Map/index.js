import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import geojson2h3 from "geojson2h3";
import * as h3 from "h3-js";
import _ from "lodash";
import * as R from "ramda";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

let map;
let lat_long = [69.0747339, 22.4064165];

export const OVRMap = ({setFieldValue}) => {
    
  const [isMapReady, setIsMapReady] = useState(false);
  const [lastSelectedLand, setLastSelectedLand] = useState(null);
  const [mapMoveendChange, setMapMoveendChange] = useState(true);

  const [multipleLandSelectionList, setmultipleLandSelectionList] = useState(
    []
  );

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZHppZGV2IiwiYSI6ImNsMGdzczh5eTAwb2wzYm8ydjJ5N3Y2ZnEifQ.aai94k_VXL69ONscbCmcaA";
    map = new mapboxgl.Map({
      container: "Map",
      center: lat_long,
      zoom: 5,
      minZoom: 1,
      style: "mapbox://styles/mapbox/light-v9?optimize=true",
      renderWorldCopies: false,
      tileLayer: {
        continuousWorld: false,
        noWrap: true,
      },
    });
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    waitMapStyle();
    const delayedQuery = _.debounce((q) => {
      setMapMoveendChange(Math.random());
    }, 2000);
    map.on("moveend", () => {
      delayedQuery();
    });
  }, []);

      function waitMapStyle() {
        if (!map.isStyleLoaded()) {
          setTimeout(waitMapStyle, 200);
        } else {
          setIsMapReady(true);
        }
      }

      useEffect(() => {
        // console.debug(
        //   'EFFECT [isMapReady, onSingleView, onMultipleLandSelection, multipleLandSelectionList]'
        // )
        if (isMapReady === true) {
          plotHighZoomPOI();
          map.doubleClickZoom.enable();
        }
      }, [
        isMapReady
      ]);

      useEffect(() => {
        // console.debug('EFFECT [ onMultipleLandSelection, lastSelectedLand]')
        let onClickMap;
        if (map) {
          onClickMap = (e) => {
            // At click go to Land
            const clicked_hex_id = h3.geoToH3(e.lngLat["lat"], e.lngLat["lng"], 12);
            setFieldValue("hexID", clicked_hex_id)
            if (map.getZoom() < 17) {
              zoomOnfocusMap(clicked_hex_id);
            }
    
            // At click add in list if on Multiple Land Selection Mode
            focusMap(clicked_hex_id);
    
            if (!R.isNil(clicked_hex_id)) {
              focusMap(clicked_hex_id);
            }
            let list = multipleLandSelectionList;
            if (R.includes(clicked_hex_id, list) && !R.isNil(list)) {
              // Remove Land
              _.remove(list, (el) => el === clicked_hex_id);
            } else {
              list.push(clicked_hex_id);
              setmultipleLandSelectionList(list);
            }
            setLastSelectedLand(clicked_hex_id);
    
          };
          map.on("click", onClickMap);
        }
    
        return () => {
          if (map) {
            map.off("click", onClickMap);
          }
        };
      }, [lastSelectedLand]);

      function plotHighZoomPOI() {
        // Zoom out map // General Map View
        map.flyTo({
          center: lat_long,
          zoom: 18,
          speed: 1.8,
        });
    
        // Render High Zoom grids and Clusters
        // Show hex grid on high zoom
        const zoomThreshold = 17;
        const delayedQuery = _.debounce((q) => {
          if (map.getZoom() > 7) {
            if (map.getZoom() > zoomThreshold) {
              let hexs = hexagons();
              // Render general hexes
              renderHighZoomHexes(hexs);
              //renderHighZoomInterestingHexes(hexs);
            } else {
              let outHexs = Outerhexagons(Math.floor(map.getZoom()));
              // Render outer general hexes
              renderHighZoomHexes(outHexs);
            }
          } else {
            // Render owned Landss
            renderHighZoomHexes([]);
          }
        }, 1000);
        map.on("moveend", () => {
          delayedQuery();
        });
      }

      function renderHighZoomHexes(hexagons) {
        const geojson = geojson2h3.h3SetToFeatureCollection(
          Object.keys(hexagons),
          (hex) => ({
            value: hexagons[hex],
          })
        );
        const sourceId = "h3-hexes";
        const layerId = `${sourceId}-layer`;
        let source = map.getSource(sourceId);
    
        if (!source) {
          map.addSource(sourceId, {
            type: "geojson",
            data: geojson,
          });
          map.addLayer({
            id: layerId,
            source: sourceId,
            type: "fill",
            interactive: false,
            paint: {
              "fill-outline-color": "#5F39BE",
            },
          });
          source = map.getSource(sourceId);
        }
    
        // Update the geojson data
        source.setData(geojson);
    
        // Update the layer paint properties, using the current config values
        map.setPaintProperty(layerId, "fill-opacity", 0.2);
    
        map.setPaintProperty(layerId, "fill-color", {
          property: "value",
          stops: [
            [0, "rgba(255,255,255, 0)"],
            [0.5, "rgba(255,255,255, 0)"],
            [1, "rgba(255,255,255, 0)"],
          ],
        });
      }

      function zoomOnfocusMap(hex_id) {
        // Hex to geo
        let hexCenterCoordinates = h3.h3ToGeo(hex_id);
        // Move map focus
        map.flyTo({
          center: [hexCenterCoordinates[1], hexCenterCoordinates[0]],
          zoom: map.getZoom() + 2,
          speed: 1.8,
        });
      }

      function focusMap(hex_id) {
        // Hex to geo
        let hexCenterCoordinates = h3.h3ToGeo(hex_id);
        // Move map focus
        map.flyTo({
          center: [hexCenterCoordinates[1], hexCenterCoordinates[0]],
          zoom: 18,
          speed: 1.8,
        });
        // Plot graphic point into map
        let singleHexGeojson = geojson2h3.h3ToFeature(hex_id);
    
        const selected_sourceId = "h3-hexes_selected";
        const selected_layerId = `${selected_sourceId}-layer`;
        let selected_source = map.getSource(selected_sourceId);
        if (!selected_source) {
          map.addSource(selected_sourceId, {
            type: "geojson",
            data: singleHexGeojson,
          });
          map.addLayer({
            id: selected_layerId,
            source: selected_sourceId,
            type: "fill",
            interactive: false,
            paint: {
              "fill-outline-color": "#4A90E2",
              "fill-color": "rgba(74,144,226,0.20)",
              "fill-opacity": 1,
            },
          });
          selected_source = map.getSource(selected_sourceId);
        }
        // Update the h3Geo data
        selected_source.setData(singleHexGeojson);
        map.setLayoutProperty(selected_layerId, "visibility", "visible");
      }

      function hexagons() {
        var center = map.getCenter();
        const centerHex = h3.geoToH3(center["lat"], center["lng"], 12);
        const kRing = h3.kRing(centerHex, 20);
        var data = Object.assign({}, kRing);
        var newData = Object.keys(data).reduce(function (obj, key) {
          obj[data[key]] = Math.random();
          return obj;
        }, {});
        return newData;
      }
    
      function Outerhexagons(zoom) {
        let resolution = zoom - 5 < 12 ? zoom - 5 : 12;
        resolution = resolution < 5 ? 5 : resolution;
        var center = map.getCenter();
        const centerHex = h3.geoToH3(center["lat"], center["lng"], 12);
        const h3ToParent = h3.h3ToParent(centerHex, resolution);
        const kRing = h3.kRing(h3ToParent, 50);
        var data = Object.assign({}, kRing);
        var newData = Object.keys(data).reduce(function (obj, key) {
          obj[data[key]] = Math.random();
          return obj;
        }, {});
        return newData;
      }

      return (
        <div id="Map" className="Map" style={{height: '70vh', width: '100vh'}}></div>
        );
}