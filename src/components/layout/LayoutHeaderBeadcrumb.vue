<template>
    <div class="layout-header-beadcrumb">
        <el-breadcrumb class="space-left" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item :key="item" v-for="item in breadcrumbs">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
// 监听路由地址变化
const route = useRoute()
const breadcrumbs = computed(() => route.path.split('/').filter(Boolean))
</script>

<style scoped>
.layout-header-beadcrumb {
    padding: 0px;
}
</style>