<template>
  <div>
    <form action="/target" class="dropzone" id="my-form"></form>
    <button type="button" id="submit-all">Upload</button>
    <button type="button" @click="getProcessResult">展示结果</button>
    <div>
      <img :src="processResult.maskImage" alt="Image 1">
      <img :src="processResult.bboxesImage" alt="Image 2">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dropzone from "dropzone";
import 'dropzone/dist/dropzone.css'
export default {
  el: 'Home',
  data(){
    return{
      imageName:'',
      processResult: {
        maskImage:'/images/maskImage/等待.gif',
        bboxesImage:'/images/bboxesImage/等待.gif'
      }
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

</style>
