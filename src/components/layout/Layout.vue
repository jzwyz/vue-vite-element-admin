<template>
  <div class="layout">
    <el-container>
      <el-aside width="auto">
        <LayoutAsideMenu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <LayoutHeader />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import LayoutAsideMenu from '@/components/layout/LayoutAsideMenu.vue'
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    display: flex;
    align-items: center;
    padding: 0px;
  }
}
</style>