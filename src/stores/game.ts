import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'escape-room-game'
const GAME_DURATION = 30 * 60 * 1000

export const ALL_WORDS = ['TANTI', 'AUGURI', 'EMA', 'ORA', 'APRI', 'I TUOI', 'REGALI'] as const
export type Word = (typeof ALL_WORDS)[number]

interface PersistedState {
  gameStarted: boolean
  startTime: number | null
  foundWords: Word[]
}

function loadFromStorage(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { gameStarted: false, startTime: null, foundWords: [] }
}

export const useGameStore = defineStore('game', () => {
  const saved = loadFromStorage()

  const gameStarted = ref(saved.gameStarted)
  const startTime = ref<number | null>(saved.startTime)
  const foundWords = ref<Word[]>(saved.foundWords)
  const now = ref(Date.now())

  const interval = setInterval(() => {
    now.value = Date.now()
  }, 1000)

  const timeRemaining = computed(() => {
    if (!gameStarted.value || startTime.value === null) return GAME_DURATION
    return Math.max(0, startTime.value + GAME_DURATION - now.value)
  })

  const isTimeUp = computed(() => timeRemaining.value === 0)
  const isUrgent = computed(() => timeRemaining.value <= 5 * 60 * 1000)
  const isComplete = computed(() => foundWords.value.length === ALL_WORDS.length)

  function startGame() {
    gameStarted.value = true
    startTime.value = Date.now()
    foundWords.value = []
  }

  function addWord(word: Word) {
    if (!foundWords.value.includes(word)) {
      foundWords.value.push(word)
    }
  }

  function hasWord(word: Word) {
    return foundWords.value.includes(word)
  }

  function resetGame() {
    gameStarted.value = false
    startTime.value = null
    foundWords.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  watch([gameStarted, startTime, foundWords], () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        gameStarted: gameStarted.value,
        startTime: startTime.value,
        foundWords: foundWords.value,
      }),
    )
  }, { deep: true })

  function $dispose() {
    clearInterval(interval)
  }

  return {
    gameStarted,
    startTime,
    foundWords,
    timeRemaining,
    isTimeUp,
    isUrgent,
    isComplete,
    startGame,
    addWord,
    hasWord,
    resetGame,
    $dispose,
  }
})
