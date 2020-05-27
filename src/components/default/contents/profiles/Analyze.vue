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
              v-else-if="handleSelected(data.day) == 1 "
            >{{data.day == toDay.day?'今日':''}}已打卡一次</el-tag>
            <el-tag
              effect="light"
              type="success"
              v-else-if="handleSelected(data.day) == 2 "
            >{{data.day == toDay.day?'今日':''}}打卡正常</el-tag>
            <el-tag v-else-if="handleSelected(data.day) == -1" effect="light" type="info">尚未计入</el-tag>
          </div>
          <el-tag v-else effect="light" type="info">尚未计入</el-tag>
        </div>
      </template>
    </el-calendar>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "analyze",
  data() {
    let attendanceDetailsData = [];
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
    ...mapMutations({
      CHECK_IN: "profile/CHECK_IN"
    }),
    ...mapGetters({
      Get_Attendance: "profile/attendance",
      Get_ToDay: "profile/toDay"
    }),
    ...mapActions({
      INIT_ATTENDANCE: "profile/INIT_ATTENDANCE",
      USER_CHECK_IN: "profile/USER_CHECK_IN"
    }),
    initToDay() {
      let dates = this.attendanceDetailsData;
      this.INIT_ATTENDANCE(this.USERDETAIL.id)
        .then(res => {
          if (dates.length < 1) {
            this.attendanceDetailsData = Array.from(this.GET_ATTENDANCE);
            // if (Object.entries(this.TODAY).length > 1) {
            Object.assign(this.toDay, this.TODAY);
            // }
            // console.log(this.toDay);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelected(day) {
      let flag = 0;
      this.attendanceDetailsData.forEach(item => {
        if (dayjs().isAfter(day, "date")) {
          if (dayjs(day).isSame(item.day, "date")) {
            flag = item.time;
            return;
          }
        } else if (dayjs().isBefore(day, "date")) {
          flag = -1;
          return;
        } else if (dayjs().isSame(day, "date")) {
          flag = this.toDay.time;
          return;
        }
      });
      return flag;
    },
    pickDate(date, data) {
      if (data.day == dayjs(this.toDay.day).format("YYYY-MM-DD")) {
        if (this.toDay.time == 2) {
          this.$message.error({
            message: "打卡次数已达两次，请勿重复打卡！",
            offset: 230,
            duration: 2000
          });
        } else {
          this.toDay.time += 1;
          if (this.toDay.time == 2) {
            this.$message.success({
              message: "同步签到信息中！",
              iconClass: "el-icon-loading",
              offset: 230,
              duration: 2000
            });
            this.toDay.userId = this.USERDETAIL.id;
            this.syncAttendance();
          }
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
    },
    syncAttendance() {
      if (this.toDay.time == 2) {
        this.USER_CHECK_IN(this.toDay)
          .then(res => {
            this.$message.success({
              dangerouslyUseHTMLString: true,
              message: `同步${res}！`,
              offset: 200,
              duration: 3000
            });
            // Object.assign(this.toDay, this.TODAY);
          })
          .catch(err => {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: `同步签到信息异常：${err}`,
              offset: 200,
              duration: 3000
            });
          });
      }
    }
  },
  computed: {
    ...mapState({
      USERDETAIL: state => state.main.userDetail,
      GET_ATTENDANCE: state => state.profile.attendance,
      TODAY: state => state.profile.toDay,
      attendance: state => state.profile.attendance
    })
  },
  watch: {
    attendance: function(params) {
      console.log(params);
      this.attendanceDetailsData = Array.from(params);
    },
    TODAY: function(params) {
      console.log(params);
      // if (Object.entries(params).length < 1) {
      //   this.toDay = {
      //     time: 0,
      //     day: dayjs().format("YYYY-MM-DD"),
      //     first: Date,
      //     second: Date,
      //     userId: ""
      //   };
      // }
      this.toDay = params;
    }
  },
  beforeMount() {
    this.initToDay();
  }
};
</script>

<style scoped src="@/assets/css/analyze.css"></style>
