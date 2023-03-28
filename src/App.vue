<template>
  <div id="bg">

  </div>
  <div style="position: fixed;width: 100%;height: 100%">
    <div class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>

</template>


<script>

export default {
  name: 'App',
  mounted() {
    this.background()
  },
  methods: {
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
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1; /* 保证顶栏在背景上层 */
  text-decoration: none;
}

.navbar a {
  color: #333;
  font-size: 32px;
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
