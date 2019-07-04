<template>
  <div>
    <div class="l-put">
      <div class="label">用户名:</div>
      <input type="text" placeholder="请输入用户姓名" @click="openPicker" />
    </div>
    <div>{{this.pickerValue}}</div>
    <mt-datetime-picker ref="picker" type="date" v-model="pickerValue"></mt-datetime-picker>
    <div @click="gainT">按钮</div>
    <div>{{this.time}}</div>
  </div>
</template>
<script>
import util from "../util/util";
export default {
  data() {
    return {
      pickerValue: "",
      time: ""
    };
  },
  watch: {
    pickerValue(val) {
      this.time = util.itcTiem(this.pickerValue);
    }
  },
  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
    gainT() {
      console.log(111);
      this.time = util.itcTiem(this.pickerValue);
    }
  },
  components: {}
};
</script>
<style lang="less" >
.l-put {
  height: 96px;
  font-size: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  //  border: 1px solid red;
  .label {
    width: 180px;
    padding-left: 10px;
    color: #000;
  }
  input {
    width: 100%;
    text-align: center;
    background: none;
    outline: none;
    border: 0px;
    caret-color: blue;
    padding: 20px 0px;
  }
}
</style>
