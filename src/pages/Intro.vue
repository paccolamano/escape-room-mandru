<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const game = useGameStore()

function esplora() {
  game.startGame()
  router.push('/')
}
</script>

<template>
  <div class="tpl-intro">
    <div class="intro-testo">
      <p>
        È sabato sera, Anna assente, tu vorresti solo uscire a bere l'ultima come il caro Charles White,
        ma mentre eri indaffarato ad aggirarti senza meta per casa ascoltando l'ennesimo documentario su Hitler con le cuffie,
        è scoppiato il panico al 120 di via Ramera:
      </p>
      <p>
        • la casa ha sviluppato una coscienza e ha iniziato a cambiare colore alle pareti a caso,<br />
        • Moss si è auto proclamato legittimo proprietario dell'appartamento e di ciò che contiene,<br />
        • Jarno ha provato a venderti al miglior offerente con base d'asta di tre crocchini e mezzo.
      </p>
      <p>E la porta principale non intende più farti uscire perché si sente maltrattata.</p>
      <p>
        Per sopravvivere al delirio dovrai recuperare le parole sparse nelle stanze.<br />
        Solo pronunciando la frase completa potrai uscire.
      </p>
      <p>Hai 30 minuti prima che la porta vada in crisi definitivamente.</p>
    </div>

    <div class="intro-btn" @click="esplora">ESPLORA LA CASA</div>
  </div>
</template>

<style scoped>
.tpl-intro {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
  background: black;
  color: white;
  font-family: Georgia, serif;
}

.intro-testo {
  max-width: 900px;
  font-size: 22px;
  line-height: 1.25;
  color: white;
  margin-bottom: 25px;
  text-align: center;
}

.intro-testo p {
  margin: 0 0 12px 0;
}

.intro-btn {
  font-size: 26px;
  cursor: pointer;
  color: white;
  border: 2px solid #e83839;
  padding: 14px 22px;
  border-radius: 10px;
  display: inline-block;
  transition: 0.25s;
  user-select: none;
}

.intro-btn:hover {
  color: white;
  background: #e83839;
  transform: scale(1.05);
}
</style>
