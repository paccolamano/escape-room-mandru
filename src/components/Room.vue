<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import type { Word } from '@/stores/game'

const props = defineProps<{
  name: string
  route?: string
  word?: Word
}>()

const router = useRouter()
const game = useGameStore()

const isFound = computed(() => !!props.word && game.hasWord(props.word))

function navigate() {
  if (isFound.value || !props.route) return
  router.push({ name: props.route })
}
</script>

<template>
  <div class="room-cell" :class="{ found: isFound }" @click="navigate">
    <span class="room-name">{{ name }}</span>
    <span v-if="isFound" class="room-word">{{ word }}</span>
  </div>
</template>

<style scoped>
.room-cell {
  width: 100%;
  height: 100%;
  border: 2px solid #e83839;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  text-align: center;
  cursor: pointer;
  transition: 0.25s;
  user-select: none;
  color: white;
}

.room-cell:not(.found):hover {
  background: #e83839;
  transform: scale(1.03);
}

.room-cell.found {
  cursor: default;
  background: rgba(232, 56, 57, 0.1);
}

.room-name {
  font-size: 16px;
}

.room-cell.found .room-name {
  font-size: 13px;
  color: #aaa;
}

.room-word {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #e83839;
}
</style>
