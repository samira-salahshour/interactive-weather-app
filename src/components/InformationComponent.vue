<template>
  <v-card
    dark
    color="#2f3371"
    class="text-center mx-6"
    outlined
    shaped
    :loading="loadingStatus"
  >
    <template slot="progress">
      <v-progress-linear color="#ffa384 " indeterminate></v-progress-linear>
    </template>
    <div>
      <AnimatedWeatherIcons />
    </div>
    <v-card-text>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ nameOfCenter }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon medium color="green "> mdi-map-marker</v-icon>
            City
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ targetWeatherInformation.temperature_2m_max }}&deg;C
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon medium color="red "> mdi-thermometer-high</v-icon>
            Highest Temperature
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ targetWeatherInformation.temperature_2m_min }}&deg;C
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon medium color="blue lighten-2">mdi-thermometer-low</v-icon>
            Lowest Temperature
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ targetWeatherInformation.precipitation_sum }}mm
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon medium color="blue"> mdi-water</v-icon>
            Precipitation
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ targetWeatherInformation.sunrise | moment }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon medium color="yellow "> mdi-weather-sunset-up</v-icon>
            Sunrise Time
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ targetWeatherInformation.sunset | moment }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon medium color="orange darken-2">
              mdi-weather-sunset-down
            </v-icon>
            Sunset Time
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import moment from "moment";
import { mapGetters } from "vuex";
import AnimatedWeatherIcons from "@/components/AnimatedWeatherIcons.vue";

export default {
  components: {
    AnimatedWeatherIcons,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "targetWeatherInformation",
      "centerLatLng",
      "markerLatLng",
      "nameOfCenter",
      "loadingStatus",
    ]),
  },
  methods: {},
  filters: {
    moment(date) {
      return moment(date).format("h:mm a");
    },
  },
};
</script>
