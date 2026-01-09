<script lang="ts" setup>
import { useCountStore } from './store'

const countStore = useCountStore()
</script>

<template>
  <p>
    Count: <span data-test="count">{{ countStore.n }}</span
    >. {{ countStore.n }} x 2 = <span data-test="double">{{ countStore.double }}</span>
  </p>
  <button data-test="increment" @click="countStore.increment()">Increment ({{ countStore.n }})</button>
</template>
