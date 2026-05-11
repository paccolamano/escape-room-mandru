<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  character: 'moss' | 'jarno'
}>()

const config = {
  moss: {
    image: '/immagini/moss.png',
    label: 'Parla con Moss',
    dialogs: [
      'Non osare toccarmi, sono un Prrrrincipeeee',
      'Vuoi portarmi da Fabio Balsamo? TANATOSI',
      'Guarda le mie regali pallette pelose',
    ],
  },
  jarno: {
    image: '/immagini/jarno.png',
    label: 'Parla con Jarno',
    dialogs: [
      'Umano di scorta, mi dai dei crocchini?',
      'Forse in cambio di un tonnino potrei pure aiutarti...',
      'DAMMI IL TONNINOOOOO',
    ],
  },
}

const npc = computed(() => config[props.character])
const isOpen = ref(false)
const dialog = ref('')

function open() {
  const options = npc.value.dialogs
  dialog.value = options[Math.floor(Math.random() * options.length)] ?? ''
  isOpen.value = true
}
</script>

<template>
  <div class="npc-side" :class="`npc-${character}`">
    <img :src="npc.image" class="npc-img" />
    <button class="npc-btn" @click="open">{{ npc.label }}</button>
  </div>

  <Teleport to="body">
    <div v-if="isOpen" class="npc-popup" @click.self="isOpen = false">
      <div class="npc-box">
        <p>{{ dialog }}</p>
        <button class="npc-close" @click="isOpen = false">Chiudi</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.npc-side {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
}

.npc-moss {
  left: 0;
}

.npc-jarno {
  right: 40px;
}

.npc-img {
  width: 300px;
}

.npc-btn {
  color: #e83839;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 22px;
  font-family: Georgia, serif;
  display: block;
  text-align: center;
  padding: 0;
  margin-top: 4px;
}

.npc-popup {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.npc-box {
  background: black;
  border: 2px solid #e83839;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  color: white;
  font-size: 18px;
}

.npc-box p {
  margin: 0 0 0 0;
}

.npc-close {
  display: inline-block;
  background: #e83839;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid #e83839;
  cursor: pointer;
  margin-top: 14px;
  font-family: Georgia, serif;
  font-size: 16px;
}
</style>
