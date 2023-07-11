<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Canvas from '@/utils/canvas'
import Ball from '@/utils/Ball'

const canvas = ref()
const canvasBall = ref()
let canvasInstance: Utils.Canvas
let ballInstance: Ball

function reRender() {
  canvasInstance.draw()
}

onMounted(() => {
  canvasInstance = new Canvas(canvas.value)
  canvasInstance.draw()
  ballInstance = new Ball(canvasBall.value, 1000, 500)
  ballInstance.drawBall('uniform motion')
})
</script>

<template>
  <div class="relative">
    <canvas ref="canvas" width="1000" height="500"></canvas>
    <canvas class="absolute-top-left" ref="canvasBall" width="1000" height="500"></canvas>
    <button class="float-right cursor-pointer" type="button" @click="reRender">重新渲染</button>
  </div>
</template>

<style lang="less" scoped>
canvas {
  margin: 0 auto;
  margin-top: 50px;
  border: 1px solid #222222;
}
</style>
