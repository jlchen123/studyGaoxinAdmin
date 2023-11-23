<template>
<div style="height: 91vh;">
   <online></online>
    <div style="height: 20px;"></div>
   <history></history>
   <div style="height: 20px;"></div>
   <period></period>
   <div style="height: 20px;"></div>
   <hot></hot>
   <div style="height: 20px;"></div>
   <ranking></ranking>
</div>
</template>
<script setup lang="ts">
import online from './online.vue';
import period from './period.vue'
import history from './history.vue';
import hot from './hot.vue';
import ranking from './ranking.vue';
</script>