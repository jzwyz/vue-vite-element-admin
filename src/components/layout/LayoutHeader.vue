<template>
    <div class="layout-header">
        <el-row class="header-row" :gutter="20" justify="space-around" align="middle">
            <el-col class="header-left" :span="8">
                <span class="header-trigger-icon custom-button" @click="commonStore.handleCollapse">
                    <el-icon :size="commonStore.iconSize">
                        <Expand v-if="commonStore.isCollapse" />
                        <Fold v-else />
                    </el-icon>
                </span>
                <LayoutHeaderBeadcrumb />
            </el-col>
            <el-col class="header-right" :span="16">
                <span class="header-trigger-icon custom-button space-left">
                    <el-icon :size="commonStore.iconSize">
                        <FullScreen />
                    </el-icon>
                </span>
                <el-dropdown style="height: 100%" @command="handleChangeLang">
                    <div class="dropdown-change-lang">
                        <el-icon :size="commonStore.iconSize">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#vvea-i18n"></use>
                            </svg>
                        </el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :disabled="localeUtil.getLocale.value == 'zh-CN'" command="zh-CN">简体中文
                            </el-dropdown-item>
                            <el-dropdown-item :disabled="localeUtil.getLocale.value == 'en'" command="en">英语
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown style="height: 100%" class="space-left">
                    <div class="dropdown-userinfo">
                        <el-avatar shape="square" :size="26" :src="squareUrl" />
                        <span class="space-left">Jason.Jiang</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>退出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span class="header-trigger-icon custom-button space-left">
                    <el-icon :size="commonStore.iconSize">
                        <Setting />
                    </el-icon>
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/common'
import { useLocale } from '@/locales/useLocale'
import type { LocaleType } from "~/config";
import LayoutHeaderBeadcrumb from '@/components/layout/LayoutHeaderBeadcrumb.vue'

const commonStore = useCommonStore();
const squareUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
const localeUtil = useLocale();
const handleChangeLang = (lange: LocaleType) => {
    localeUtil.changeLocale(lange)
}
</script>

<style scoped lang="scss">
.layout-header {
    padding: 0px;
    width: 100%;
    height: 100%;
}

.header-row {
    height: 100%;
    margin: 0px !important;

    .header-left,
    .header-right {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0px !important;
    }

    .header-right {
        justify-content: end;
    }
}

.header-trigger-icon {
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dropdown-userinfo,
.dropdown-change-lang {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-left: 5px;
}
</style>