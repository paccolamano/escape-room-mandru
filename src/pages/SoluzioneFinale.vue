<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameStore, ALL_WORDS } from '@/stores/game'

const router = useRouter()
const game = useGameStore()

function terminaGioco() {
  game.resetGame()
  router.push({ name: 'start' })
}
</script>

<template>
  <div class="soluzione-page">
    <main class="soluzione-main">
      <div class="titolo-soluzione">SOLUZIONE FINALE</div>

      <div class="testo-soluzione">Hai recuperato tutte le parole.</div>

      <div class="griglia-parole">
        <div v-for="word in ALL_WORDS" :key="word" class="parola-box">{{ word }}</div>
      </div>

      <div class="frase-finale">
        TANTI AUGURI EMA,<br>
        ORA APRI I TUOI REGALI
      </div>

      <div class="sottotitolo-finale">
        anzi... prima leggi il biglietto (digitale)
      </div>

      <button class="termina-btn" @click="terminaGioco">Termina il gioco</button>
    </main>
  </div>
</template>

<style scoped>
.soluzione-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
  overflow-y: auto;
}

.soluzione-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
}

.titolo-soluzione {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  text-align: center;
  margin-bottom: 10px;
}

.testo-soluzione {
  text-align: center;
  font-size: 20px;
  margin-bottom: 25px;
  color: white;
  font-family: Georgia, serif;
}

.griglia-parole {
  width: 900px;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  justify-items: center;
  margin-bottom: 0;
}

.parola-box {
  width: 180px;
  height: 70px;
  border: 2px solid #e83839;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  color: white;
  background: rgba(255, 255, 255, 0.03);
  text-transform: uppercase;
}

.frase-finale {
  margin-top: 40px;
  text-align: center;
  font-size: 34px;
  line-height: 1.3;
  color: #e83839;
  font-weight: bold;
  letter-spacing: 2px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
}

.sottotitolo-finale {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #888;
  font-family: Georgia, serif;
  font-style: italic;
}

.termina-btn {
  margin-top: 40px;
  padding: 12px 24px;
  border: 2px solid #e83839;
  border-radius: 10px;
  color: #e83839;
  background: none;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: 0.25s;
}

.termina-btn:hover {
  background: #e83839;
  color: white;
  transform: scale(1.05);
}
</style>
