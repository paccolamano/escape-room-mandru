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

function conferma() {
  if (risposta.value.trim().toLowerCase() === 'tanti') {
    game.addWord('TANTI')
    router.push('/')
  } else {
    errore.value = true
    setTimeout(() => { errore.value = false }, 2000)
  }
}
</script>

<template>
  <div class="camera-page">
    <TimerBar />

    <main class="camera-main">
      <BackButton />

      <div class="titolo-letto">CAMERA</div>

      <div class="testo-letto">
        Apri i cassetti del comò. Forse ci trovi qualcosa di utile.
      </div>

      <div class="comoda">
        <details class="cassetto">
          <summary>Cassetto 1</summary>
          <div class="contenuto-cassetto">
            <p>Jarno<br />(ma da quanTo è chiuso lì dentro?!)</p>
          </div>
        </details>
        <details class="cassetto">
          <summary>Cassetto 2</summary>
          <div class="contenuto-cassetto">
            <p>3 mutAnde<br />più o meno tutte quelle che hai</p>
          </div>
        </details>
        <details class="cassetto">
          <summary>Cassetto 3</summary>
          <div class="contenuto-cassetto">
            <p>guanti<br />anzi, uNo solo...e l'altro dove sarà?</p>
          </div>
        </details>
        <details class="cassetto">
          <summary>Cassetto 4</summary>
          <div class="contenuto-cassetto">
            <p>qui c'è solo odore di umido<br />//il casseTto si chiude da solo per la vergogna//</p>
          </div>
        </details>
        <details class="cassetto">
          <summary>Cassetto 5</summary>
          <div class="contenuto-cassetto">
            <p>Jarno...di nuovo?! se sI moltiplica pure, è la fine</p>
          </div>
        </details>
      </div>

      <div class="input-letto">
        <div class="label-input-letto">Inserisci la parola corretta</div>
        <input v-model="risposta" type="text" @keyup.enter="conferma" />
        <button class="conferma-btn" @click="conferma">CONFERMA</button>
        <div v-if="errore" class="popup-letto">Parola errata</div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.camera-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
}

.camera-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.titolo-letto {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.testo-letto {
  max-width: 900px;
  margin: 0 auto 20px auto;
  text-align: center;
  font-size: 22px;
  line-height: 1.2;
}

.comoda {
  width: 540px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cassetto {
  border: 2px solid #444;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  transition: 0.2s;
  width: 100%;
}

.cassetto:hover {
  border-color: #e83839;
}

.cassetto summary {
  padding: 14px 16px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  list-style: none;
  font-family: 'Courier New', monospace;
  font-size: 18px;
}

.cassetto summary::-webkit-details-marker {
  display: none;
}

.contenuto-cassetto {
  padding: 14px 16px;
  border-top: 1px solid #333;
  font-size: 20px;
  line-height: 1.2;
  color: #ddd;
}

.contenuto-cassetto p {
  margin: 0;
}

.input-letto {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 48px;
}

.label-input-letto {
  font-size: 18px;
  color: white;
  margin-bottom: 12px;
}

.input-letto input {
  width: 540px;
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

.input-letto input:focus {
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

.popup-letto {
  margin-top: 12px;
  padding: 8px 14px;
  border: 2px solid #e83839;
  background: rgba(0, 0, 0, 0.85);
  color: #e83839;
  border-radius: 10px;
  font-size: 16px;
}
</style>
