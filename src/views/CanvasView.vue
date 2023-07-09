<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Canvas from '@/utils/canvas'

const canvas = ref()
let canvasInstance: Utils.Canvas

function reRender() {
  canvasInstance.draw()
}

onMounted(() => {
  canvasInstance = new Canvas(canvas.value)
  canvasInstance.draw()
})
</script>

<template>
  <button type="button" @click="reRender">重新渲染</button>
  <canvas ref="canvas" width="500" height="500"></canvas>
</template>
