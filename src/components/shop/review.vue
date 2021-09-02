<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="item.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html="item.title"></v-list-item-title
      ><v-rating
        v-model="rating"
        class=""
        background-color="warning lighten-3"
        color="warning"
        dense
      ></v-rating>
      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style></style>
