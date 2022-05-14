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
                <span class="header-trigger-icon custom-button space-left" @click="toggle">
                    <el-icon :size="commonStore.iconSize">
                        <FullScreen />
                    </el-icon>
                </span>
                <span class="header-trigger-icon custom-button">
                    <LayoutHeaderLocale :isBtn="false" />
                </span>
                <el-dropdown style="height: 100%" class="space-left" @command="handleUserCommand">
                    <div class="dropdown-userinfo">
                        <el-avatar shape="square" :size="26" :src="squareUrl" />
                        <span class="space-left">Jason.Jiang</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="logout">{{$t('component.layout.header.logout')}}</el-dropdown-item>
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
import LayoutHeaderBeadcrumb from '@/components/layout/LayoutHeaderBeadcrumb.vue'
import LayoutHeaderLocale from '@/components/layout/LayoutHeaderLocale.vue'
import { useFullscreen } from '@vueuse/core'
import { useRouter } from 'vue-router';

const { toggle } = useFullscreen()
const commonStore = useCommonStore();

const squareUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"

const router = useRouter()
const userCommandMap = {
    'logout': () => router.push({ name: 'login' })
}
const handleUserCommand = (comd: string) => {
    if (!(comd in userCommandMap)) return;
    userCommandMap[comd]()
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

.dropdown-userinfo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-left: 5px;
}
</style>