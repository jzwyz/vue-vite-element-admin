<template>
  <svg :class="{ icon: true, active: isActive, invalid }" aria-hidden="true" @mouseover="handleMouseover"
    @mouseout="handleMouseout">
    <use :xlink:href="getType"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'yemian'
  },
  mouse: {
    type: Boolean,
    default: false
  },
  invalid: {
    type: Boolean,
    default: false
  }
})

const isActive = ref<boolean>(false);

const getType = computed(() => "#vvea-" + (props.type || ""))

const handleMouseover = () => {
  isActive.value = props.mouse && true;
}
const handleMouseout = () => {
  isActive.value = props.mouse && false;
}
</script>

<style scoped lang="scss">
.icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.active {
  fill: var(--vvea-text-color-primary) !important;
}

.invalid {
  fill: var(--vvea-color-info-light-8) !important;
}
</style>