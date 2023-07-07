<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Canvas from '@/utils/canvas'

const canvas = ref()
let canvasInstance: Utils.Canvas

onMounted(() => {
  canvasInstance = new Canvas(canvas.value)
  canvasInstance.renderRect()
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
