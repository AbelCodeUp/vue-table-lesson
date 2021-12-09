<template>
  <div id="app">
    <v-table-lesson
      :lessonData="timeData"
      :pageWeekOne="pageWeekOne"
    ></v-table-lesson>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      pageWeekOne: '2021/11/15',
      timeData: null,
    };
  },
  mounted(){
    setTimeout(e=>{
      this.timeData = {
        20211115: null,
        20211116: null,
        20211117: [
          {
            id: 2493,
            shopId: 1,
            gradeId: 32,
            stuId: 1353,
            levelId: 40,
            level1: "签到啦啦",
            level2: "",
            typeId: 7,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-3.png",
            typeColor: "#4682D5",
            typeBgColor: "#ebf9ff",
            date: "20211117",
            startAt: "17:00",
            endAt: "17:10",
            description: "",
            pushType: 0,
          },
          {
            id: 2494,
            shopId: 0,
            gradeId: 32,
            stuId: 1353,
            levelId: 44,
            level1: "其他环节，比图画画",
            level2: "练字、画画、下棋",
            typeId: 12,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-1.png",
            typeColor: "#81DC50",
            typeBgColor: "#effdf0",
            date: "20211117",
            startAt: "17:30",
            endAt: "18:00",
            description: "",
            pushType: 0,
          },
          {
            id: 2495,
            shopId: 0,
            gradeId: 32,
            stuId: 1353,
            levelId: 43,
            level1: "能量加油站",
            level2: "吃饭",
            typeId: 10,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-7.png",
            typeColor: "#E48661",
            typeBgColor: "#ffebeb",
            date: "20211117",
            startAt: "18:00",
            endAt: "19:00",
            description: "",
            pushType: 0,
          },
          {
            id: 2496,
            shopId: 0,
            gradeId: 32,
            stuId: 1353,
            levelId: 42,
            level1: "体能训练",
            level2: "",
            typeId: 9,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-4.png",
            typeColor: "#E8A765",
            typeBgColor: "#fff4eb",
            date: "20211117",
            startAt: "19:00",
            endAt: "21:00",
            description: "",
            pushType: 0,
          },
          {
            id: 2497,
            shopId: 0,
            gradeId: 0,
            stuId: 1353,
            levelId: 41,
            level1: "签退",
            level2: "",
            typeId: 8,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-3.png",
            typeColor: "#4682D5",
            typeBgColor: "#ebf9ff",
            date: "20211117",
            startAt: "21:00",
            endAt: "21:10",
            description: "",
            pushType: 0,
          },
        ],
        20211118: [
          {
            id: 2512,
            shopId: 1,
            gradeId: 32,
            stuId: 1353,
            levelId: 40,
            level1: "签到啦啦",
            level2: "",
            typeId: 7,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-3.png",
            typeColor: "#4682D5",
            typeBgColor: "#ebf9ff",
            date: "20211118",
            startAt: "17:00",
            endAt: "17:05",
            description: "",
            pushType: 0,
          },
          {
            id: 2515,
            shopId: 1,
            gradeId: 32,
            stuId: 1353,
            levelId: 39,
            level1: "Better Me",
            level2: "",
            typeId: 6,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-offline.png",
            typeColor: "#9A88F9",
            typeBgColor: "#f9f0ff",
            date: "20211118",
            startAt: "17:10",
            endAt: "18:10",
            description: "",
            pushType: 0,
          },
        ],
        20211119: null,
        20211120: [
          {
            id: 2521,
            shopId: 1,
            gradeId: 32,
            stuId: 1353,
            levelId: 3,
            level1: "晨读环节",
            level2: "",
            typeId: 2,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-1.png",
            typeColor: "#DC84EF",
            typeBgColor: "#f9edff",
            date: "20211120",
            startAt: "16:00",
            endAt: "17:00",
            description: "",
            pushType: 0,
          },
          {
            id: 2520,
            shopId: 1,
            gradeId: 32,
            stuId: 1353,
            levelId: 39,
            level1: "Better Me",
            level2: "",
            typeId: 6,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-offline.png",
            typeColor: "#9A88F9",
            typeBgColor: "#f9f0ff",
            date: "20211120",
            startAt: "17:00",
            endAt: "18:00",
            description: "",
            pushType: 0,
          },
          {
            id: 2522,
            shopId: 1,
            gradeId: 32,
            stuId: 1353,
            levelId: 18,
            level1: "整体评价",
            level2: "",
            typeId: 2,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-1.png",
            typeColor: "#DC84EF",
            typeBgColor: "#f9edff",
            date: "20211120",
            startAt: "18:00",
            endAt: "18:30",
            description: "",
            pushType: 0,
          },
          {
            id: 2523,
            shopId: 1,
            gradeId: 32,
            stuId: 1353,
            levelId: 16,
            level1: "体能训练",
            level2: "",
            typeId: 2,
            typeIcon:
              "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-1.png",
            typeColor: "#DC84EF",
            typeBgColor: "#f9edff",
            date: "20211120",
            startAt: "18:30",
            endAt: "19:30",
            description: "",
            pushType: 0,
          },
        ],
        20211121: null,
      };
    },1000)
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
