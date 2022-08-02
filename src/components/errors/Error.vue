<template>
    <div class="errors">
        Errors: {{status}}
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const hasRoute = route.name && router.hasRoute(route.name)
const status = route.params.status
const query = route.query

// console.log('---> paths instanceof Array', paths instanceof Array)

console.log('----> Error', route.name, hasRoute, status, query)
</script>

<style scoped>
.errors {
    padding: 0px;
}
</style>