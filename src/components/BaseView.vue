<template>
  <v-container>
    <v-card shaped dark color="#161a53" class="my-6 pa-8">
      <v-row>
        <v-col cols="12" sm="12" md="8" class="px-8">
          <MapComponent />
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <BaseInput />
          <InformationComponent />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import InformationComponent from "@/components/InformationComponent.vue";
import BaseInput from "@/components/BaseInput.vue";
import MapComponent from "@/components/MapComponent.vue";

export default Vue.extend({
  name: "BaseView",
  components: {
    InformationComponent,
    BaseInput,
    MapComponent,
  },

  data: () => ({
    return: {},
  }),
});
</script>
