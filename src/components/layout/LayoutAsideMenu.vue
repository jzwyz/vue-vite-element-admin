<template>
    <div class="layout-aside-menu">
        <div class="logo">
            <h4 v-if="!configStore.isCollapse">{{ title }}</h4>
            <h4 v-else>{{ sub_title }}</h4>
        </div>
         <el-menu class="vvea-menu-vertical" :defaultActive="route.path" :collapse="configStore.isCollapse">
            <template v-for="menuItem in menus" :key="menuItem.name">
                <layout-aside-menu-item :perfix="['/', menuItem.meta?.perfix || 'system']" :menuItem="menuItem" />
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useConfigStore } from '@/stores/config'
import { sortBy } from 'lodash-es';

const configStore = useConfigStore();
const route = useRoute()

const menus = computed(() => sortBy(configStore.getMenus, (itme, index) => itme.meta?.index || index * 100))

const title = import.meta.env.VITE_APP_TITLE
const sub_title = import.meta.env.VITE_APP_TITLE_SUB
</script>

<style scoped lang="scss">
.layout-aside-menu {
    height: 100%;
    padding: 0px;
    background-color: #001529;
}

.logo {
    height: 40px;
    background-color: #001529;
    color: #ffffff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vvea-menu-vertical {
    border-right-width: 0px;
}

.vvea-menu-vertical:not(.vvea-menu--collapse) {
    width: 200px;
    min-height: calc(100% - 40px);
}
</style>