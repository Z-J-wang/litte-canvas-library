<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Canvas from '@/utils/Canvas'
import { useMouse } from '@/useVue/useMouse'

const canvas = ref()
const Preview = ref()
const selectCanvas = ref()
const { x, y, pageX, pageY } = useMouse(selectCanvas)
let dWidth: number = 500, // 放大镜宽度
  dHeight: number = 500, // 放大镜高度
  sWidth: number = 100, // 切面宽度
  sHeight: number = 100 // 切面高度

let canvasInstance: Canvas

function drawSelectArea(x: number, y: number) {
  const selectCanvasInstance: Canvas = new Canvas(selectCanvas.value)
  const ctx = selectCanvasInstance.context
  let startX = x - sWidth / 2
  let startY = y - sHeight / 2
  if (startX < 0) startX = 0
  if (startY < 0) startY = 0
  if (startX + sWidth > 500) startX = 500 - sWidth
  if (startY + sHeight > 283) startY = 283 - sHeight

  ctx.clearRect(0, 0, 500, 283)
  ctx.fillStyle = 'rgb(0 0 0 / 20%)'
  ctx.fillRect(startX, startY, sWidth, sHeight)
  ctx.fill()
  draw(startX, startY)
}

function draw(x: number, y: number) {
  canvasInstance = new Canvas(canvas.value)
  const ctx = canvasInstance.context
  ctx.clearRect(0, 0, dWidth, dHeight)
  // 注意，drawImage抓取的是图片原本的大小，而不是img元素的大小。这里采用的图片默认是2560*1440，所以在设置切片是需要进行转换。
  //TODO 是否有优化方案，待研究
  ctx.drawImage(
    Preview.value,
    x * (2560 / 500),
    y * (1440 / 283),
    sWidth * (2560 / 500),
    sHeight * (1440 / 283),
    0,
    0,
    dWidth,
    dHeight
  )
}

watch(
  () => pageX.value + pageY.value,
  () => {
    drawSelectArea(x.value, y.value)
  }
)
</script>

<template>
  <div class="flex flex-row gap-2">
    <div class="inline-flex items-center">
      <div class="preview outline-1 outline relative">
        <img ref="Preview" class="object-contain" src="@/assets/img/pictureMagnifyingGlassView/example.jpg" alt="" />
        <canvas class="absolute top-0 left-0" ref="selectCanvas" width="500" height="283"></canvas>
      </div>
    </div>
    <div class="preview outline-1 outline">
      <canvas class="border" ref="canvas" :width="dWidth" :height="dHeight"></canvas>
    </div>
  </div>
</template>
<style scoped>
.preview {
  width: 500px;
}
</style>
