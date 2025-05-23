<template>
  <v-dialog persistent scrollable v-model="dialog">
    <v-sheet class="mx-auto">
      <div class="d-flex pa-2">
        <div class="d-flex align-center pl-2 text-subtitle-2">
          <slot name="header"></slot>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            @click="toggleIsActive()"
            density="compact"
            icon="mdi-window-close"
          ></v-btn>
        </div>
      </div>
      <v-divider class="mb-2"></v-divider>
      <slot @toggle-is-active="toggleIsActive()"></slot>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: this.isActive,
    };
  },
  methods: {
    toggleIsActive() {
      this.$emit('toggle-is-active');
    },
  },
  watch: {
    isActive(newVal) {
      this.dialog = newVal;
    },
  },
};
</script>
