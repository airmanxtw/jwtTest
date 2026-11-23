<script setup lang="ts">
import DemoPage from './components/DemoPage.vue'
import { useStore } from './api/useStore'
import { storeToRefs } from 'pinia';
const store = useStore()
const { token } = storeToRefs(store)


</script>

<template>
  <DemoPage />
  <p>{{ token }}</p>
  <!-- <button @click="setToken('newTokenValue')">Set Token</button> -->
</template>
