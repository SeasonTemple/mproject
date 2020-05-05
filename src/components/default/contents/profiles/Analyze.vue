<template>
  <section class="msgContainer">
    <el-calendar id="calendar">
      <template slot="dateCell" slot-scope="{date, data}">
        <div class="calendar-day">
          {{ data.day.split('-').slice(2).join('-') }}
          <div v-if="data.day.split('-').slice(1)[0] == value" style="margin-top: 15px;">
            <el-tag type="danger" v-if="handleSelected(data.day) == 0 ">缺勤两次</el-tag>
            <el-tag type="warning" v-if="handleSelected(data.day) == 1 ">打卡一次</el-tag>
            <el-tag type="success" v-if="handleSelected(data.day) == 2 ">打卡正常</el-tag>
          </div>
        </div>
      </template>
    </el-calendar>
  </section>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "analyze",
  data() {
    let attendanceDetailsData = [
      { number: 2, time: "2020-05-01" },
      { number: 0, time: "2020-05-02" },
      { number: 1, time: "2020-05-03" },
      { number: 1, time: "2020-05-04" },
      { number: 1, time: "2020-05-05" }
    ];
    let value = dayjs().month() + 1;
    let count = 0;
    return {
      attendanceDetailsData,
      value,
      count
    };
  },
  methods: {
    handleSelected(day) {
      let flag = 0;
      this.attendanceDetailsData.forEach(item => {
        console.log(day, item.time == day);
        if (day <= dayjs().format("YYYY-MM-DD")) {
          if (item.time == day) {
            flag = item.number;
            return;
          }
        } else {
          flag = -1;
          return;
        }
      });
      console.log(flag);

      return flag;
    }
  },
  mounted() {
    // console.log(dayjs().month());
    // console.log(dayjs().format("YYYY-MM-DD"))
    // console.log(
    //   dayjs()
    //     .startOf("month")
    //     .format("YYYY-MM-DD")
    // );
    this.$message.success({
      message: "打卡成功！",
      offset: 130
    });
  }
};
</script>

<style scoped src=""></style>