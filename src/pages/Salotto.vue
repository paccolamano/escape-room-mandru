<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import TimerBar from '@/components/TimerBar.vue'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const game = useGameStore()

const popupAperto = ref(false)
const errore = ref(false)

const tabella = [
  [{ l: 'A', c: 'stabile'  }, { l: 'X', c: 'flicker1' }, { l: 'O', c: 'flicker2' }, { l: 'V', c: 'flicker3' }],
  [{ l: 'B', c: 'flicker2' }, { l: 'P', c: 'stabile'  }, { l: 'K', c: 'flicker1' }, { l: 'N', c: 'flicker3' }],
  [{ l: 'E', c: 'flicker3' }, { l: 'T', c: 'flicker1' }, { l: 'U', c: 'flicker2' }, { l: 'R', c: 'stabile'  }],
  [{ l: 'H', c: 'flicker1' }, { l: 'I', c: 'stabile'  }, { l: 'D', c: 'flicker3' }, { l: 'L', c: 'flicker2' }],
]

function scelta(parola: string) {
  if (parola === 'APRI') {
    game.addWord('APRI')
    router.push('/')
  } else {
    errore.value = true
    setTimeout(() => { errore.value = false }, 2000)
  }
}
</script>

<template>
  <div class="salotto-page">
    <TimerBar />

    <main class="salotto-main">
      <BackButton />

      <div class="titolo-salotto">SALOTTO</div>

      <div class="salotto-container">
        <div class="testo-salotto">
          Provi ad accendere la luce ma è impazzita per l'ennesima volta e io sono troppo impegnata
          a fare la sciroccata con Jarno e Moss per sistemarla e tu ovviamente non hai il telecomando
          (che dramma sti telecomandi, ne facessero uno universale per TUTTO).
          Magari concentrandoti potresti trovare delle informazioni utili per sistemare una volta per tutte la luce...
        </div>

        <table class="tabella-luce">
          <tr v-for="(riga, r) in tabella" :key="r">
            <td v-for="(cella, c) in riga" :key="c" :class="cella.c">{{ cella.l }}</td>
          </tr>
        </table>

        <div class="input-area">
          <div class="hint" @click="popupAperto = true">SELEZIONA LA PAROLA CORRETTA</div>
        </div>
      </div>
    </main>

    <Teleport to="body">
      <div v-if="popupAperto" class="popup-salotto" @click.self="popupAperto = false">
        <div class="popup-salotto-box">
          <div class="popup-salotto-title">Scegli la parola</div>

          <div class="choices">
            <div class="choice" @click="scelta('NUDO')">NUDO</div>
            <div class="choice" @click="scelta('APRI')">APRI</div>
            <div class="choice" @click="scelta('BEVI')">BEVI</div>
          </div>

          <div v-if="errore" class="errore-scelta">Risposta sbagliata, riprova.</div>

          <div class="popup-salotto-close" @click="popupAperto = false">Chiudi</div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.salotto-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
}

.salotto-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.titolo-salotto {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.salotto-container {
  width: 1100px;
  max-width: 100%;
  margin: auto;
  text-align: center;
}

.testo-salotto {
  font-size: 22px;
  line-height: 1.2;
  margin: 0 0 10px 0;
}

.tabella-luce {
  margin: 50px auto 0 auto;
  border-collapse: collapse;
}

.tabella-luce td {
  width: 70px;
  height: 70px;
  border: 2px solid #444;
  text-align: center;
  vertical-align: middle;
  font-size: 22px;
  color: white;
}

.stabile {
  opacity: 1;
}

.flicker1 { animation: flicker1 0.4s infinite alternate; }
.flicker2 { animation: flicker2 0.7s infinite alternate; }
.flicker3 { animation: flicker3 1.1s infinite alternate; }

@keyframes flicker1 {
  0%   { opacity: 1; }
  100% { opacity: 0.15; }
}

@keyframes flicker2 {
  0%   { opacity: 0.2; }
  50%  { opacity: 1; }
  100% { opacity: 0.3; }
}

@keyframes flicker3 {
  0%   { opacity: 1; }
  20%  { opacity: 0.1; }
  40%  { opacity: 1; }
  100% { opacity: 0.2; }
}

.input-area {
  margin-top: 30px;
}

.hint {
  display: inline-block;
  padding: 10px 10px;
  background: #e83839;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: 0.2s;
}

.hint:hover {
  transform: scale(1.05);
  background: #c92f30;
}

.popup-salotto {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-salotto-box {
  background: black;
  border: 2px solid #e83839;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  min-width: 400px;
}

.popup-salotto-title {
  margin-bottom: 15px;
  font-size: 18px;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.choice {
  padding: 10px;
  border: 2px solid #444;
  color: white;
  cursor: pointer;
  transition: 0.2s;
  font-size: 18px;
  font-family: 'Courier New', monospace;
}

.choice:hover {
  border-color: white;
  transform: scale(1.05);
}

.errore-scelta {
  color: #e83839;
  font-size: 16px;
  margin-bottom: 12px;
}

.popup-salotto-close {
  margin-top: 8px;
  color: #888;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  transition: 0.2s;
}

.popup-salotto-close:hover {
  color: white;
}
</style>
