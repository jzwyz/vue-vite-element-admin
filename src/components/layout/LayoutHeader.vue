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
                    <el-switch v-model="isDark" @change="configStore.changeDarkStatus" inline-prompt active-text="黑"
                        inactive-text="白" active-color="#000" />
                </span>
                <span class="header-trigger-icon custom-button space-left" @click="toggle">
                    <el-icon :size="commonStore.iconSize">
                        <FullScreen />
                    </el-icon>
                </span>
                <span class="header-trigger-icon custom-button">
                    <LayoutHeaderLocale :isBtn="false" />
                </span>
                <el-dropdown style="height: 100%" class="space-left space-right" @command="handleUserCommand">
                    <div class="dropdown-userinfo">
                        <el-avatar shape="square" :size="26" :src="squareUrl" />
                        <span class="space-left">Jason.Jiang</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="logout">{{ $t('component.layout.header.logout') }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/common'
import { useConfigStore } from '@/stores/config'
import LayoutHeaderBeadcrumb from '@/components/layout/LayoutHeaderBeadcrumb.vue'
import LayoutHeaderLocale from '@/components/layout/LayoutHeaderLocale.vue'
import { useFullscreen } from '@vueuse/core'
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity'

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

const configStore = useConfigStore()
const isDark = computed(() => configStore.dark)
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