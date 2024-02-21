<template>
  <div class="vite-vue2-mf-wrapper">
    <SButton variant="primary">SButton</SButton>
    <SButton variant="primary">SButton1</SButton>
    <SButton variant="primary">SButton2</SButton>
    <SButton variant="primary">SButton3</SButton>
    <SButton variant="primary">SButton4</SButton>
  </div>
</template>

<script>
import { SButton } from './components/ui-kit/vite-vue2-mf'

export default {
  name: 'AppPage',
  components: {
    SButton
  },
  data() {
    return {}
  }
}
</script>



<style scoped>
.vite-vue2-mf-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
