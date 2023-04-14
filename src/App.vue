<template>
  <div id="bg">

  </div>
  <div style="position: fixed;width: 100%;height: 100%">
    <div class="navbar">
      <router-link to="/" style="font-size: 32px;float: left;text-transform: none;">ColonoScope</router-link>
      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <router-link to="/">首页</router-link>
        <router-link to="/History">图片处理历史</router-link>
        <router-link to="/About">网站相关</router-link>
        <router-link to="/Register">注册</router-link>
        <div class="user-profile">
          <router-link to="/User_space">个人中心</router-link>
          <el-button v-if="store.state.currentUser!=null" @click="store.state.currentUser=null;this.$router.push('/Login')">退出登录</el-button>
        </div>

      </div>


    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>

</template>


<script>

import store from "@/store";
import router from "@/router";

export default {
  name: 'App',
  computed: {
    store() {
      return store
    }
  },
  mounted() {
    this.background()
  },
  methods: {
    router() {
      return router
    },
    background(){
      // 此函数用于生成动态背景
      const bg = document.querySelector("#bg");
      const width = bg.offsetWidth;
      const height = bg.offsetHeight;
      const gridSize = 50;
      const gridWidth = Math.ceil(width / gridSize);
      const gridHeight = Math.ceil(height / gridSize);
      const colors = ["#fff", "#eee", "#ddd", "#ccc", "#bbb"];

      for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const div = document.createElement("div");
          div.style.position = "absolute";
          div.style.width = gridSize + "px";
          div.style.height = gridSize + "px";
          div.style.backgroundColor = color;
          div.style.left = i * gridSize + "px";
          div.style.top = j * gridSize + "px";
          div.style.zIndex = "-1";
          bg.appendChild(div);
        }
      }

      function updateBackground() {
        const time = Date.now() / 1000;
        const sinValues = [];
        for (let i = 0; i < gridWidth * gridHeight; i++) {
          sinValues[i] = Math.sin(i * 0.5 + time * 3);
        }
        const divs = bg.querySelectorAll("div");
        for (let i = 0; i < divs.length; i++) {
          const div = divs[i];
          const sinValue = sinValues[i];
          const color = `rgba(220, 220, 220, ${0.2 + sinValue * 0.1})`;
          div.style.backgroundColor = color;
        }
        requestAnimationFrame(updateBackground);
      }

      updateBackground();
    }
  },
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2; /* 保证顶栏在背景上层 */
  text-decoration: none;

}
.user-profile {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.navbar a {
  color: #333;
  font-size: 20px;
  margin: 0 10px;
  text-decoration: none;
  text-transform: uppercase;
}

router-link {
  text-decoration: none;
}
a {
  text-decoration: none;
}

#content{
  /*position: fixed;*/
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
