<script setup lang="ts">
import Room from '@/components/Room.vue'
import TimerBar from '@/components/TimerBar.vue'
import Npc from '@/components/Npc.vue'

</script>

<template>
  <div class="casa-page">
    <TimerBar />

    <main class="casa-main">
      <div class="planimetria-casa">
        <div class="stanza cucina">      <Room name="CUCINA"         word="EMA"    route="cucina" /></div>
        <div class="stanza salotto">     <Room name="SALOTTO"        word="APRI"   route="salotto" /></div>
        <div class="stanza bagno-rosa">  <Room name="BAGNO ROSA"     word="ORA"    route="bagno-rosa" /></div>
        <div class="stanza vestiti">     <Room name="CAMERA VESTITI" word="I TUOI" route="camera-vestiti" /></div>
        <div class="stanza camera">      <Room name="CAMERA"         word="TANTI"  route="camera" /></div>
        <div class="stanza bagno-gatti"> <Room name="BAGNO GATTI"    word="REGALI" route="bagno-gatti" /></div>
        <div class="stanza studio">      <Room name="STUDIO"         word="AUGURI" route="studio" /></div>
        <div class="stanza porta">       <Room name="PORTA" /></div>
      </div>
    </main>

    <Npc character="moss" />
    <Npc character="jarno" />
  </div>
</template>

<style scoped>
.casa-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: black;
}

.casa-main {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hud-parole {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 100;
  padding: 8px 12px;
  border: 2px solid #e83839;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  font-size: 16px;
  color: white;
  font-family: 'Courier New', monospace;
}

.planimetria-casa {
  position: relative;
  width: 1000px;
  height: 620px;
}

.stanza {
  position: absolute;
}

.cucina      { top: 0;     left: 0;     width: 260px; height: 420px; }
.salotto     { top: 440px; left: 0;     width: 340px; height: 160px; }
.bagno-rosa  { top: 0;     left: 280px; width: 220px; height: 200px; }
.vestiti     { top: 0;     left: 520px; width: 130px; height: 200px; }
.camera      { top: 0;     left: 670px; width: 300px; height: 260px; }
.bagno-gatti { top: 280px; left: 710px; width: 260px; height: 140px; }
.studio      { top: 440px; left: 520px; width: 450px; height: 160px; }
.porta       { top: 440px; left: 360px; width: 140px; height:  70px; }
</style>
