<template>
  <section class="msgContainer">
    <el-calendar>
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
              effect="plain"
              type="primary"
              v-if="handleSelected(data.day) == 0 "
            >{{data.day == toDay.day?'今天':''}}未打卡</el-tag>
            <el-tag
              effect="plain"
              type="warning"
              v-if="handleSelected(data.day) == 1 "
            >{{data.day == toDay.day?'今天':''}}打卡一次</el-tag>
            <el-tag
              effect="light"
              type="success"
              v-if="handleSelected(data.day) == 2 "
            >{{data.day == toDay.day?'今天':''}}打卡正常</el-tag>
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
    let toDay = {
      time: 0,
      day: dayjs().format("YYYY-MM-DD"),
      first: Date,
      second: Date
    };
    return {
      toDay,
      attendanceDetailsData,
      value,
      count
    };
  },
  methods: {
    handleSelected(day) {
      let flag = 0;
      this.attendanceDetailsData.forEach(item => {
        // console.log(day, item.time == day);
        if (day < dayjs().format("YYYY-MM-DD")) {
          if (item.time == day) {
            flag = item.number;
            return;
          }
        } else if (day == this.toDay.day) {
          flag = this.toDay.time;
        } else {
          flag = -1;
          return;
        }
      });
      // console.log(flag);

      return flag;
    },
    pickDate(date, data) {
      console.log(dayjs(date).format("YYYY-MM-DD"));
      if (data.day == this.toDay.day) {
        if (this.toDay.time == 2) {
          this.$message.error({
            message: "您今天的打卡次数已达两次！",
            offset: 230,
            duration: 1000
          });
          return;
        } else {
          this.toDay.time += 1;
          this.toDay.time == 1
            ? (this.toDay.first = dayjs().format("YYYY-MM-DD HH:MM:ss"))
            : (this.toDay.second = dayjs().format("YYYY-MM-DD HH:MM:ss"));
          this.$message.success({
            dangerouslyUseHTMLString: true,
            message: `<b>${this.toDay.day}：第 ${this.toDay.time} 打卡成功！</b>`,
            offset: 230,
            duration: 1000
          });
        }
      }
      console.log(this.toDay)
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
    // this.$message.success({
    //   message: "打卡成功！",
    //   offset: 130
    // });
  }
};
</script>

<style scoped src="@/assets/css/analyze.css"></style>
