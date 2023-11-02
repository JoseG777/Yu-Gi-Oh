<template>

  <div class = "app"> 
    <Choose />
  </div>

  <router-view />
</template>

<script setup>
import Choose from "./components/DifficultyChoice.vue";
</script>

<style>

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} 

</style>
