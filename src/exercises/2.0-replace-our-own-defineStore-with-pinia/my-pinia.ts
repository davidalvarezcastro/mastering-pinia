import { EffectScope, InjectionKey, Plugin, effectScope, inject } from 'vue'

export function defineStore<R>(fn: () => R) {
  function useStore() {
    const globalEffect = inject(effectKey)
    const stores = inject(storesMapKey)

    if (!globalEffect || !stores) {
      throw new Error('You must use useStore() inside a setup function!')
    }

    if (!stores.has(fn)) {
      const store = globalEffect
        .run(() =>
          // this one is nested in the global, so we don't pass true
          effectScope(),
        )!
        .run(() => fn())!

      stores.set(fn, store)
    }

    return stores.get(fn) as R
  }

  return useStore
}

const effectKey = Symbol('effect') as InjectionKey<EffectScope>
const storesMapKey = Symbol('stores') as InjectionKey<Map<() => unknown, unknown>>

// Keep this exported
export const appPlugin: Plugin = app => {
  const stores = new WeakMap<() => unknown, unknown>()
  const globalEffect = effectScope(true)

  app.provide(storesMapKey, stores)
  app.provide(effectKey, globalEffect)
}
