<template>
  <l-map
    :zoom="zoom"
    :center="centerLatLng"
    @update:zoom="updateZoom"
    @update:center="updateCenter"
    class="mapClass"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng">
      <l-tooltip :options="{ permanent: true, interactive: true }">
        <div>
          <P>Max.Temp: {{ targetWeatherInformation.temperature_2m_max }}</P>
          <P>Min.Temp: {{ targetWeatherInformation.temperature_2m_min }}</P>
          <P>Precipitation: {{ targetWeatherInformation.precipitation_sum }}</P>
          <P>Sunrise Time: {{ targetWeatherInformation.sunrise | moment }}</P>
          <P>Sunset Time: {{ targetWeatherInformation.sunset | moment }}</P>
        </div>
      </l-tooltip>
    </l-marker>
  </l-map>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import store from "../store";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import { Icon } from "leaflet";
import moment from "moment";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 10,
    };
  },
  computed: {
    ...mapGetters(["targetWeatherInformation", "centerLatLng", "markerLatLng"]),
  },
  created() {
    store.dispatch("sendRequestForWeatherData", {
      lat: this.markerLatLng.lat,
      lng: this.markerLatLng.lng,
    });
  },
  methods: {
    updateZoom(zoom) {
      this.zoom = zoom;
    },
    updateCenter(center) {
      store.dispatch("centerLatLngUpdated", {
        lat: center.lat,
        lng: center.lng,
      });
    },
  },
  filters: {
    moment(date) {
      return moment(date).format("h:mm a");
    },
  },
};
</script>
<style lang="scss">
$small: 300px;
$medium: 960px;

.mapClass {
  //some CSS
  @media screen and (max-width: $medium) {
    width: 100%;
    height: 500px !important;
    position: relative;
    z-index: 0;
  }
  @media screen and (min-width: $medium) {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
  }
}
</style>
