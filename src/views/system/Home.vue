<template>
    <div class="common-layout">
        <div>
            <el-button type="primary">{{ $t('default.btn_1') }}</el-button>
        </div>
        <div>
            <el-color-picker v-model="color2" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const color2 = ref('')
</script>

<style scoped>
.app-home {
    padding: 0px;
}
</style>