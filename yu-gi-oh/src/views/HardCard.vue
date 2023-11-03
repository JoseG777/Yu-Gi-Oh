<template>

    <div class = "container">
        
        <button v-if = "!gameStarted" @click = "findCharacters"> Begin </button>

        <div v-if = "gameStarted && !Win && !Lose"> 

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
    components: {
    
    },
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
      
      const loadFirst = ref(true)
      const loadSecond = ref(false);
      const loadThird = ref(false);
      const loadFourth = ref(false);

      const firstCorrect = ref(false);
      const secondCorrect = ref(false);
      const thirdCorrect = ref(false);
      const fourthCorrect = ref(false);
      const Lose = ref(false);
      const Win = ref(false);
      const gameStarted = ref(false);

      const findCharacters = async () => {
        if(!gameStarted.value)
        {
          gameStarted.value = true;
        }
        if(loadFirst.value)
        {
            const response1 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
            firstQuestion.value = response1.data.desc
            firstAnswer.value = response1.data.name
        }
        else if(loadSecond.value)
        {
            const response2 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
            secondQuestion.value = response2.data.desc
            secondAnswer.value = response2.data.name
        }
        else if(loadThird.value)
        {
            const response3 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
            thirdQuestion.value = response3.data.desc
            thirdAnswer.value = response3.data.name
        }
        else if(loadFourth.value)
        {
            const response4 = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
            fourthQuestion.value = response4.data.desc
            fourthAnswer.value = response4.data.name
        }
      }
      
      function submitAnswer(){
        if(answer.value.toLowerCase() == firstAnswer.value.toLowerCase()){
            firstCorrect.value = true;
            loadFirst.value = false;
            loadSecond.value = true;
            findCharacters();
        }
        else if(answer.value.toLowerCase() == secondAnswer.value.toLowerCase())
        {
            secondCorrect.value = true;
            loadSecond.value = false;
            loadThird.value = true;
            findCharacters();
        }
        else if(answer.value.toLowerCase() == thirdAnswer.value.toLowerCase())
        {
            thirdCorrect.value = true;
            loadThird.value = false;
            loadFourth.value = true;
            findCharacters();
        }
        else if(answer.value.toLowerCase() == fourthAnswer.value.toLowerCase())
        {
            fourthCorrect.value = true;
            Win.value = true;
        }
        else
        {
            Lose.value = true;
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
        Lose,
        Win,
        gameStarted,
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
