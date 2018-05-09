<template>
    <div>
        <div class="flex">
            <h3 class="flex-1">新闻列表</h3>
            <div class="flex-0">
                <el-button @click="newarticle">新建文章</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import urls from "../vuex/urls";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    refresh() {
      axios
        .get(this.$url + "Graduation/InsertData", {
          params: {}
        })
        .then(result => {
          console.log(result.data);
          if (result.data.errorcode == 0) {
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
            this.form.title = "";
            this.form.content = "";
            this.imgUrl = "";
            this.categoryActive = "";
          } else {
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "error"
            });
          }
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
    },
    newarticle(){
        this.$router.push('/NewArticle')
    }
  }
};
</script>

<style>

</style>
