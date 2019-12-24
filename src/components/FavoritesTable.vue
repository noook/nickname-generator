<template>
  <div class="favorites-table">
    <table>
      <thead></thead>
      <tbody>
        <tr v-for="(fav, id) in favorites" :key="id">
          <td>{{ fav }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

interface Props {
  favorites: string[];
}

export default createComponent<Props>({
  props: {
    favorites: {
      type: Array as () => string[],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  tr {
    &:nth-child(even) {
      background-color: rgba($flamingo, .3);
    }

    td {
      padding: 10px;
      // font-size: .5em;
    }
  }
}
</style>
