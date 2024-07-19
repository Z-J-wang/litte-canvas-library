<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'

const canvas = ref()
const progress = ref(0)
const showToolbar = ref(false)

const play = () => {
  const video = document.getElementById('video') as HTMLVideoElement
  video.play()
}

onMounted(() => {
  const video = document.getElementById('video') as HTMLVideoElement
  const ctx = canvas.value.getContext('2d')
  function draw() {
    ctx!.drawImage(video, 0, 0, canvas.value.width, canvas.value.height)
    requestAnimationFrame(draw)
  }
  video.addEventListener('play', () => {
    canvas.value.height = Number.parseFloat(getComputedStyle(video).height)
    draw()
  })
  video.addEventListener('timeupdate', () => {
    progress.value = parseInt(((video.currentTime / video.duration) * 100).toFixed(2))
  })
})
</script>

<template>
  <div class="flex">
    <video id="video" src="@/assets/video/1.mp4" controls="true" width="500" />
    <div class="player relative" @mouseover="showToolbar = true" @mouseleave="showToolbar = false">
      <canvas class="m-auto" ref="canvas" width="500"></canvas>
      <Transition name="fade">
        <div v-show="progress === 100 || showToolbar" class="toolbar absolute bottom-0 p-2">
          <div>
            <el-icon :size="24" color="white" style="cursor: pointer" @click="play"><CaretRight /></el-icon>
          </div>
          <!-- <el-slider v-model="progress" size="small" color="white" /> -->
          <el-progress :percentage="progress" :show-text="false" color="white"></el-progress>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="less" scoped>
.toolbar {
  width: 100%;
  height: 70px;
  background: linear-gradient(to top, rgba(0, 0, 0), transparent);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
