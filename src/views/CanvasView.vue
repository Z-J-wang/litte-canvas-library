<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Canvas from '@/utils/Canvas'
import Clock from '@/utils/Clock'
import { Ball, SportTypeEnum } from '@/utils/Ball'
import '@/utils/utils.d.ts'

const canvas = ref()
const canvasBall = ref()
const canvasClock = ref()
let canvasInstance: Canvas
let ballInstance: Ball
let clockInstance: Clock

function reRender() {
  canvasInstance.draw()
  ballInstance.drawBall(SportTypeEnum['decelerated motion'])
  clockInstance.draw()
}

onMounted(() => {
  canvasInstance = new Canvas(canvas.value)
  canvasInstance.draw()
  ballInstance = new Ball(canvasBall.value, 1000, 500)
  ballInstance.drawBall(SportTypeEnum['decelerated motion'])
  clockInstance = new Clock(canvasClock.value, 1000, 500)
  clockInstance.draw()
})
</script>

<template>
  <div class="relative">
    <canvas ref="canvas" width="1000" height="500"></canvas>
    <canvas class="absolute-top-left" ref="canvasBall" width="1000" height="500"></canvas>
    <canvas class="absolute-top-left" ref="canvasClock" width="1000" height="500"></canvas>
    <el-button class="float-right cursor-pointer" @click="reRender">重新渲染</el-button>
  </div>
</template>

<style lang="less" scoped>
canvas {
  margin: 0 auto;
  margin-top: 50px;
  border: 1px solid #222222;
}
</style>
@/utils/Canvas
