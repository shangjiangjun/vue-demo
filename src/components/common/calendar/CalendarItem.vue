<template>
	<div class="uni-calendar-item__weeks-box" :class="{
		'uni-calendar-item--disable':weeks.disable,
		'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
		'uni-calendar-item--checked':(calendar.fullDate === weeks.fullDate && !weeks.isDay) ,
		'uni-calendar-item--before-checked':weeks.beforeMultiple,
		'uni-calendar-item--multiple': weeks.multiple,
		'uni-calendar-item--after-checked':weeks.afterMultiple,
		}" @click="choiceDate(weeks)">
		<div class="uni-calendar-item__weeks-box-item">
			<span v-if="selected&&weeks.extraInfo" class="uni-calendar-item__weeks-box-circle"></span>
			<!-- <span v-if="weeks.extraInfo&&weeks.extraInfo.info" class="surplus">
				{{ weeks.extraInfo.surplus >= 1 ? weeks.extraInfo.surplus > 10 ? '充足' : '余' + weeks.extraInfo.surplus : '无票' }}
			</span>  &&weeks.extraInfo.surplus -->
			<span v-if="weeks.extraInfo&&weeks.extraInfo.info" class="uni-calendar-item__weeks-box-text" :class="{
				'uni-calendar-item--isDay-text': weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}" :style="weeks.isDay ? 'color: #FF0000;' :'color: #333;'">{{weeks.date}}</span>
			<span v-else class="uni-calendar-item__weeks-box-text" :class="{
				'uni-calendar-item--isDay-text': weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.date}}</span>
			<span v-if="!lunar&&!weeks.extraInfo && weeks.isDay" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				}">今天</span>
			<span v-if="lunar&&!weeks.extraInfo" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.isDay?'今天': (weeks.lunar.IDayCn === '初一'?weeks.lunar.IMonthCn:weeks.lunar.IDayCn)}}</span>
			<span v-if="weeks.extraInfo&&weeks.extraInfo.info&&weeks.extraInfo.surplus" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--extra':weeks.extraInfo.info,
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">￥ {{weeks.extraInfo.info}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			weeks: {
				type: Object,
				default () {
					return {}
				}
			},
			calendar: {
				type: Object,
				default: () => {
					return {}
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			choiceDate(weeks) {
				// 屏蔽不合适的数据
				// if (!weeks.extraInfo || weeks.extraInfo.surplus < 1) return;
				this.$emit('change', weeks)
			}
		}
	}
</script>

<style scoped>
	.uni-calendar-item__weeks-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.uni-calendar-item__weeks-box-text {
		font-size: 14px;
		color: #333;
	}

	.uni-calendar-item__weeks-lunar-text {
		font-size: 12px;
		color: #333;
	}

	.uni-calendar-item__weeks-box-item {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 55px;
		line-height: 17px;
	}

	.uni-calendar-item__weeks-box-circle {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		background-color: #dd524d;
	}

	.uni-calendar-item--disable {
		background-color: rgba(249, 249, 249, 0.3);
		color: #c0c0c0;
	}

	.uni-calendar-item--isDay-text {
		color: #007aff;
	}

	.uni-calendar-item--isDay {
		background-color: #007aff;
		opacity: 0.8;
		color: #fff;
	}

	.uni-calendar-item--extra {
		color: #dd524d;
		opacity: 0.8;
	}

	.uni-calendar-item--checked {
		background-color: #007aff;
		color: #fff;
		opacity: 0.8;
	}

	.uni-calendar-item--multiple {
		background-color: #007aff;
		color: #fff;
		opacity: 0.8;
	}

	.uni-calendar-item--before-checked {
		background-color: #ff5a5f;
		color: #fff;
	}

	.uni-calendar-item--after-checked {
		background-color: #ff5a5f;
		color: #fff;
	}

	.surplus {
		font-size: 12px;
		color: #ffaa7f;
		height: 16px;
		line-height: 16px;
	}
</style>
