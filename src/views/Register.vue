<template>
  <div class="register-container">
    <el-card class="register-form">
      <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="rules"
          label-width="90px"
          class="registerForm"
      >
        <h1 class="register-title">欢迎注册</h1>
        <el-form-item label="用户名" prop="username">
          <el-input
              type="text"
              v-model="registerForm.username"
              autocomplete="off"
              placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input
              type="password"
              v-model="registerForm.checkpass"
              autocomplete="off"
              placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input
              type="text"
              v-model="registerForm.telephone"
              autocomplete="off"
              placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wechat">
          <el-input
              type="text"
              v-model="registerForm.wechat"
              autocomplete="off"
              placeholder="请输入微信号"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
              type="text"
              v-model="registerForm.email"
              autocomplete="off"
              placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在省市区">
          <el-select v-model="registerForm.province"
                     placeholder="请选择省"
                     @change="changeProvince">
            <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="registerForm.city"
                     placeholder="请选择市"
                     @change="changeCity">
            <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="registerForm.district"
                     placeholder="请选择区"
                     @change="changeOrigin">
            <el-option
                v-for="item in originOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="具体所在街道" prop="street">
          <el-input
              type="text"
              v-model="registerForm.street"
              autocomplete="off"
              placeholder="请输入所在街道"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('registerForm')">重 置</el-button>
          <el-button
              type="primary"
              v-on:click="register"
              style="width: 120px"
          >注 册</el-button
          >
          <el-button>
            <router-link to="/Login">登录</router-link>
          </el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import jsonData from '@/assets/js/china_address.json'
import axios from "axios";
import store from '@/store'
import { ElMessage } from 'element-plus'
export default {
  name: "Register",
  data() {
    var validateusername = (rule, value, callback) => {
      var reg=/^[a-zA-Z0-9_]+$/
      if (reg.test(value)==false) {
        callback(new Error("用户名只能由字母数字下划线组成"));
      } else {
        callback();
      }
    };
    var validatepassword = (rule, value, callback) => {
      var reg=/^[a-zA-Z0-9_]+$/
      if (reg.test(value)==false) {
        callback(new Error("密码只能由字母数字下划线组成"));
      } else {
        callback();
      }
    };
    var validatechackPass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatetelephone = (rule, value, callback) => {
      var reg=/^1[3-9]\d{9}$/
      if (reg.test(value)==false) {
        callback(new Error("请输入正确电话号码格式"));
      } else {
        callback();
      }
    };
    var validatewechat = (rule, value, callback) => {
      var reg=/^[a-zA-Z\d_-]{6,20}$/
      if (reg.test(value)==false) {
        callback(new Error("请输入正确微信号格式"));
      } else {
        callback();
      }
    };
    var validateemail = (rule, value, callback) => {
      var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (reg.test(value)==false) {
        callback(new Error("请输入正确邮箱格式"));
      } else {
        callback();
      }
    };
    var validatestreet = (rule, value, callback) => {
      var reg=/^[\u4E00-\u9FA5A-Za-z0-9#_-]+$/
      if (reg.test(value)==false) {
        callback(new Error("请输入正确格式的街道门牌号信息"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        checkpass: '',
        telephone: '',
        wechat:'',
        email: '',
        province: '',
        city: '',
        district: '',
        street: '',
      },

      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { validator: validateusername, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatepassword, trigger: "blur" },
        ],
        checkpass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatechackPass, trigger: "blur" },
        ],
        telephone: [
          { validator: validatetelephone, trigger: "blur"}
        ],
        wechat: [
          { validator: validatewechat, trigger: "blur"}
        ],
        email: [
          { validator: validateemail, trigger: "blur"}
        ],
        street: [
          { validator: validatestreet, trigger: "blur"}
        ]

      },
      provinceList: [], // 省列表
      cityList: [], // 市列表
      originList: [], // 区列表
      cityOptions: [], // 市下拉框数据
      originOptions: [],// 区下拉框数据
    };
  },
  mounted() {
    this.getJsonData();
  },
  methods: {
    register() {
      axios.post('http://localhost:8085/user/register', this.registerForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        const user = response.data
        // 存储用户信息到 sessionStorage
        window.sessionStorage.setItem('user', JSON.stringify(user))
        // 提交 mutation 更新 state 中的 currentUser
        store.commit('initCurrentUser', user)
        ElMessage('注册成功！')
      }).catch(error => {
        console.error(error);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 初始化省市区数据
    getJsonData() {
      this.provinceList = [];
      this.cityList = [];
      this.originList = [];
      for(let item of jsonData){
        if(item.value.match(/0000$/)){
          this.provinceList.push({
            value: item.value,
            label: item.name,
            children: []
          })
        }else if (item.value.match(/00$/)) {
          this.cityList.push({
            value: item.value,
            label: item.name,
            children: []
          })
        }else {
          this.originList.push({
            value: item.value,
            label: item.name
          })
        }
      }
      for (let index in this.provinceList) {
        for (let index1 in this.cityList) {
          if (this.provinceList[index].value.slice(0, 2) === this.cityList[index1].value.slice(0, 2)) {
            this.provinceList[index].children.push(this.cityList[index1])
          }
        }
      }
      for(let item1 in this.cityList) {
        for(let item2 in this.originList) {
          if (this.originList[item2].value.slice(0, 4) === this.cityList[item1].value.slice(0, 4)) {
            this.cityList[item1].children.push(this.originList[item2])
          }
        }
      }
    },
    // 选择省
    changeProvince(val) {
      this.provinceList.forEach((province, index) => {
        if (val.toString() === this.provinceList[index].value) {
          this.cityOptions = this.provinceList[index].children
          this.registerForm.city = ''
          this.originOptions = this.provinceList[index].children[0].children
          this.registerForm.city = ''
          this.registerForm.district = ''
          this.registerForm.province = this.provinceList[index].label;
        }
      })
    },
    // 选择市
    changeCity(val) {
      this.cityList.forEach((city, index) => {
        if (val.toString() === this.cityList[index].value) {
          this.originOptions = this.cityList[index].children
          this.registerForm.district = ''
          this.registerForm.city = this.cityList[index].label
        }
      })
    },
    changeOrigin(val) {
      this.originList.forEach((origin, index) => {
        if(val.toString() === this.originList[index].value) {
          this.registerForm.district = val
          this.registerForm.district = this.originList[index].label;
          // console.log(this.newaddress.area)
        }
      })
    },
  },
}
</script>

<style scoped>
.register-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register-form {
  width: 400px;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
}
</style>