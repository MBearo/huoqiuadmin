<template>
  <div>
    <h3>新建文章</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="新闻标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="单价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="form.classify"></el-input>
      </el-form-item>
      <el-form-item label="运费">
        <el-input v-model="form.freight"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="form.inventory"></el-input>
      </el-form-item>
      <el-form-item label="商品名">
        <el-input v-model="form.goods"></el-input>
      </el-form-item>
      <el-form-item label="背景图">
        <el-upload class="flex-0" style="margin:10px 0;" action="none" :show-file-list="false" :before-upload="beforeUpload" list-type="picture">
          <el-button type="primary" :loading="uploadLoad">{{uploadText}}</el-button>
        </el-upload>
        <img :src="imgUrl" alt="">
      </el-form-item>
    </el-form>
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption">
    </quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
          ]
        }
      },
      imgUrl:''
    };
  },
  computed: {},
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
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
      return false;
    }
  }
};
</script>

<style>

</style>
