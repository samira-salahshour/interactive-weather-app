<template>
  <v-app>
    <v-app-bar app color="#161a53 " dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/ClimatesLogo.png"
          transition="scale-transition"
          width="50"
        />
      </div>
      <v-spacer></v-spacer>
      <span class="font-weight-bold mr-2">Interactive Weather App</span>
    </v-app-bar>

    <v-main class="mainClass">
      <router-view />
      <v-snackbar
        color="red"
        absolute
        shaped
        top
        left
        type="error"
        v-model="errorInfo.status"
        timeout="2000"
      >
        {{ errorInfo.text }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "App",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["errorInfo"]),
  },
});
</script>
<style>
.mainClass {
  background-color: #2f3371;
}
</style>
