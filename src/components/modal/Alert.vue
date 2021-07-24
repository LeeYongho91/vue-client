<template>
  <div class="text-center">
    <v-dialog v-model="isModalShow" width="300">
      <v-card>
        <v-card-title class="text-h5 primary white--text" dark>
          경고창
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
  data() {
    return {
      modalShowData: this.modalShow,
    };
  },
  props: {
    modalShow: Boolean,
    modalMsg: String,
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
  },
};
</script>

<style></style>
