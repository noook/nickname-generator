<template>
  <div class="home">
    <LetterDisplay />
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api';
import LetterDisplay from '@/components/LetterDisplay.vue';

export default createComponent({
  components: {
    LetterDisplay,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2em;
}
</style>
