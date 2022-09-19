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
      <span class="rank">境界：{{ experience != 0 ? experience : getExpire }}</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Icons from '@/components/common/icons/Icons.vue'
  import Calendar from '@/components/common/calendar/Calendar.vue'

  import {
    getUser
  } from '@/httpConfig/user.js'

  export default {
    name: 'User',
    components: {
      Icons,
      Calendar
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
          growth: 10,   // 原始增长值
        },
        experience: 0,
        ranks: {}
      }
    },
    computed: {
      ...mapGetters(['getUser', 'getExpire'])
    },
    created() {
      this.displayData()
      this.getUserInfo()
    },
    mounted() {
      this.handlerExpire = setInterval(() => {
        this.expireGrow()
      }, 1000)
    },
    methods: {
      expireGrow () {
        this.experience += this.expireInfo.growth
        this.$store.commit('updateExpire', this.experience)
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
        this.experience = this.getExpire
      },
      /* 日历使用 */
			showDate(index) {
				this.calendarStatus = true;
				this.$refs.calendar.open()
			},
      close() {
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
