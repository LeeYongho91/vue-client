<template>
  <div class="mt-10">
    <v-simple-table>
      <thead>
        <tr>
          <th>번호</th>
          <th>답변여부</th>
          <th>내용</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(list, index) in qaList">
          <tr :key="index" @click="toggle(index)" class="qa_row">
            <td>{{ list.seq }}</td>
            <td>{{ answerFlagSetting(list.answer_flag) }}</td>
            <td>
              {{ list.title
              }}<span class="material-icons key_icon" v-if="!list.public_flag">
                vpn_key
              </span>
            </td>
            <td>
              {{ list.nickname }}
            </td>
            <td>{{ list.createdAt | formatDate }}</td>
          </tr>
          <tr :key="index + 'a'" v-if="opened.includes(index)">
            <td colspan="5">{{ list.content }}</td>
          </tr>
          <tr
            :key="index + 'b'"
            v-if="opened.includes(index) && list.answer_flag"
            class="answer_row"
          >
            <td>담당자</td>
            <td colspan="3">{{ answerContentSetting(list.seq) }}</td>
            <td>{{ answerTimeSetting(list.seq) | formatDate }}</td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>
    페이징 처리~~
    <div align="right">
      <v-btn @click="write" class="primary mb-2">작성하기</v-btn>
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
  props: {
    qaList: {
      type: Array,
      required: true,
    },
    qaAnswerList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      opened: [],
    };
  },
  methods: {
    write() {
      this.dialog = true;
    },
    closeDialog(value) {
      this.dialog = value;
    },
    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    answerFlagSetting(flag) {
      if (flag) {
        return '답변완료';
      } else {
        return '답변예정';
      }
    },
    answerContentSetting(seq) {
      const qaAnswer = this.qaAnswerFind(seq);
      return qaAnswer.content;
    },
    answerTimeSetting(seq) {
      const qaAnswer = this.qaAnswerFind(seq);
      return qaAnswer.createdAt;
    },

    qaAnswerFind(seq) {
      return this.qaAnswerList.find(e => e.qa_id == seq);
    },
  },
};
</script>

<style scpoed>
.key_icon {
  color: gold;
  position: relative;
  top: 5px;
  left: 15px;
}

.qa_row {
  cursor: pointer;
}

.answer_row {
  background-color: whitesmoke;
}
</style>
