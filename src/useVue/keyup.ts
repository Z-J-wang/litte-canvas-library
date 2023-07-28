import { ref, onMounted, onUnmounted } from 'vue'

export function useKeyup() {
  const keyCode = ref(0)
  const handlerKeyup = (event: { keyCode: any }) => {
    keyCode.value = event.keyCode
  }
  onMounted(() => {
    window.addEventListener('keyup', handlerKeyup)
  })
  onUnmounted(() => {
    window.removeEventListener('keyup', handlerKeyup)
  })
  return { keyCode }
}
