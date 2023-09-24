<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Snake, keyCodeEnum } from '@/utils/Snake'
import type { Direction } from '@/utils/Snake'
import { useKeyup } from '@/useVue/keyup'
import { Subject } from 'rxjs'

const subject = new Subject()
subject.subscribe({
  next: (value) => {
    if (value) alert('Game Over')
  }
})

const snake = ref()
const { keyCode } = useKeyup()
let instance: Snake

const reRender = () => {
  instance.start()
}

watch(keyCode, (value) => {
  if (keyCodeEnum[value]) {
    instance.control(keyCodeEnum[value] as Direction)
  }
})

onMounted(() => {
  instance = new Snake(snake.value, 1200, 600, subject, 200, true)
  reRender()
})
</script>

<template>
  <div class="relative">
    <canvas class="m-auto" ref="snake" width="1200" height="600"></canvas>
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
