<template>
  <div class="text-center">
    <v-dialog v-model="isModalShow" width="300">
      <v-card>
        <v-card-title class="text-h5 white--text" dark :class="isModalType">
          <span v-if="isModalType === 'error'"> 경고창 </span>
          <span v-else> 알림창 </span>
        </v-card-title>

        <v-card-text class="mt-8 black--text">
          {{ modalMsg }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="black--text" depressed @click="isModalShow = false"
            >확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    modalShow: Boolean,
    modalMsg: String,
    modalType: String,
  },
  computed: {
    isModalShow: {
      get() {
        return this.modalShow;
      },
      set(value) {
        this.$emit('close:modal', value);
      },
    },
    isModalType() {
      return this.modalType;
    },
  },
};
</script>

<style></style>
