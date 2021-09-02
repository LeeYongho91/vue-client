<template>
  <div class="text-center">
    <v-dialog v-model="isDialogShow" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-text-field v-model="nickname" label="닉네임"> </v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
    };
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      console.log(this.nickname);
      this.isDialogShow = false;
    },
  },
  computed: {
    isDialogShow: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit('closeDialog', value);
      },
    },
    isModalType() {
      return this.modalType;
    },
  },
};
</script>

<style></style>
