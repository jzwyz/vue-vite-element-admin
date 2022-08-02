<template>
    <div class="aside-menu-item">
        <template v-if="menuItem && menuItem.children && menuItem.children.length > 0">
            <el-sub-menu :index="menuItem.path">
                <template #title>
                    <el-icon>
                        <Icon :type="menuItem.meta?.icon" />
                    </el-icon>
                    <span class="aside-menu-item-sub-menu-name">
                        {{ $t(`route_menu.${menuItem.name?.toString()}`) }}
                    </span>
                </template>
                <template v-for="subMenuItem in menuItem.children" :key="subMenuItem.name">
                    <aside-menu-item :perfix="[...perfix, subMenuItem.meta?.perfix || menuItem.path]"
                        :menuItem="subMenuItem" />
                </template>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item :index="[...perfix, menuItem.path].filter(Boolean).join('/').replace(/\/{2,}/gi, '/')">
                <el-icon>
                    <Icon :type="menuItem.meta?.icon" />
                </el-icon>
                <template #title>
                    <a class="aside-menu-item-menu-name-link" target="_self"
                        :href="['/#/', ...perfix, menuItem.path].filter(Boolean).join('/').replace(/\/{2,}/gi, '/')">
                        {{ $t(`route_menu.${menuItem.name?.toString()}`) }}
                    </a>
                </template>
            </el-menu-item>
        </template>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'

const { perfix, menuItem } = defineProps({
    perfix: {
        type: Array,
        default: '/'
    },
    menuItem: {
        type: Object,
        default: null
    }
})
</script>

<style lang="scss">
.aside-menu-item {
    padding: 0px;

    .el-menu-item.is-active {
        background-color: $color-primary;
    }
}

.aside-menu-item-menu-name-link,
.aside-menu-item-sub-menu-name {
    width: 131px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    color: unset !important;
}

.aside-menu-item-sub-menu-name {
    width: 118px;
}
</style>