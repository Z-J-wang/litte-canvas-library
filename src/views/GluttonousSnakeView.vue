<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Snake from '@/utils/Snake'

const snake = ref()

let instance: Snake

onMounted(() => {
  instance = new Snake(snake.value)
})
</script>

<template>
  <div class="relative">
    <canvas ref="snake" width="1200" height="600"></canvas>
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
