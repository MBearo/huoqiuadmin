<template>
  <div class="hello">
    <div class="menu flex-0">
      <div class="title flex-1">
        标题
      </div>
      <div class="flex-0">
        用户名
      </div>
    </div>

    <div class="flex-1 flex">
      <el-menu :default-active="activeIndex" class="flex-0"  @select="handleSelect" :router="true">
        <el-menu-item index="articlelist" >新闻管理</el-menu-item>
        <el-menu-item index="userlist" >用户管理</el-menu-item>
      </el-menu>
      <div class="cont flex-1">
        <div class="panel">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "articlelist"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.menu {
  background-color: rgb(84, 92, 100);
  color: rgb(255, 208, 75);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.title {
  font-size: 24px;
  margin-right: 20px;
  padding: 15px 0;
}
.cont{
  padding: 20px;
  box-sizing: border-box;
}
.panel{
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
}
</style>
