<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function start() {
  router.push('/intro')
}
</script>

<template>
  <main class="start-body">
    <div class="start-overlay" />

    <div class="start-contenuto">
      <div class="start-titolo">
        SCAPPA<br />
        DA QUESTA<br />
        CASA
      </div>

      <div class="start-menu">
        <div class="start-bottone" @click="start">NEW GAME</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes glitch {
  0% {
    transform: translateX(0px);
  }

  20% {
    transform: translateX(-3px);
  }

  40% {
    transform: translateX(3px);
  }

  60% {
    transform: translateX(-2px);
  }

  80% {
    transform: translateX(2px);
  }

  100% {
    transform: translateX(0px);
  }
}

.start-body {
  position: fixed;
  inset: 0;
  background: black;
  color: white;
  font-family: 'Courier New', monospace;
  overflow: hidden;
}

.start-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}

.start-contenuto {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 40px;
}

.start-titolo {
  font-size: 72px;
  font-family: 'DoctorGlitch', 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 30px;
  animation: glitch 0.3s infinite;
}

.start-menu {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.start-bottone {
  font-family: 'Courier New', monospace;
  font-size: 28px;
  cursor: pointer;
  transition: 0.25s;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid #e83839;
  padding: 18px 28px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  min-width: 220px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  user-select: none;
}

.start-bottone:hover {
  color: white;
  background: #e83839;
  transform: scale(1.05) translateY(-4px);
}
</style>
