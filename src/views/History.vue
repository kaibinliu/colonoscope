<template>
  <div class="history-container">
    <el-scrollbar>
      <el-timeline>

        <el-timeline-item
            :key="image.iid"
            :timestamp="image.uploaddate"
            placement="bottom"
            v-for="image in this.images"
            @click="viewdetail(image)"
        >
          <el-card>
            <h4>
              {{image.imagename}}
            </h4>
          </el-card>
        </el-timeline-item>

      </el-timeline>
    </el-scrollbar>
    <el-dialog
        v-model="dialogVisible"
        title="详情"
        width="80%"
    >
      <el-scrollbar>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <div style="padding: 14px;">
            <span>原图像图像</span>
          </div>
          <el-image :src="imageshowitem.imagepath"></el-image>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <div style="padding: 14px;">
            <span>二进制掩模图像</span>
          </div>
          <el-image :src="imageshowitem.maskpath"></el-image>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <div style="padding: 14px;">
            <span>矩形边界框图像</span>
          </div>
          <el-image :src="imageshowitem.boundingboxpath"></el-image>
        </el-card>
      </el-scrollbar>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: "History",
  data(){
    return{
      images:[],
      dialogVisible: false,
      imageshowitem: {
        imagepath:"",
        maskpath:"",
        boundingboxpath: ""
      }
    }
  },
  created() {
    this.getimagelist()
  },
  methods:{
    getimagelist(){
      const uid = store.state.currentUser.uid;
      const formData = new FormData();
      formData.append("uid", uid);
      axios.post("http://localhost:8085/upload/history", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.images = response.data
        var len = this.images.length
        for(var i=0;i<len;i++){
          this.images[i].uploaddate = new Date(this.images[i].uploaddate).toLocaleString('zh-CN')
        }
        console.log("这是获取的历史处理图片列表")
        console.log(this.images)
      }).catch(error => {
        ElMessage('无记录！')
        console.error(error);
      });
    },
    viewdetail(image){
      this.imageshowitem.imagepath = image.imagepath
      this.imageshowitem.maskpath = image.maskpath
      this.imageshowitem.boundingboxpath = image.boundingboxpath
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
.history-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;

}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>