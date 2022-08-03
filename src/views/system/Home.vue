<template>
    <div class="common-layout">
        <div>
            {{t('default.test_msg', { name: 'Jason' })}} <br/>
            {{$n(4731982.33, 'currency')}} <br/>
            {{$d(new Date())}}
        </div>
        <div>
            <el-button type="primary">{{ $t('default.btn_1') }}</el-button>
        </div>
        <div>
            <el-color-picker v-model="color2" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/hooks/useI18n';
import { ref } from 'vue';
const color2 = ref('')

const {t} = useI18n()

</script>

<style scoped>
.app-home {
    padding: 0px;
}
</style>