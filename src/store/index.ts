import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import { latLng } from "leaflet";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    // Default value map's parameters
    center: latLng(52.38433, 4.90822),
    marker: latLng(52.38433, 4.90822),
    // Request's Response
    weatherInfo: {
      latitude: null,
      longitude: null,
      generationtime_ms: null,
      utc_offset_seconds: null,
      elevation: null,
      daily_units: {},
      daily: {
        time: [],
        temperature_2m_max: [],
        temperature_2m_min: [],
        sunrise: [],
        sunset: [],
        precipitation_sum: [],
        weathercode: [],
      },
    },
    centerName: "Amsterdam",
    status: [false, false, false],
    loading: false,
    error: { text: "", status: false },
  },
  getters: {
    targetWeatherInformation(state) {
      const targetWeatherInformation = {
        temperature_2m_max: null,
        temperature_2m_min: null,
        sunrise: null,
        sunset: null,
        precipitation_sum: null,
        weatherCode: null,
      };
      targetWeatherInformation.temperature_2m_max =
        state.weatherInfo.daily.temperature_2m_max[0];
      targetWeatherInformation.temperature_2m_min =
        state.weatherInfo.daily.temperature_2m_min[0];
      targetWeatherInformation.sunrise = state.weatherInfo.daily.sunrise[0];
      targetWeatherInformation.sunset = state.weatherInfo.daily.sunset[0];
      targetWeatherInformation.precipitation_sum =
        state.weatherInfo.daily.precipitation_sum[0];
      targetWeatherInformation.weatherCode =
        state.weatherInfo.daily.weathercode[0];
      return targetWeatherInformation;
    },

    centerLatLng(state: { center: any }) {
      return state.center;
    },

    markerLatLng(state: { marker: any }) {
      return state.marker;
    },
    nameOfCenter(state: { centerName: string }) {
      return state.centerName;
    },
    loadingStatus(state: { loading: boolean }) {
      return state.loading;
    },
    errorInfo(state: { error: { text: string; status: boolean } }) {
      return state.error;
    },
  },
  mutations: {
    setWeatherInfo(state: { weatherInfo: any }, payload: any) {
      state.weatherInfo = payload;
    },
    setCenterLatLng(state: { center: any }, payload: any) {
      state.center = payload;
    },
    setMarkerLatLng(state: { marker: any }, payload: any) {
      state.marker = payload;
    },
    setCenterName(state: { centerName: string }, payload: any) {
      state.centerName = payload.city;
    },
    setStatus(state, payload) {
      state.status[payload.index] = payload.status;
      let status = false;
      state.status.map(function (statusItem) {
        status = statusItem || status;
      });
      state.loading = status;
    },
    setError(state: { error: any }, payload: any) {
      state.error.text = payload.text;
      state.error.status = payload.status;
    },
  },
  actions: {
    // put marker in center and get name of city and weather information
    centerLatLngUpdated({ dispatch, commit }: any, payload: any) {
      commit("setMarkerLatLng", payload);
      dispatch("sendRequestForCenterName");
      dispatch("sendRequestForWeatherData");
    },
    // call API for name of center
    sendRequestForCenterName: ({ commit, state }: any) => {
      commit("setStatus", { index: 0, status: true });
      Vue.axios
        .get(
          "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
            state.marker.lat +
            "&lon=" +
            state.marker.lng +
            "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=Europe%2FLondon"
        )
        .then((response: { data: any }) => {
          commit("setCenterName", response.data.address);
          commit("setStatus", { index: 0, status: false });
        })
        .catch(() =>
          commit("setError", {
            text: "Something went wrong, Please Try Again!",
            status: true,
          })
        );
    },
    // call API for weather information
    sendRequestForWeatherData: ({ commit, state }: any) => {
      commit("setStatus", { index: 1, status: true });
      Vue.axios
        .get(
          "https://api.open-meteo.com/v1/forecast?latitude=" +
            state.marker.lat +
            "&longitude=" +
            state.marker.lng +
            "&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=Europe%2FLondon"
        )
        .then((response: { data: any }) => {
          commit("setWeatherInfo", response.data);
          commit("setStatus", { index: 1, status: false });
        })
        .catch(() =>
          commit("setError", {
            text: "Something went wrong, Please Try Again!",
            status: true,
          })
        );
    },
    // call API for coordinate of name
    sendRequestForCityLatLng: ({ commit }: any, city: string) => {
      commit("setStatus", { index: 2, status: true });
      Vue.axios
        .get(
          "https://nominatim.openstreetmap.org/search?city=" +
            city +
            "&format=json"
        )
        .then((response: { data: any }) => {
          commit("setCenterLatLng", {
            lat: response.data[0].lat,
            lng: response.data[0].lon,
          });
          commit("setStatus", { index: 2, status: false });
        })
        .catch(() =>
          commit("setError", {
            text: "Something went wrong, Please Try Again!",
            status: true,
          })
        );
    },
  },
  modules: {},
});
