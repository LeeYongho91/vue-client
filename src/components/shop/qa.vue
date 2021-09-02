<template>
  <div>
    <v-simple-table>
      <thead>
        <th>id</th>
        <th>title</th>
      </thead>
      <tbody>
        <template v-for="(item, index) in items">
          <tr :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
          </tr>
          <tr :key="index" v-if="false">
            <td colspan="2">{{ lists[index] }}</td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>
    <div align="right">
      <v-btn @click="write">글쓰기</v-btn>
    </div>
    <qaWrite :dialog="dialog" @closeDialog="closeDialog"></qaWrite>
  </div>
</template>

<script>
import qaWrite from '@/components/shop/qaWrite.vue';
export default {
  components: {
    qaWrite,
  },
  props: {},
  data() {
    return {
      items: [
        { id: 1, title: '1' },
        { id: 2, title: '2' },
        { id: 3, title: '3' },
        { id: 4, title: '4' },
      ],
      lists: [
        { id: 1, title: 'a' },
        { id: 2, title: 'b' },
        { id: 3, title: 'c' },
        { id: 4, title: 'd' },
      ],
      dialog: false,
    };
  },
  methods: {
    write() {
      this.dialog = true;
    },
    closeDialog(value) {
      this.dialog = value;
    },
  },
};
</script>

<style></style>
