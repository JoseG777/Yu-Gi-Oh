<template>

    <div class = "container">
        
        <button @click = "findCharacters"> Start </button>

        <div v-if = "!GameOver"> 

        <h2> What card matches this description? </h2>

        <h2 v-if = "!firstCorrect"> {{ firstQuestion }} </h2>
        <h2 v-if = "firstCorrect && !secondCorrect"> {{ secondQuestion }} </h2>
        <h2 v-if = "secondCorrect && !thirdCorrect"> {{ thirdQuestion }} </h2>
        <h2 v-if = "thirdCorrect"> {{ fourthQuestion }} </h2>
        <input v-model="answer" type="text">
        <br>
        <button @click = "submitAnswer"> Match </button>

        </div>
    </div>

</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default{
    setup() {
      
      const answer = ref('')
      const firstQuestion = ref('')
      const secondQuestion = ref('')
      const thirdQuestion = ref('')
      const fourthQuestion = ref('')

      const firstAnswer = ref('')
      const secondAnswer = ref('')
      const thirdAnswer = ref('')
      const fourthAnswer = ref('')
      
      const firstCorrect = ref(false);
      const secondCorrect = ref(false);
      const thirdCorrect = ref(false);
      const fourthCorrect = ref(false);
      const GameOver = ref(false);

      const findCharacters = async () => {
        const response1 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
        firstQuestion.value = response1.data.desc
        firstAnswer.value = response1.data.name

        const response2 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
        secondQuestion.value = response2.data.desc
        secondAnswer.value = response2.data.name

        const response3 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
        thirdQuestion.value = response3.data.desc
        thirdAnswer.value = response3.data.name

        const response4 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
        fourthQuestion.value = response4.data.desc
        fourthAnswer.value = response4.data.name
      }
      
      function submitAnswer(){
        if(answer.value.toLowerCase() == firstAnswer.value.toLowerCase()){
            firstCorrect.value = true;
        }
        else if(answer.value.toLowerCase() == secondAnswer.value.toLowerCase())
        {
            secondCorrect.value = true;
        }
        else if(answer.value.toLowerCase() == thirdAnswer.value.toLowerCase())
        {
            thirdCorrect.value = true;
        }
        else if(answer.value.toLowerCase() == fourthAnswer.value.toLowerCase())
        {
            fourthAnswer.value = true;
        }
        else
        {
            GameOver.value = true;
        }
      }

      return { 
        firstQuestion,
        firstAnswer,
        secondQuestion,
        secondAnswer,
        thirdQuestion,
        thirdAnswer,
        fourthQuestion,
        fourthAnswer,
        firstCorrect,
        secondCorrect,
        thirdCorrect,
        fourthCorrect,
        answer,
        GameOver,
        findCharacters,
        submitAnswer
      }
    }
}

</script>

<style>
  .container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
