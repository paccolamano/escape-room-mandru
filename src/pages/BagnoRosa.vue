<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import TimerBar from '@/components/TimerBar.vue'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const game = useGameStore()

const errore = ref(false)

const prodotti = [
  { src: '/immagini/1.png', corretto: false, row: 1, col: 1 },
  { src: '/immagini/2.png', corretto: false, row: 1, col: 3 },
  { src: '/immagini/7.png', corretto: false, row: 1, col: 5 },
  { src: '/immagini/4.png', corretto: false, row: 1, col: 7 },
  { src: '/immagini/5.png', corretto: false, row: 2, col: 2 },
  { src: '/immagini/6.png', corretto: false, row: 2, col: 4 },
  { src: '/immagini/3.png', corretto: true,  row: 2, col: 6 },
]

function click(corretto: boolean) {
  if (corretto) {
    game.addWord('ORA')
    router.push('/')
  } else {
    errore.value = true
  }
}
</script>

<template>
  <div class="bagnorosa-page">
    <TimerBar />

    <main class="bagnorosa-main">
      <BackButton />

      <div class="titolo-bagnorosa">BAGNO ROSA</div>

      <div class="testo-bagnorosa">
        <p>
          Jarno per protesta verso la penuria di crocchini ha sabotato l'ordine ricostituito in bagno.
          Moss l'ha visto e stava per urlare MAMMAAAAAAA ma è stato messo a tacere.
          Ovviamente tu sei stato incolpato.
        </p>
        <p>Trova l'intruso prima che scoppi un incidente diplomatico con il Principe.</p>
      </div>

      <div class="skincare-grid">
        <div
          v-for="(prodotto, i) in prodotti"
          :key="i"
          class="prodotto"
          :style="{ gridColumn: prodotto.col, gridRow: prodotto.row }"
          @click="click(prodotto.corretto)"
        >
          <img :src="prodotto.src" />
        </div>
      </div>
    </main>

    <Teleport to="body">
      <div v-if="errore" class="popup-errore" @click.self="errore = false">
        <div class="popup-box">
          <p>No.<br />Quello è davvero un prodotto da bagno, forse Moss sa a cosa serve...</p>
          <button class="popup-btn" @click="errore = false">Torna al Bagno Rosa</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.bagnorosa-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
}

.bagnorosa-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.titolo-bagnorosa {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.testo-bagnorosa {
  width: 900px;
  margin: 0 auto 30px auto;
  text-align: center;
  font-size: 22px;
  line-height: 1.2;
}

.testo-bagnorosa p {
  margin: 0 0 8px 0;
}

.skincare-grid {
  display: grid;
  grid-template-columns: repeat(7, 200px);
  grid-template-rows: repeat(2, 200px);
  gap: 10px;
  justify-content: center;
}

.prodotto {
  width: 200px;
  height: 200px;
  border: 2px solid #444;
  border-radius: 8px;
  transition: 0.2s;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.prodotto:hover {
  border-color: #e83839;
  transform: scale(1.04);
}

.prodotto img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.popup-errore {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-box {
  background: black;
  border: 2px solid #e83839;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 480px;
  font-size: 20px;
  line-height: 1.4;
  color: white;
}

.popup-box p {
  margin: 0 0 20px 0;
}

.popup-btn {
  padding: 10px 20px;
  border: 2px solid #e83839;
  border-radius: 8px;
  color: #e83839;
  background: none;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: 0.25s;
}

.popup-btn:hover {
  background: #e83839;
  color: white;
  transform: scale(1.05);
}
</style>
