<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Gobang from '@/entities/Gobang/Gobang'
import { useMouseInElement } from '@vueuse/core'
import { Subject } from 'rxjs'

const container = ref()
const canvasGobang = ref()
const canvasBoard = ref()
const canvasHelper = ref()
const player = ref('black')

const subject = new Subject()
subject.subscribe({
  next: (value: any) => {
    alert(value.message)
    setTimeout(() => {
      instance.reset()
    }, 500)
  }
})
let instance: Gobang
const { elementX, elementY, isOutside } = useMouseInElement(container)

watch([elementX, elementY, isOutside], () => {
  instance.helper.drawCoordinate(elementX.value, elementY.value, isOutside.value)
})

function drop() {
  instance.drop(elementX.value, elementY.value, isOutside.value)
  player.value = instance.player
}

onMounted(() => {
  instance = new Gobang(canvasGobang.value, canvasBoard.value, canvasHelper.value, 620, 620, subject)
})
</script>

<template>
  <h1 class="text-center text-xl">五子棋</h1>
  <div class="m-auto wrapper relative" ref="container" @click="drop">
    <canvas class="absolute top-0 z-0" ref="canvasBoard" width="620" height="620"></canvas>
    <canvas class="absolute top-0 z-10" ref="canvasHelper" width="620" height="620"></canvas>
    <canvas class="absolute top-0 z-20" ref="canvasGobang" width="620" height="620"></canvas>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 620px;
  height: 620px;
}
</style>
