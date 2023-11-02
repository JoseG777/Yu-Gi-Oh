<template>
    <div class = "searching">
      <input v-model="searchedCharacter" type="text">
      <br>
      <br>
      <button @click="findCharacter">Find Character</button>
      <h1>{{ character }}</h1>
      <br>
      <h1> {{ characterData }}</h1>
      <p v-if="error">{{ error }}</p>  
    </div>
</template>
  
<script>
  import axios from 'axios'
  import { ref } from 'vue'
  
  export default {
    //name: 'FindCard',
    setup() {
      const searchedCharacter = ref('')
      const characterData = ref('')
      const character = ref('')
      const error = ref('')
  
      const findCharacter = async () => {
        try 
        {
          error.value = '' // Clearing previous error message if any
          const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', {
            params: 
            {
              name: searchedCharacter.value // Finding the specific character
            }
          })
          character.value = response.data.data[0].name //returns name
          characterData.value = response.data.data[0].desc //returns description
        } 
        catch (e) 
        {
          character.value = ''
          error.value = `Character not found: ${searchedCharacter.value}`
        }
      }
  
      return { 
        searchedCharacter, 
        character,
        characterData,
        findCharacter, 
        error
      }
    }
  }
</script>
  
<style>
  .searching {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
  