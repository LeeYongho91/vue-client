<template>
  <div>
    <alert-modal
      :modal-show="modalShow"
      :modal-msg="modalMsg"
      :modal-type="modalType"
      :modal-url="modalUrl"
      @modal-close="alertModalClose"
    />
  </div>
</template>

<script>
import AlertModal from '@/components/modal/Alert.vue';
import Bus from '@/utils/Bus';
export default {
  data() {
    return {
      modalShow: false,
      modalMsg: '',
      modalType: '',
      modalUrl: '',
    };
  },
  components: {
    AlertModal,
  },
  methods: {
    errorModalShow(msg) {
      this.modalShow = true;
      this.modalMsg = msg;
      this.modalType = 'error';
    },
    normalModalShow(msg) {
      this.modalShow = true;
      this.modalMsg = msg;
      this.modalType = 'primary';
    },
    redirectAlert(msg, url) {
      this.modalShow = true;
      this.modalMsg = msg;
      this.modalType = 'primary';
      this.modalUrl = url;
    },
    alertModalClose(value) {
      this.modalShow = value;
      this.modalMsg = '';
      this.modalType = '';
    },
  },
  created() {
    Bus.$on('errorAlert', this.errorModalShow);
    Bus.$on('normalAlert', this.normalModalShow);
    Bus.$on('redirectAlert', this.redirectAlert);
  },
};
</script>

<style></style>
