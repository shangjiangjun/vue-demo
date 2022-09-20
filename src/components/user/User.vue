<template>
  <div class="user">
    <div class="user-header">
      <div class="header-img">
        <img v-if="userInfo.avatar" :src="resourceUrl + userInfo.avatar" >
        <img v-else src="../../assets/logo.png" >
      </div>
      <div class="nickname">
        <div class="flex-box">
          <div class="name">
            <icons name="member" :size="20"></icons>
            {{ userInfo.name }}
          </div>
          <div class="mobile">
            <icons name="mobile" :size="20"></icons>
            {{ userInfo.mobile }}
          </div>
        </div>
        <div class="user-set">
          <icons name="towardsright" :size="30"></icons>
        </div>
      </div>
    </div>
    <!-- 签到 -->
    <div class="sign-in">
      <span v-on:click="showDate"> {{ nowData.date }} 打开日历</span>
      <calendar ref="calendar" class="uni-calendar--hook" :clear-date="true"
        :date="nowData.date" :insert="nowData.insert"
        :startDate="nowData.startDate" :endDate="nowData.endDate" :selected="nowData.selected"
        v-on:confirm="confirm" v-on:close="close"
        /> <!-- :range="info.range" :lunar="info.lunar" @confirm="confirm" @close="close"  -->
    </div>
    <!-- 经验增长 -->
    <div class="expire">
      <div>
        <span class="rank">计时 - 【{{ expireInfo.currentRealm }}】 ：{{ expireInfo.experience }}</span>
        <span v-if="realmUp" v-on:click="handlerUpRealm">+</span>
      </div>
      <div>
        <steps-progress :title="progressText" :ratioExp="ratioExp"></steps-progress>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Icons from '@/components/common/icons/Icons.vue'
  import Calendar from '@/components/common/calendar/Calendar.vue'
  import StepsProgress from '@/components/common/progress/StepsProgress.vue'

  import {
    getUser
  } from '@/httpConfig/user.js'

  export default {
    name: 'User',
    components: {
      Icons,
      Calendar,
      StepsProgress
    },
    data() {
      return {
        resourceUrl: this.$resourceUrl,
        userInfo: {},

        showCalendar: false,		// 日历
        calendarStatus: false,
				nowData: {
					lunar: true,
					range: true,
					insert: false,
          date: '',
          startDate: '',
          endDate: '',
					selected: []
				},

        handlerExpire: 0,
        expireInfo: { // 经验增长数据：原始数据，增长量
          growth: 1 ,   // 原始增长值
          experience: 0,
          currentRealm: 1
        },
        experience: 0,
        // 境界划分
        realm: [{
          level: 1,
          growth: 1,
          name: '①',
          value: 100,
          holdMax: 1000, // 储蓄经验最大值
        }, {
          level: 2,
          growth: 2,
          name: '②',
          value: 500,
          holdMax: 5000,
        }, {
          level: 3,
          growth: 3,
          name: '③',
          value: 2000,
          holdMax: 20000,
        }, {
          level: 4,
          growth: 4,
          name: '④',
          value: 5000,
          holdMax: 50000,
        }],
        realmUp: false,  // 升级
        progressText: '',
        ratioExp: 0, // 百分比
      }
    },
    computed: {
      ...mapGetters(['getUser', 'getExpire'])
    },
    created() {
      this.displayData()
      this.getUserInfo()
    },
    beforeDestroy() {
      clearInterval(this.handlerExpire)
    },
    mounted() {
      // 用来停止更新
      this.handlerExpire = setInterval(() => {
        this.expireGrow()
        this.handlerExp()
      }, 1000)
    },
    methods: {
      expireGrow () {
        let holdMax = 0;
        for (let i = 0; i < this.realm.length; i++) {
          if (this.realm[i].level == this.expireInfo.currentRealm) {
            holdMax = this.realm[i].holdMax
            break;
          }
        }
        this.expireInfo.experience += this.expireInfo.growth
        if (this.expireInfo.experience >= holdMax) {
          this.expireInfo.experience = holdMax
        }
        this.$store.commit('updateExpire', this.expireInfo)
      },
      handlerExp () {
        let needExp = 0
        let nowNeedExp = 0
        // 计算比例
        for (let i = 0; i < this.realm.length; i++) {
          if (this.realm[i].level < this.expireInfo.currentRealm) {
            needExp += this.realm[i].value
          } else if (this.realm[i].level == this.expireInfo.currentRealm) {
            nowNeedExp = this.realm[i].value
            break;
          }
        }
        // 判断是否可以升级
        let remainExp = this.expireInfo.experience - needExp
        if (remainExp >= nowNeedExp) {
          this.realmUp = true
        } else {
          this.realmUp = false
        }
        this.ratioExp = parseFloat(remainExp * 100 / nowNeedExp, 2).toFixed(2)
        this.progressText = remainExp + '/' + nowNeedExp + '(' + this.ratioExp + '%)'
      },
      handlerUpRealm() {
        this.realmUp = false
        let needExp = 0
        let growth = 0
        for (let i = 0; i < this.realm.length; i++) {
          if (this.realm[i].level < this.expireInfo.currentRealm) {
            needExp += this.realm[i].value
          } else if (this.realm[i].level == this.expireInfo.currentRealm) {
            needExp += this.realm[i].value
            if (this.expireInfo.experience >= needExp) {
              this.realmUp = true
              growth = this.realm[i+1].growth
              break;
            }
          }
        }
        if (!this.realmUp) return
        this.realmUp = false
        this.expireInfo.currentRealm += 1
        this.expireInfo.growth = growth
        this.expireGrow()
        this.handlerExp()
      },
      displayData () {
        var date = new Date()
        var month = parseInt(date.getMonth()+1);
        var day = date.getDate();
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        this.nowData.date = date.getFullYear() + '-' + month + '-' + day
      },
      getUserInfo () {
        // 从getters提取信息
        let users = this.getUser
        if (users.length != '') {
          this.userInfo = JSON.parse(users)
        } else {
          this.logout()
        }
        // 同步经验数据
        let expireInfo = JSON.parse(this.getExpire)
        this.expireInfo = expireInfo
        this.expireGrow()
        this.handlerExp()
      },
      /* 日历使用 */
			showDate(index) {
				this.calendarStatus = true;
				this.$refs.calendar.open()
			},
      close() {
        localStorage.removeItem('experience')
        this.expireInfo.growth = 1
        this.expireInfo.experience = 0
        this.expireInfo.currentRealm = 1
      	// console.log('弹窗关闭');
      },
      confirm(e) {
      	// console.log('confirm 返回:', e)
        this.nowData.date = e.fulldate
      },
      /* 日历使用 END */
      logout () {
        this.$store.commit('logout')
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-header {
    width: 100%; height: 106px;
    display: flex; justify-content: space-between;
    padding: 20px; box-sizing: border-box;

    &> .header-img {
      width: 66px;height:66px; border-radius: 50%; overflow: hidden;
      background: var(--BlockColor); border: 1px solid var(--TextColor3);

      img {width: 100%;}
    }

    &> .nickname {
      width: 70%;height: 66px; display: flex; align-items:center; justify-content: space-between;

      .name, .mobile {
        width: 100%;line-height: var(--text28);color: var(--TextColor2);font-size: var(--text20);
      }
      .mobile {
        font-size: var(--text14);
      }
    }
  }

  .sign-in { text-align: center;padding: 10px;}

  .expire {padding: 10px;}
</style>
