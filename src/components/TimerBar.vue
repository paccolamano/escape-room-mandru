<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const game = useGameStore()
const router = useRouter()

const minutes = computed(() => Math.floor(game.timeRemaining / 60000))
const seconds = computed(() => Math.floor((game.timeRemaining % 60000) / 1000))
const formattedTime = computed(
  () => `${String(minutes.value).padStart(2, '0')}:${String(seconds.value).padStart(2, '0')}`,
)

function endTheGame() {
  game.resetGame()
  router.push('/start')
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.timer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: black;
  border-bottom: 2px solid #e83839;
  font-family: 'Courier New', monospace;
  color: white;
}

.timer-spacer {
  width: 120px;
}

.parole-trovate {
  font-size: 14px;
  color: #888;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.timer-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.timer-label {
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #888;
}

.timer-value {
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 4px;
  font-variant-numeric: tabular-nums;
}

.timer-value.urgent {
  color: #e83839;
  animation: pulse 1s infinite;
}

.timer-value.ended {
  color: #e83839;
  animation: none;
}

.timer-end-btn {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  cursor: pointer;
  transition: 0.25s;
  color: white;
  border: 2px solid #e83839;
  padding: 10px 20px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  user-select: none;
}

.timer-end-btn:hover {
  color: white;
  background: #e83839;
  transform: scale(1.05);
}
</style>

<template>
  <header class="timer-bar">
    <div class="timer-spacer">
      <span class="parole-trovate">Parole trovate: {{ game.foundWords.length }} / 7</span>
    </div>

    <div class="timer-center">
      <span class="timer-label">TEMPO RIMASTO</span>
      <span class="timer-value" :class="{ urgent: game.isUrgent, ended: game.isTimeUp }">
        {{ game.isTimeUp ? 'TEMPO SCADUTO' : formattedTime }}
      </span>
    </div>

    <button class="timer-end-btn" @click="endTheGame">Termina</button>
  </header>
</template>
