<template>
  <div>
    <form action="/target" class="dropzone" id="my-form"></form>
    <button type="button" id="submit-all">Upload</button>
    <button type="button" @click="getProcessResult">展示结果</button>
<!--    <div>-->
<!--      <img :src="processResult.maskImage" alt="Image 1">-->
<!--      <img :src="processResult.bboxesImage" alt="Image 2">-->
<!--    </div>-->
  </div>
  <div>
    <el-card :body-style="{ padding: '0px' }" class="card">
      <img :src="processResult.maskImage" class="image">
      <div style="padding: 14px;">
        <span>二进制掩模图像</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '0px' }" class="card">
      <img :src="processResult.bboxesImage" class="image">
      <div style="padding: 14px;">
        <span>矩形边界框图像</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import Dropzone from "dropzone";
import 'dropzone/dist/dropzone.css'
import store from '@/store'
export default {
  el: 'Home',
  data(){
    return{
      imageName:'',
      processResult: {
        maskImage:'/images/maskImage/加载中.jpg',
        bboxesImage:'/images/bboxesImage/加载中.jpg'
      },
      currentDate: new Date(),
    }
  },
  mounted() {
    Dropzone.autoDiscover = false;
    const self = this
    let myDropzone = new Dropzone("#my-form",{
      url: 'http://localhost:8085/upload/image',
      addRemoveLinks: true,
      paramName: 'file', // 文件参数名称
      maxFiles: 1, // 最大文件数量
      maxFilesize: 2, // 最大文件大小，单位 MB
      acceptedFiles: 'image/*', // 允许上传的文件类型
      dictDefaultMessage: '将文件拖拽至此或点击上传', // 默认提示消息
      dictMaxFilesExceeded: '只能上传一个文件', // 文件数量超出限制提示消息
      dictFileTooBig: '文件大小不能超过2MB', // 文件大小超出限制提示消息
      dictInvalidFileType: '只能上传图片', // 文件类型不符合要求提示消息
      autoProcessQueue: false, // 禁用自动上传
      timeout: 30000, // 30秒超时
      resizeWidth: 256, // 重塑图片宽度
      resizeHeight: 256, // 重塑图片高度
      success: function(file, response) {
        self.imageName = response.fileName;
        console.log('这个是存储时的文件名：'+self.imageName); // 在控制台输出后端返回的数据
      }
    });

    document.querySelector("#submit-all").addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      myDropzone.processQueue();
    });

    myDropzone.on("addedfile", file => {
      console.log(`File added: ${file.name}`);
    });

  },

  methods:{
    getProcessResult(){
      const formData = new FormData();
      console.log('imageName：'+this.imageName)
      formData.append("fileName", this.imageName);
      formData.append("uid", store.state.currentUser.uid)
      console.log('这是formData')
      console.log(formData)
      axios.post('http://localhost:8085/upload/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.processResult.maskImage = response.data.maskImage;
        this.processResult.bboxesImage = response.data.bboxesImage;
        console.log(this.processResult);
      }).catch(error => {
        console.error(error);
      });

    }
  }
}

</script>
<style>
.dropzone {
  border: 4px dashed #ddd;
  border-radius: 5px;
  min-height: 100px;
  width: 60%;
  padding: 20px;
  text-align: center;
  margin: auto;
}
.dz-preview .dz-remove{
  font-size:14px;
  text-align:center;
  display:none;
  cursor:pointer;
  border:none
}
.image_show{
  width: 100%;
  float: contour;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}
.card{
  width: 25%;
  display: inline-block;
  margin: 0 10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
