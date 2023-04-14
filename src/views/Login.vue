<template>
  <div class="login-container">
    <form class="login-form">
      <h1 class="login-title">登录</h1>
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" name="username" v-model="loginForm.username">
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" name="password" v-model="loginForm.password">
      </div>
      <div class="form-group">
        <router-link to="/Register" class="register-button">注册</router-link>
        <button type="submit" class="login-button" @click.prevent="login">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import {ElMessage} from "element-plus";
import router from "@/router";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
    };
  },
  methods: {
    login() {
      // 登录逻辑
      axios.post('http://localhost:8085/user/login', this.loginForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        const user = response.data
        // 存储用户信息到 sessionStorage
        window.sessionStorage.setItem('user', JSON.stringify(user))
        // 提交 mutation 更新 state 中的 currentUser
        store.commit('initCurrentUser', user)
        router.push('/')
        ElMessage('登录成功！')
        // console.log('以下是user的uid')
        // console.log(store.state.currentUser.uid)
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /*background-color: #fff;*/
}

.login-form {
  width: 400px;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
}

.login-title {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  display: block;
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
}

.login-button {
  display: block;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  padding: 0;
  border: none;
  border-radius: 4px;
  background-color: #007aff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>