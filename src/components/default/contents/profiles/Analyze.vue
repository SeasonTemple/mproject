<template>
  <section class="msgContainer">
    <el-calendar :first-day-of-week="firstDayOfMonth" :range="thisMonth">
      <template slot="dateCell" slot-scope="{date, data}">
        <div
          :class="data.isSelected ? 'is-selected' : ''"
          class="area"
          @click="pickDate(date, data)"
        >
          <div>{{ data.day.split('-').slice(1).join('-') }}</div>
          <!-- <el-tag type="success" v-if="data.day == toDay.day ">今天</el-tag> -->
          <!-- <div v-if="data.isSelected ? pickDate(date, data) : ''"></div> -->
          <div v-if="data.day.split('-').slice(1)[0] == value">
            <el-tag
              effect="light"
              type="primary"
              v-if="handleSelected(data.day) == 0 "
            >{{data.day == toDay.day?'今日':''}}未打卡</el-tag>
            <el-tag
              effect="plain"
              type="warning"
              v-if="handleSelected(data.day) == 1 "
            >{{data.day == toDay.day?'今日':''}}已打卡一次</el-tag>
            <el-tag
              effect="light"
              type="success"
              v-if="handleSelected(data.day) == 2 "
            >{{data.day == toDay.day?'今日':''}}打卡正常</el-tag>
            <el-tag v-if="handleSelected(data.day) == -1" effect="light" type="info">尚未计入</el-tag>
          </div>
          <el-tag v-else effect="light" type="info">待计入</el-tag>
        </div>
      </template>
    </el-calendar>
  </section>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "analyze",
  data() {
    let attendanceDetailsData = [
      // { number: 2, time: "2020-05-01" },
      // { number: 0, time: "2020-05-02" },
      // { number: 1, time: "2020-05-03" },
      // { number: 1, time: "2020-05-04" },
      // { number: 1, time: "2020-05-05" }
    ];
    let value = dayjs().month() + 1;
    const firstDayOfMonth = dayjs()
      .startOf("month")
      .day();
    let count = 0;
    let toDay = {
      time: 0,
      day: dayjs().format("YYYY-MM-DD"),
      first: Date,
      second: Date,
      userId: ""
    };
    const thisMonth = [
      dayjs()
        .startOf("month")
        .format("YYYY-MM-DD"),
      dayjs()
        .endOf("month")
        .endOf("week")
        .day(
          dayjs()
            .startOf("month")
            .day() - 1
        )
        .format("YYYY-MM-DD")
    ];
    return {
      thisMonth,
      firstDayOfMonth,
      toDay,
      attendanceDetailsData,
      value,
      count
    };
  },
  methods: {
    initToDay() {
      let dates = this.attendanceDetailsData;
      console.log(this.GET_ATTENDANCE)
      if (dates.length < 1) {
        Object.assign(this.attendanceDetailsData, this.GET_ATTENDANCE);
      }
      Object.assign(this.toDay, this.GET_ATTENDANCE.find(a=> dayjs().isSame(a.day, "date")))
      console.log(this.toDay)
    },
    handleSelected(day) {
      let flag = 0;
      this.attendanceDetailsData.forEach(item => {
        // console.log(day, item.time == day);
        if (day < dayjs().format("YYYY-MM-DD")) {
          if (item.time == day) {
            flag = item.number;
            return;
          }
        } else if (day == dayjs(this.toDay.day).format("YYYY-MM-DD")) {
          flag = this.toDay.time;
        } else {
          flag = -1;
          console.log(day);
          return;
        }
      });
      // console.log(flag);

      return flag;
    },
    pickDate(date, data) {
      // console.log(dayjs(date).format("YYYY-MM-DD"));
      if (data.day == dayjs(this.toDay.day).format("YYYY-MM-DD")) {
        if (this.toDay.time == 2) {
          this.$message.error({
            message: "打卡次数已达两次，请勿再打！",
            offset: 230,
            duration: 2000
          });
          return;
        } else {
          this.toDay.time += 1;
          this.toDay.time == 1
            ? (this.toDay.first = dayjs().format("YYYY-MM-DD HH:MM:ss"))
            : (this.toDay.second = dayjs().format("YYYY-MM-DD HH:MM:ss"));
          this.$message.success({
            dangerouslyUseHTMLString: true,
            message: `<b>${this.toDay.day}：第 <span style='color:red'>${this.toDay.time}</span> 次打卡成功！</b>`,
            offset: 230,
            duration: 2000
          });
        }
      } else {
        this.$message.info({
          dangerouslyUseHTMLString: true,
          message: `请在今天： <b style="color:#67C23A">${dayjs().format(
            "YYYY年MM月DD日"
          )}</b> 处进行打卡!`,
          offset: 230,
          duration: 3000
        });
      }
      // console.log(this.toDay);
    }
  },
  computed: {
    ...mapState({
      USERDETAIL: state => state.main.userDetail,
      GET_ATTENDANCE: state => state.profile.attendance
    })
  },
  mounted() {
    this.initToDay();
    // console.log(
    //   dayjs()
    //     .endOf("month")
    //     .endOf("week")
    //     .day(
    //       dayjs()
    //         .startOf("month")
    //         .day() - 2
    //     )
    //     .format("YYYY-MM-DD")
    //     .toString()
    // );
    // console.log(
    //   dayjs()
    //     .endOf("month")
    //     .endOf("week")
    //     .format("YYYY-MM-DD")
    // );
    // console.log(
    //   dayjs()
    //     .startOf("month")
    //     .startOf("week")
    //     .day()+1
    // );
    // this.$message.success({
    //   message: "打卡成功！",
    //   offset: 130
    // });
  }
};
</script>

<style scoped src="@/assets/css/analyze.css"></style>
