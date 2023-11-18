<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Canvas from '@/utils/Canvas'
import { useMouse } from '@/useVue/useMouse'

const canvas = ref()
const Preview = ref()
const selectCanvas = ref()
const showPMG = ref(false) // show preview
const imageWidth = ref(0) // 图片宽度
const imageHeight = ref(0) // 图片高度

const { x, y, pageX, pageY } = useMouse(selectCanvas)
let dWidth: number = 500, // 放大镜宽度
  dHeight: number = 500, // 放大镜高度
  sWidth: number = 100, // 切面宽度
  sHeight: number = 100, // 切面高度
  imageOriginWidth: number = 0, // 图片原始宽度
  imageOriginHeight: number = 0 // 图片原始高度

let canvasInstance: Canvas

function drawSelectArea(x: number, y: number) {
  const selectCanvasInstance: Canvas = new Canvas(selectCanvas.value)
  const ctx = selectCanvasInstance.context
  let startX = x - sWidth / 2
  let startY = y - sHeight / 2
  if (startX < 0) startX = 0
  if (startY < 0) startY = 0
  if (startX + sWidth > imageWidth.value) startX = imageWidth.value - sWidth
  if (startY + sHeight > imageHeight.value) startY = imageHeight.value - sHeight

  ctx.clearRect(0, 0, imageWidth.value, imageHeight.value)
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
    x * (imageOriginWidth / imageWidth.value),
    y * (imageOriginHeight / imageHeight.value),
    sWidth * (imageOriginWidth / imageWidth.value),
    sHeight * (imageOriginHeight / imageHeight.value),
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

onMounted(() => {
  const imgElement = new Image()
  imgElement.src = Preview.value.src
  imgElement.onload = () => {
    imageOriginWidth = imgElement.width
    imageOriginHeight = imgElement.height
    imageWidth.value = Preview.value.width
    imageHeight.value = Preview.value.height
  }
})
</script>

<template>
  <div class="preview outline-1 outline relative" @mouseenter="showPMG = true" @mouseleave="showPMG = false">
    <img ref="Preview" class="object-contain" src="@/assets/img/pictureMagnifyingGlassView/example.jpg" alt="" />
    <canvas
      v-show="showPMG"
      class="absolute top-0 left-0"
      ref="selectCanvas"
      :width="imageWidth"
      :height="imageHeight"
    ></canvas>
    <div v-show="showPMG" class="absolute top-0 right-0 outline-1 outline" :style="{ right: -dWidth - 10 + 'px' }">
      <canvas class="border" ref="canvas" :width="dWidth" :height="dHeight"></canvas>
    </div>
  </div>
</template>

<style scoped>
.preview {
  width: 500px;
}
</style>
