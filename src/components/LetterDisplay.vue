<template>
  <div class="letter-display container">
    <h2>{{ displayer }}</h2>
    <button class="favorite" @click="addFavorite">
      Favorite !
      <span ref="notif" class="notification">+</span>
    </button>
    <div class="accordions">
      <Accordion class="settings" :open.sync="accordionStates['settings']">
        <template #header>
          Settings
        </template>
        <template>
          <div class="form-row">
            <input type="checkbox" v-model="capitalize" name="capitalize" id="capitalize">
            <label for="capitalize">Capitalize</label>
          </div>
          <div class="form-row">
            <input type="number" max="20" v-model.number="length" name="length" id="length">
            <label for="length">Length</label>
          </div>
          <div class="form-row">
            <input
              type="number"
              min="800"
              step="100"
              v-model.number="interval"
              name="interval"
              id="interval">
            <label for="interval">Interval (ms)</label>
          </div>
        </template>
      </Accordion>
      <Accordion :key="favorites.length" :open.sync="accordionStates['favorites']">
        <template #header>
          Favorites ({{ favorites.length }})
        </template>
        <template>
          <FavoritesTable :favorites="favorites" />
        </template>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts">
import {
  createComponent, ref, Ref, computed, onMounted, reactive, watch,
} from '@vue/composition-api';
import FavoritesTable from './FavoritesTable.vue';
import Accordion from './Accordion.vue';
import { availableLetters, random } from '@/utils';

function refreshLetters(displayed: Ref<string>, length: number) {
  displayed.value = [...Array(length)].reduce((acc: string) => {
    acc += random(availableLetters);
    return acc;
  }, '');
}

export default createComponent({
  components: {
    Accordion,
    FavoritesTable,
  },
  setup(props, context) {
    const notif = ref<HTMLSpanElement>(null);
    const capitalize = ref<boolean>(true);
    const letters = ref<string>('');
    const favorites = reactive<string[]>([]);
    const length = ref<number>(5);
    const interval = ref<number>(1000);
    const accordionStates = ref<{[index: string]: boolean}>({
      settings: false,
      favorites: false,
    });
    refreshLetters(letters, length.value);

    // eslint-disable-next-line
    const displayer = computed(() => (val => (capitalize.value ? val.toUpperCase() : val))(letters.value[0]) + letters.value.slice(1));
    const addFavorite = () => {
      favorites.push(displayer.value);
      notif.value?.classList.add('animating');
      setTimeout(() => {
        notif.value?.classList.remove('animating');
      }, 500);
    };

    let timer = setInterval(() => {
      refreshLetters(letters, length.value);
    }, interval.value);

    watch(interval, () => {
      clearInterval(timer);
      timer = setInterval(() => {
        refreshLetters(letters, length.value);
      }, interval.value);
    });

    return {
      notif,
      capitalize,
      favorites,
      letters,
      length,
      accordionStates,
      interval,
      displayer,
      addFavorite,
    };
  },
});
</script>

<style lang="scss" scoped>
.letter-display {
  font-size: 2.5em;

  > h2 {
    margin: 30px 0;
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
}

.favorite {
  position: relative;
  background-color: $flamingo;
  border: none;
  border-radius: 3px;
  color: #fff;
  font-size: 1.2rem;
  padding: 10px;

  .notification {
    position: absolute;
    top: -10px;
    right: -20px;
    font-size: 1.3em;
    color: $flamingo;
    opacity: 0;

    &.animating {
      animation-duration: .5s;
      animation-fill-mode: both;
      animation-name: fadeOutUp;
    }
  }
}

.favorites-table {
  max-height: 400px;
  overflow: scroll;
}

.form-row {
  @include d-flex-centered(flex-start);
  padding: 10px;

  input {
    margin-right: 10px;

    &[type="number"] {
      width: 50px;
      padding: 5px 10px;
      border-radius: 5px;
      border: solid 1px rgba(#444, .5);
      font-size: .7em;
      height: 100%;
    }
  }
}

.accordions {
  .accordion {
    margin: 10px 0;
  }
}
</style>
