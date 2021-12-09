<template>
		<div class="container"  v-if="allLessonItem.length" >
			<div class="container-schedule">
				<div class="container-schedule-time-ground">
					<ul>
						<li class="container-schedule-time-ground-item" :style="{ height: (labelHeight * 12 + 1) + 'px'}"
							:key="index" v-for="(item,index) in allPoints">
							<span class="container-schedule-time-ground-item-text">{{item}}</span>
							<p class="container-schedule-time-ground-item-line"
								:style="{top : (labelHeight * 12 + 2) / 2 + 'px'}"></p>
						</li>
					</ul>
				</div>
				<div class="container-schedule-task-ground">
					<div class="container-schedule-task-ground-item" :key="index" v-for="(item,index) in allLessonItem"
						:style="{ width: item.dataWidth + 'px', height: item.dataHeight + 'px' ,top: item.top + 'px' , left: item.left + 'px', color: item.typeColor, background: item.typeBgColor, borderColor: item.typeColor }">
						<p class="container-schedule-task-ground-item-text"
							:class="{'item-over': item.mins > 5 && item.mins <= 10 }">
							{{ item.dataHeight <= labelHeight ? '' : item.name}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="time-default" v-else>
			<img class="default-img"
				src="https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-default.png">
			</img>
			<p>本周还没有课表</p>
		</div>
</template>

<script>
	export default {
		name: "VTableLesson",
		data() {
			return {
				labelMin: 5,
				labelHeight: 26,
				labelWidth: 93,
				allPoints: [],
				allLessonItem: [],
				dataCenterWidth: 8,
			};
		},
		props: ['lessonData', 'pageWeekOne'],
		computed: {
			thisWeekOne() {
				return this.pageWeekOne;
			}
		},
		watch: {
			lessonData(val) {
				this.allLessonItem = [];
				if (val) {
					this.allLessonItem = this.getAllLessonItem(val);
					this.allPoints = this.getAllAreaPrints(this.allLessonItem);
				}
			}
		},
		mounted() {
			// this.allLessonItem = this.getAllLessonItem(this.lessonData);
			// this.allPoints = this.getAllAreaPrints(_.cloneDeep(this.allLessonItem));
		},
		methods: {
			// 获取X轴所有时间点
			getAllAreaPrints(allLessonItem) {
				if (!allLessonItem[0]) return [];
				let maxPoint = allLessonItem[allLessonItem.length - 1].endAt;
				let minPoint = allLessonItem[0].startAt;
				let minHour = minPoint.split(':')[0];
				let maxHour = maxPoint.split(':')[0];
				let diff = maxHour - minHour + 2;
				let newArr = new Array(diff).fill('').map((el, index) => {
					let hour = Number(minHour) + index;
					return (hour < 10 ? '0' + hour : hour) + ':00';
				})
				return newArr;
			},
			// 获取所有课程块
			getAllLessonItem(lessonList) {
				let {
					labelMin,
					labelHeight,
					labelWidth
				} = this;
				let allLesson = [];
				Object.keys(lessonList).forEach(el => {
					if (lessonList[el]) {
						allLesson = [...allLesson, ...lessonList[el]];
					}
				});
				if (!allLesson.length) {
					return [];
				}
				// 筛选出所有想同Levelid的项
				let renderLessonJSON = {};
				for (let i = 0; i < allLesson.length; i++) {
					let item = allLesson[i];
					if (!renderLessonJSON[item.levelId]) {
						renderLessonJSON[item.levelId] = [item];
					} else {
						renderLessonJSON[item.levelId].push(item);
					}
				}
				// 连续的课程生成二维数组
				let targetArr = [];
				Object.keys(renderLessonJSON).forEach(el => {
					let itemArr = renderLessonJSON[el];
					for (let i = 0; i < itemArr.length; i++) {
						let irr = itemArr[i];
						if (i >= 1 && irr.date - itemArr[i - 1].date == 1 && irr.startAt == itemArr[i - 1]
							.startAt && irr.endAt == itemArr[i - 1].endAt) {
							targetArr[targetArr.length - 1].push(irr)
						} else {
							let newArr = [irr];
							targetArr.push(newArr);
						}
					}
				})
				let newRlLesson = [];
				targetArr.forEach(el => {
					let rlItem = {};
					let rlData = el[0];
					let date = this.formatDay(rlData.date);
					rlItem.date = date;
					rlItem.startAt = rlData.startAt;
					rlItem.endAt = rlData.endAt;
					rlItem.dataWidth = el.length * labelWidth;
					rlItem.name = rlData.level1;
					// 计算课程时长
					let dateDiff = (new Date(date + ' ' + rlData.endAt).getTime() - new Date(date + ' ' + rlData
						.startAt).getTime()) / 1000 / 60;
					let oneDateHeight = dateDiff / labelMin;
					let dateHeight = oneDateHeight * labelHeight;

					rlItem.dataHeight = (dateHeight - this.dataCenterWidth) < 1 ? 1 : dateHeight - this
						.dataCenterWidth;
					rlItem.mins = dateDiff;
					rlItem.typeColor = rlData.typeColor;
					rlItem.typeBgColor = rlData.typeBgColor;
					newRlLesson.push(rlItem);
				})
				// 排序
				newRlLesson.sort(this.compare('startAt'));
				// 最小开始时间
				let minTimeStartAt = newRlLesson[0].startAt;
				// 最小时间分钟数
				let minTimeStartAtTimeArr = minTimeStartAt.split(':');
				let minTimeStartAtMins = Number(minTimeStartAtTimeArr[0]) * 60 + Number(minTimeStartAtTimeArr[1]);
				// 取得课程块的开始坐标 top left
				newRlLesson = newRlLesson.map((el, index) => {
					// 当前开始时间总分钟
					let timeArr = el.startAt.split(':');
					let _hour = timeArr[0];
					let _mins = timeArr[1];
					let sumMins = Number(_hour) * 60 + Number(_mins);
					// 计算间隔 top
					let diffMins = (sumMins - minTimeStartAtMins) / labelMin * labelHeight;

					el.top = diffMins + this.dataCenterWidth;
					let diffDays = ((new Date(el.date).getTime() - new Date(this.thisWeekOne).getTime()) / 1000 /
						60 / 60 / 24) * labelWidth;

					el.left = diffDays + 10;
					return el;
				})
				return newRlLesson;
			},
			formatDay(date) {
				return date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2);
			},
			findLessonList(arr) {

			},
			compare(p) { //比较函数
				return function(m, n) {
					var val1 = m[p];
					var val2 = n[p];
					if (val1 < val2) {
						return -1;
					} else if (val1 > val2) {
						return 1;
					} else {
						return 0;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.time-default {
		width: 450px;
		height: 600px;
		padding-top: 110px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0 auto;
		text-align: center;
	
		.default-img {
			width: 411px;
			height: 252px;
			margin-bottom: 50px;
		}
	}
	.container {
		padding: 60px 30px 30px 88px;

		&-schedule {
			position: relative;

			&-task-ground {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;

				&-item {
					position: absolute;
					border-radius: 0 14px 14px 0;
					text-align: center;
					border-left: 4px solid;
					display: flex;
					align-items: center;
					justify-content: center;

				}

				.item-over {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;

				}
			}

			&-time-ground {
				&-item {
					position: relative;
					height: 192px;
					border-top: 1px solid rgba(230, 230, 255, 1);

					&-text {
						position: absolute;
						top: -15px;
						left: -60px;
						font-size: 20px;
						font-weight: 400;
						color: #5A4880;
					}

					&-line {
						width: calc(100% + 30px);
						height: 1px;
						border-top: 2px dotted #E6E6F1;
						position: absolute;
						left: -30px;

						&::before {
							content: '';
							width: 10px;
							height: 10px;
							border-radius: 50%;
							background-color: #E6E6F1;
							position: absolute;
							left: -5px;
							top: -7px;
						}
					}
				}
			}
		}
	}
</style>