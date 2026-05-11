<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <button class="back-btn" @click="router.push('/')">
    TORNA ALLA CASA
  </button>
</template>

<style scoped>
.back-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: 0.2s;
  padding: 0;
}

.back-btn:hover {
  color: #e83839;
}
</style>
