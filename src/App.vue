<template>
	<el-config-provider v-bind="elConfigProviderModel">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { useLocale } from '@/locales/useLocale'
import { reactive } from 'vue';
const configStore = useConfigStore();
const localeUtil = useLocale();
const elConfigProviderModel: any = reactive({
	...configStore.elConfigProvider,
	locale: localeUtil.getElLocale
})
</script>
