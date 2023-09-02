import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'

export function useMouse(target: Ref<any>) {
  const x = ref(0)
  const y = ref(0)
  const pageX = ref(0)
  const pageY = ref(0)
  const handlerMousemove = (event: { offsetX: number; offsetY: number; pageX: number; pageY: number }) => {
    x.value = event.offsetX
    y.value = event.offsetY
    pageX.value = event.pageX
    pageY.value = event.pageY
  }
  onMounted(() => {
    const targetElem = target.value || window
    targetElem.addEventListener('mousemove', handlerMousemove)
  })
  onUnmounted(() => {
    const targetElem = target.value || window
    targetElem.removeEventListener('mousemove', handlerMousemove)
  })
  return { x, y, pageX, pageY }
}
