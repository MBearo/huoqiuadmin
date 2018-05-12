<template>
    <div>
        <h3>新建用户</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload class="flex-0" style="margin:10px 0;" action="none" :show-file-list="false" :before-upload="beforeUpload" list-type="picture">
                    <el-button type="primary" :loading="uploadLoad">{{uploadText}}</el-button>
                </el-upload>
                <img :src="imgUrl" alt="">
            </el-form-item>
            <el-form-item label="身份">
                <el-switch v-model="form.identity" active-text="用户" inactive-text="达人">
                </el-switch>
            </el-form-item>
            <el-form-item label="分类">
                <el-radio-group v-model="form.classify">
                    <el-radio :label="item.id" v-for="(item,index) in fenlei" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="背景图">
                <el-upload class="flex-0" style="margin:10px 0;" action="none" :show-file-list="false" :before-upload="beforeUpload2" list-type="picture">
                    <el-button type="primary" :loading="uploadLoad">{{uploadText2}}</el-button>
                </el-upload>
                <img :src="imgUrl2" alt="">
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="submit">注册</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      uploadLoad: false,
      uploadText: "选择图片",
      imgUrl: "",
      uploadLoad2: false,
      uploadText2: "选择图片",
      imgUrl2: "",
      form: {
        identity: true,
        clssify: 0
      },
      fenlei: []
    };
  },
  created() {
    this.getfenlei();
  },
  methods: {
    beforeUpload(file) {
      //判断图片大小及类型
      console.log(file.type);
      if (file.size / 1024 / 1024 > 2) {
        this.$message({
          showClose: true,
          message: "文件超过2M，请压缩或裁剪后上传",
          type: "error"
        });
        return false;
      }
      if (
        file.type != "image/jpeg" &&
        file.type != "image/jpg" &&
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/webp"
      ) {
        this.$message({
          showClose: true,
          message: "请选择jpg，jpeg，png，gif格式的图片",
          type: "error"
        });
        return false;
      }

      this.uploadText = "上传中";
      this.uploadLoad = true;

      let fd = new FormData();
      fd.append("file", file);
      this.$axios
        .post(this.$url + "Graduation/UploadImage", fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          console.log(result);
          if (result.data.errorcode == 0) {
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
            //let str=result.data.data.list[0].UploadFilename;
            this.imgUrl =
              "" + this.$url + result.data.data.list[0].UploadFilename;
          } else {
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "error"
            });
          }
          this.uploadText = "选择图片";
          this.uploadLoad = false;
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
      return false;
    },
    beforeUpload2(file) {
      //判断图片大小及类型
      console.log(file.type);
      if (file.size / 1024 / 1024 > 2) {
        this.$message({
          showClose: true,
          message: "文件超过2M，请压缩或裁剪后上传",
          type: "error"
        });
        return false;
      }
      if (
        file.type != "image/jpeg" &&
        file.type != "image/jpg" &&
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/webp"
      ) {
        this.$message({
          showClose: true,
          message: "请选择jpg，jpeg，png，gif格式的图片",
          type: "error"
        });
        return false;
      }

      this.uploadText2 = "上传中";
      this.uploadLoad2 = true;

      let fd = new FormData();
      fd.append("file", file);
      this.$axios
        .post(this.$url + "Graduation/UploadImage", fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          console.log(result);
          if (result.data.errorcode == 0) {
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
            //let str=result.data.data.list[0].UploadFilename;
            this.imgUrl2 =
              "" + this.$url + result.data.data.list[0].UploadFilename;
          } else {
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "error"
            });
          }
          this.uploadText2 = "选择图片";
          this.uploadLoad2 = false;
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
      return false;
    },
    getfenlei() {
      this.$axios
        .get(this.$url2 + "s_fenlei.php")
        .then(result => {
          console.log(result.data);
          this.fenlei = result.data.data.list;
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
    },
    submit() {
        let linshi=0
        if(this.form.identity){
            linshi=0
        }else{
            linshi=1
        }
      this.$axios
        .get(this.$url2 + "s_registerBIG.php", {
          params: {
           account: this.form.account,
           name:this.form.name,
           password:this.form.password,
           img:this.imgUrl,
           identity:linshi,
           classify:this.form.clssify,
           desc:this.form.desc,
           banner:this.imgUrl2
          }
        })
        .then(result => {
          console.log(result.data);
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
    }
  }
};
</script>

<style>

</style>
