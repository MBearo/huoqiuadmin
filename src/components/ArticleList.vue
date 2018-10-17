<template>
  <div>
    <div class="flex">
      <h3 class="flex-1">文章列表</h3>
      <div class="flex-0">
        <el-button @click="newarticle" type="primary">新建文章</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" v-loading="load">
      <el-table-column prop="id" label="id" width="50">
      </el-table-column>
      <el-table-column label="背景图" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.banner" alt="" style="width:180px;">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题">
      </el-table-column>
      <el-table-column prop="classify" label="分类">
      </el-table-column>
      <el-table-column prop="time" label="创建时间">
      </el-table-column>
      <el-table-column prop="like" label="喜欢数">
      </el-table-column>
      <el-table-column prop="inventory" label="库存">
      </el-table-column>
      <el-table-column prop="goods" label="商品名称">
      </el-table-column>
      <el-table-column prop="freight" label="邮费">
      </el-table-column>
      <el-table-column prop="uid" label="作者">
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
      tableData: [],
      load:true
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios
        .get(this.$url2 + "s_newslist.php")
        .then(result => {
          console.log(result.data);
          this.tableData = result.data.data.list;
          this.load=false
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
      this.$router.push("/NewArticle");
    }
  }
};
</script>

<style>

</style>
