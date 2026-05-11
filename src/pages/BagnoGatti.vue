<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import TimerBar from '@/components/TimerBar.vue'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const game = useGameStore()

const risposta = ref('')
const errore = ref(false)
const morseAperto = ref(false)

const alfabeto = [
  ['A = 💩🐱', 'B = 🐱💩💩💩', 'C = 🐱💩🐱💩', 'D = 🐱💩💩', 'E = 💩', 'F = 💩💩🐱💩', 'G = 🐱🐱💩'],
  ['H = 💩💩💩💩', 'I = 💩💩', 'J = 💩🐱🐱🐱', 'K = 🐱💩🐱', 'L = 💩🐱💩💩', 'M = 🐱🐱', 'N = 🐱💩'],
  ['O = 🐱🐱🐱', 'P = 💩🐱🐱💩', 'Q = 🐱🐱💩🐱', 'R = 💩🐱💩', 'S = 💩💩💩', 'T = 🐱'],
  ['U = 💩💩🐱', 'V = 💩💩💩🐱', 'W = 💩🐱🐱', 'X = 🐱💩💩🐱', 'Y = 🐱💩🐱🐱', 'Z = 🐱🐱💩💩'],
]

function conferma() {
  if (risposta.value.trim().toLowerCase() === 'regali') {
    game.addWord('REGALI')
    router.push('/')
  } else {
    errore.value = true
    setTimeout(() => { errore.value = false }, 2000)
  }
}
</script>

<template>
  <div class="bagnogatti-page">
    <TimerBar />

    <main class="bagnogatti-main">
      <BackButton />

      <div class="titolo-bagnogatti">BAGNO DEI GATTI</div>

      <div class="bagnogatti-container">
        <div class="messaggio-wrapper">
          <div class="frase-bagnogatti">
            Anche le cacchine sante si sono animate
            e sembrano quasi volerti dire qualcosa
          </div>

          <div class="messaggio-cacca">
            💩🐱💩<br /><br />
            💩<br /><br />
            🐱🐱💩<br /><br />
            💩🐱<br /><br />
            💩🐱💩💩<br /><br />
            💩💩
          </div>
        </div>

        <div class="morse-wrapper">
          <div class="morse-button" @click="morseAperto = !morseAperto">
            Alfabeto Moss {{ morseAperto ? '▲' : '▼' }}
          </div>

          <div v-if="morseAperto" class="morse-box">
            <div class="morse-grid">
              <div v-for="(colonna, i) in alfabeto" :key="i" class="morse-colonna">
                <div v-for="voce in colonna" :key="voce">{{ voce }}</div>
              </div>
            </div>
            <div class="morse-legenda">💩 = punto &nbsp;&nbsp; 🐱 = linea</div>
          </div>
        </div>
      </div>

      <div class="input-bagnogatti">
        <div class="label-input-bagnogatti">Inserisci la parola corretta</div>
        <input v-model="risposta" type="text" @keyup.enter="conferma" />
        <button class="conferma-btn" @click="conferma">CONFERMA</button>
        <div v-if="errore" class="popup-errore">Parola errata</div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.bagnogatti-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
}

.bagnogatti-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.titolo-bagnogatti {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.bagnogatti-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  width: 100%;
  max-width: 1100px;
  margin: 20px auto 0 auto;
}

.messaggio-wrapper {
  flex: 0 0 auto;
}

.frase-bagnogatti {
  font-size: 22px;
  line-height: 1.2;
  margin-bottom: 16px;
  max-width: 460px;
}

.messaggio-cacca {
  border: 2px solid #444;
  border-radius: 12px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  font-size: 28px;
  line-height: 1.1;
  width: fit-content;
}

.morse-wrapper {
  flex: 0 0 auto;
  text-align: right;
  position: relative;
}

.morse-button {
  color: #e83839;
  font-size: 22px;
  cursor: pointer;
  user-select: none;
  font-family: 'Courier New', monospace;
}

.morse-box {
  margin-top: 10px;
  padding: 10px;
  background: black;
  border: 1px solid #333;
  border-radius: 8px;
  text-align: left;
}

.morse-grid {
  display: flex;
  gap: 6px;
  align-items: flex-start;
}

.morse-colonna {
  flex: none;
  width: 130px;
  font-size: 15px;
  line-height: 1.4;
  white-space: nowrap;
  font-family: 'Courier New', monospace;
}

.morse-colonna:not(:last-child) {
  border-right: 1px solid #444;
  padding-right: 8px;
}

.morse-legenda {
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid #444;
  font-size: 15px;
  font-family: 'Courier New', monospace;
  color: white;
}

.input-bagnogatti {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.label-input-bagnogatti {
  font-size: 18px;
  color: white;
  margin-bottom: 12px;
}

.input-bagnogatti input {
  width: 260px;
  padding: 6px 10px;
  font-size: 18px;
  text-align: center;
  color: white;
  background: rgba(255, 255, 255, 0.04);
  border: 3px solid white;
  border-radius: 10px;
  outline: none;
  font-family: 'Courier New', monospace;
}

.input-bagnogatti input:focus {
  border-color: #e83839;
  box-shadow: 0 0 12px rgba(232, 56, 57, 0.4);
}

.conferma-btn {
  margin-top: 12px;
  padding: 10px 18px;
  border: 2px solid #e83839;
  border-radius: 8px;
  color: #e83839;
  background: none;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  transition: 0.25s;
  cursor: pointer;
}

.conferma-btn:hover {
  background: #e83839;
  color: white;
  transform: scale(1.05);
}

.popup-errore {
  margin-top: 12px;
  padding: 8px 14px;
  border: 2px solid #e83839;
  background: rgba(0, 0, 0, 0.85);
  color: #e83839;
  border-radius: 10px;
  font-size: 16px;
}
</style>
