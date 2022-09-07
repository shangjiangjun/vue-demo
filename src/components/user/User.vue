<template>
  <div class="user">
    <div class="user-header">
      <div class="header-img">
        <img v-if="userInfo.avatar" :src="resourceUrl + userInfo.avatar" >
        <img v-else src="../../assets/logo.png" >
      </div>
      <div class="nickname">
        <div class="flex-box">
          <div class="name">{{ userInfo.name }}</div>
          <div class="mobile">{{ userInfo.mobile }}</div>
        </div>
        <div class="user-set">
          >
        </div>
      </div>
    </div>
    <!-- 签到 -->
    <div class="sign-in">
      
    </div>
  </div>
</template>

<script>
  import {
    getUser
  } from '@/httpConfig/user.js'

  export default {
    name: 'User',
    data() {
      return {
        resourceUrl: this.$resourceUrl,
        userInfo: {}
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      async getUserInfo () {
        let users = localStorage.getItem('userInfo') || ''
        if (this.userInfo.length) return;
        getUser().then(res => {
          if (res.status) {
            this.userInfo = res.data
          }
        })
      },

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
</style>
