<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import TimerBar from '@/components/TimerBar.vue'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const game = useGameStore()

interface Card {
  id: number
  src: string
  revealed: boolean
  matched: boolean
}

const cards = ref<Card[]>([])
const vinto = ref(false)

let firstIndex: number | null = null
let locked = false
let matchedCount = 0

const IMAGES = ['tonnino.png', 'coca.png', 'zola.png', 'jarnoaffamato.png', 'pane.png', 'cioccolato.png']

function initCards() {
  const doubled = [...IMAGES, ...IMAGES].sort(() => Math.random() - 0.5)
  cards.value = doubled.map((src, i) => ({
    id: i,
    src: `/immagini/${src}`,
    revealed: false,
    matched: false,
  }))
  firstIndex = null
  locked = false
  matchedCount = 0
  vinto.value = false
}

function clickCard(index: number) {
  const card = cards.value[index]
  if (locked || card.matched || card.revealed) return

  card.revealed = true

  if (firstIndex === null) {
    firstIndex = index
    return
  }

  const first = cards.value[firstIndex]
  locked = true

  if (first.src === card.src) {
    first.matched = true
    card.matched = true
    matchedCount++
    firstIndex = null
    locked = false
    if (matchedCount === IMAGES.length) {
      vinto.value = true
    }
  } else {
    setTimeout(() => {
      first.revealed = false
      card.revealed = false
      firstIndex = null
      locked = false
    }, 700)
  }
}

function continua() {
  game.addWord('EMA')
  router.push('/')
}

onMounted(initCards)
</script>

<template>
  <div class="cucina-page">
    <TimerBar />

    <main class="cucina-main">
      <BackButton />

      <div class="titolo-cucina">CUCINA</div>

      <div class="memory-container">
        <div class="testo-memory">
          Jarno ha rovesciato metà cucina e Moss ha dichiarato guerra al frigorifero
          perché lo disturba mentre mangia.
          Devi rimettere insieme gli oggetti giusti per capire la parola nascosta.
        </div>

        <div class="game-board">
          <div
            v-for="(card, i) in cards"
            :key="card.id"
            class="card"
            :class="{ revealed: card.revealed, matched: card.matched }"
            @click="clickCard(i)"
          >
            <img :src="card.src" />
          </div>
        </div>
      </div>
    </main>

    <Teleport to="body">
      <div v-if="vinto" class="popup-win">
        <div class="popup-win-box">
          <div class="popup-win-title">Complimenti!</div>
          <div class="popup-win-text">Ecco la tua parola: <strong>EMA</strong></div>
          <button class="popup-win-btn" @click="continua">Continua la tua ricerca</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.cucina-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
}

.cucina-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.titolo-cucina {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.memory-container {
  width: 100%;
  max-width: 1100px;
  margin: auto;
  text-align: center;
}

.testo-memory {
  font-size: 22px;
  line-height: 1.2;
  margin-bottom: 10px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(6, 140px);
  grid-auto-rows: 140px;
  gap: 10px;
  justify-content: center;
  margin-top: 30px;
}

.card {
  width: 140px;
  height: 140px;
  background: black;
  border: 2px solid #444;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s;
  overflow: hidden;
}

.card:hover:not(.matched) {
  border-color: #888;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}

.card.revealed img,
.card.matched img {
  display: block;
}

.card.matched {
  border-color: #e83839;
  opacity: 0.6;
  cursor: default;
}

.popup-win {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-win-box {
  background: black;
  border: 2px solid #e83839;
  border-radius: 14px;
  padding: 30px;
  text-align: center;
  width: 420px;
}

.popup-win-title {
  font-size: 28px;
  color: #e83839;
  font-weight: bold;
  margin-bottom: 16px;
}

.popup-win-text {
  font-size: 20px;
  color: white;
  line-height: 1.3;
  margin-bottom: 24px;
}

.popup-win-btn {
  display: inline-block;
  padding: 12px 20px;
  border: 2px solid #e83839;
  border-radius: 10px;
  color: #e83839;
  background: none;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: 0.25s;
}

.popup-win-btn:hover {
  background: #e83839;
  color: white;
  transform: scale(1.05);
}
</style>
