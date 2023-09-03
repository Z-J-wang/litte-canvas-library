<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Clock from '@/utils/Clock'

const canvasClock = ref()
let clockInstance: Clock

onMounted(() => {
  clockInstance = new Clock(canvasClock.value, 1000, 500)
  clockInstance.draw()
})
</script>

<template>
  <canvas class="m-auto" ref="canvasClock" width="1000" height="500"></canvas>
</template>
