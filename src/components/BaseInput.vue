<template>
  <div class="d-flex mx-6">
    <v-text-field
      label="Enter city or coordinates"
      outlined
      dense
      append-icon="mdi-magnify"
      v-bind="$attrs"
      v-model="inputValue"
    >
    </v-text-field>
    <v-btn rounded dark color="#2f3371" @click="searchCity" class="ml-4">
      Search
    </v-btn>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      inputValue: "",
    };
  },
  computed: {
    ...mapGetters(["targetWeatherInformation", "centerLatLng", "markerLatLng"]),
  },
  methods: {
    searchCity() {
      if (this.isValidCityName(this.inputValue)) {
        console.log("searchByName");
        store.dispatch("sendRequestForCityLatLng", this.inputValue);
      } else if (this.isValidCoordinate(this.inputValue)) {
        const latLngArray = this.inputValue.split(",");
        store.commit("setCenterLatLng", {
          lat: parseFloat(latLngArray[0]),
          lng: parseFloat(latLngArray[1]),
        });
      }
    },
    isValidCoordinate(string) {
      return /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
        string
      );
    },
    isValidCityName(string) {
      return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(string);
    },
  },
};
</script>
