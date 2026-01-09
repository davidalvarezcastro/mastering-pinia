import { effectScope } from 'vue'

const stores = new WeakMap<() => unknown, unknown>() // key/value ignored by garbage collector
const globalEffect = effectScope(true)

export function defineStore<R>(fn: () => R) {
  function useStore() {
    if (!stores.has(fn)) {
      const store = globalEffect.run(() => effectScope().run(fn))
      stores.set(fn, store)
    }

    return stores.get(fn) as R
  }

  return useStore
}
