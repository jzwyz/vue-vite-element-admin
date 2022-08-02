<template>
	<el-config-provider v-bind="elConfigProviderModel">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { useLocale } from '@/locales/useLocale'
import { reactive } from 'vue'
import { useUserStore } from './stores/user'
import { initRouterMenus } from './router/guard';

const configStore = useConfigStore()
const userStore = useUserStore()
const localeUtil = useLocale()

const elConfigProviderModel: any = reactive({
	...configStore.elConfigProvider,
	locale: localeUtil.getElLocale
})

configStore.loadLocalConfig()
userStore.loadCacheLoginInfo()
initRouterMenus()
</script>
