<template>
  <div>
    <div class="flex">
      <h3 class="flex-1">用户列表</h3>
      <div class="flex-0">
        <el-button @click="newarticle" type="primary">新建用户</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="50">
      </el-table-column>
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="width:100px;">
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账户">
      </el-table-column>
      <el-table-column  label="背景">
         <template slot-scope="scope" width="100">
          <img :src="scope.row.banner" alt="" style="width:100px;">
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述">
      </el-table-column>
      <el-table-column prop="identity" label="身份">
      </el-table-column>
      <el-table-column prop="money" label="余额">
      </el-table-column>
      <el-table-column prop="classify" label="分类">
      </el-table-column>
      <el-table-column prop="name" label="昵称">
      </el-table-column>
      <el-table-column prop="password" label="密码">
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
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios
        .get(this.$url2 + "s_userlist.php")
        .then(result => {
          console.log(result.data);
          this.tableData = result.data.data.list;
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
    },
    newarticle() {
      this.$router.push("/newuser");
    }
  }
};
</script>

<style>

</style>
