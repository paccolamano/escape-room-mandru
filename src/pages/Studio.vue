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
  if (risposta.value.trim().toLowerCase() === 'auguri') {
    game.addWord('AUGURI')
    router.push('/')
  } else {
    errore.value = true
    setTimeout(() => { errore.value = false }, 2000)
  }
}
</script>

<template>
  <div class="studio-page">
    <TimerBar />

    <main class="studio-main">
      <BackButton />

      <div class="titolo-studio">STUDIO</div>

      <div class="testo-studio">
        Jarno e Moss si sono improvvisati segretari per ingraziarti ma hanno scombinato il tuo calendario,
        ora non sai più quali appuntamenti sono veri e quali falsi.
        Se ascolti cosa ti dicono, magari capisci quali appuntamenti cancellare.
        Però attenzione: uno di loro dice sempre la verità, l'altro mente sempre.
        Ma di chi ti puoi fidare?
      </div>

      <div class="studio-layout">
        <div class="colonna-studio">
          <img src="/immagini/moss.png" class="gatto-studio" />
          <div class="msg-studio">
            "Solo alcuni appuntamenti sono veri."<br />
            "Alcune lettere maiuscole formano una parola."<br />
            "Jarno non è affidabile."
          </div>
        </div>

        <div class="centro">
          <img src="/immagini/calendario.png" alt="calendario" />
        </div>

        <div class="colonna-studio">
          <img src="/immagini/jarno.png" class="gatto-studio" />
          <div class="msg-studio">
            "Tutti gli appuntamenti sono veri."<br />
            "Tutte le lettere maiuscole formano una parola."<br />
            "Moss mente."
          </div>
        </div>
      </div>

      <div class="input-studio">
        <div class="label-input-studio">Inserisci la parola giusta</div>
        <input v-model="risposta" type="text" @keyup.enter="conferma" />
        <button class="conferma-btn" @click="conferma">CONFERMA</button>
        <div v-if="errore" class="popup-studio">Parola errata</div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.studio-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
  color: white;
}

.studio-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.titolo-studio {
  font-size: 36px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.testo-studio {
  max-width: 900px;
  margin: 0 auto 20px auto;
  text-align: center;
  font-size: 22px;
  line-height: 1.2;
}

.studio-layout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
}

.colonna-studio {
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.gatto-studio {
  width: 200px;
  transition: 0.25s;
}

.gatto-studio:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 12px #e83839);
}

.msg-studio {
  border: 2px solid #e83839;
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.4;
  text-align: center;
}

.centro {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centro img {
  width: 700px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.input-studio {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 24px;
}

.label-input-studio {
  font-size: 18px;
  color: white;
  margin-bottom: 12px;
}

.input-studio input {
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

.input-studio input:focus {
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

.popup-studio {
  margin-top: 12px;
  padding: 8px 14px;
  border: 2px solid #e83839;
  background: rgba(0, 0, 0, 0.85);
  color: #e83839;
  border-radius: 10px;
  font-size: 16px;
}
</style>
