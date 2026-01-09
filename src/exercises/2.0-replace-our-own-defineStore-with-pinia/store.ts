import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCountSetupStore = defineStore('counter', () => {
  const n = ref(0)
  const increment = (amount = 1) => {
    n.value += amount
  }
  const double = computed(() => n.value * 2)

  return { n, double, increment }
})

export const useCountStore = defineStore('counter-options', {
  state() {
    return {
      n: 0,
    }
  },

  getters: {
    double: state => state.n * 2,
  },

  actions: {
    increment(amount = 1) {
      this.n += amount
    },
  },
})
