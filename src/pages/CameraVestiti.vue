<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import TimerBar from '@/components/TimerBar.vue'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const game = useGameStore()

const outfit = ref(1)

const outfitSrc = computed(() => {
  const map: Record<number, string> = {
    1: '/immagini/nudo.png',
    2: '/immagini/outfit1.png',
    3: '/immagini/outfit2.png',
    4: '/immagini/outfit3.png',
  }
  return map[outfit.value]
})

const popupErrore = ref(false)
const popupVittoria = ref(false)

function cambiaVestiti() {
  outfit.value = outfit.value >= 4 ? 1 : outfit.value + 1
}

function conferma() {
  if (outfit.value === 4) {
    popupVittoria.value = true
  } else {
    popupErrore.value = true
  }
}

function tornaACasa() {
  game.addWord('I TUOI')
  router.push('/')
}
</script>

<template>
  <div class="vestiti-page">
    <TimerBar />

    <main class="vestiti-main">
      <BackButton />

      <div class="titolo-vestiti">CAMERA VESTITI</div>

      <div class="testo-vestiti">
        Ok che devi scappare, però forse prima dovresti vestirti, non credi?<br />
        Scegli i vestiti giusti...quali saranno?
      </div>

      <div class="dressup-stage">
        <img :src="outfitSrc" class="outfit-img" />
      </div>

      <div class="dressup-controls">
        <button class="dressup-btn" @click="cambiaVestiti">Cambia vestiti</button>
        <button class="dressup-btn" @click="conferma">Conferma</button>
      </div>
    </main>

    <Teleport to="body">
      <div v-if="popupErrore" class="popup-overlay" @click.self="popupErrore = false">
        <div class="popup-box">
          <div class="popup-text">Sei molto carino ma forse non sono i vestiti giusti</div>
          <button class="popup-btn" @click="popupErrore = false">Riprova</button>
        </div>
      </div>

      <div v-if="popupVittoria" class="popup-overlay">
        <div class="popup-box">
          <div class="popup-text">
            Non era difficile... bastava fossero I TUOI<br /><br />
            <strong>Nuova parola sbloccata: I TUOI</strong>
          </div>
          <button class="popup-btn" @click="tornaACasa">Torna a casa</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.vestiti-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
}

.vestiti-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.titolo-vestiti {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.testo-vestiti {
  max-width: 900px;
  margin: 0 auto 20px auto;
  text-align: center;
  font-size: 22px;
  line-height: 1.2;
}

.dressup-stage {
  position: relative;
  width: 300px;
  height: 380px;
  margin: 0 auto 16px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outfit-img {
  width: 300px;
  height: 300px;
  object-fit: contain;
  display: block;
}

.dressup-controls {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.dressup-btn {
  display: inline-block;
  background: #e83839;
  color: white;
  border: 2px solid #e83839;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: 0.2s;
}

.dressup-btn:hover {
  background: #c92f30;
}

.popup-overlay {
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
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  width: 420px;
}

.popup-text {
  font-size: 20px;
  color: white;
  line-height: 1.3;
  margin-bottom: 20px;
}

.popup-btn {
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #e83839;
  border-radius: 10px;
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
