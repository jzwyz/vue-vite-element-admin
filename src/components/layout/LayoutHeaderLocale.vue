<template>
    <div :class="{ 'layout-header-locale': true, 'lhl-default': isBtn }">
        <el-dropdown style="height: 100%" @command="handleChangeLang">
            <div class="dropdown-change-lang">
                <el-icon :size="configStore.iconSize">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#vvea-i18n"></use>
                    </svg>
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :disabled="localeUtil.getLocale.value == 'zh-CN'" command="zh-CN">
                        简体中文
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="localeUtil.getLocale.value == 'en'" command="en">
                        English
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import type { LocaleType } from "~/config";
import { useConfigStore } from '@/stores/config'
import { useLocale } from '@/locales/useLocale'

// 声明组件的属性
defineProps({
    isBtn: {
        type: Boolean,
        default: true
    }
})

const configStore = useConfigStore();
const localeUtil = useLocale();
const handleChangeLang = (lange: LocaleType) => {
    localeUtil.changeLocale(lange)
}
</script>

<style scoped>
.layout-header-locale {
    padding: 0px;
    height: 100%;
}

.lhl-default {
    border-radius: 4px;
    height: 30px;
}

.dropdown-change-lang {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0px 5px;
}
</style>