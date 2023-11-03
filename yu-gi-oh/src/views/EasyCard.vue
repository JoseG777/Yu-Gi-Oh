<template>
  <div class="quiz">
    <button @click="getQuestion">Get Question</button>
    <h1> Which card matches the following description:</h1>
    <h2>{{ question }}</h2>
    <ul>
      <li @click="checkAnswer(option1)">{{ option1 }}</li>
      <li @click="checkAnswer(option2)">{{ option2 }}</li>
      <li @click="checkAnswer(option3)">{{ option3 }}</li>
      <li @click="checkAnswer(option4)">{{ option4 }}</li>
    </ul>
    <div v-if="showResult">
      <p>{{ resultMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const types = ref([
      'Skill Card',
      'Spell Card',
      'Trap Card',
      'Normal Tuner Monster',
      'Effect Monster',
      'Tuner Monster',
      'Flip Effect Monster',
      'Union Effect Monster',
      'Gemini Monster',
      'Pendulum Effect Monster',
      'Pendulum Normal Monster',
      'Ritual Monster',
      'Ritual Effect Monster',
      'Toon Monster',
      'Fusion Monster',
      'Synchro Monster',
      'XYZ Monster',
    ]);

    const option1 = ref('');
    const option2 = ref('');
    const option3 = ref('');
    const option4 = ref('');
    const question = ref('');
    const correctAnswer = ref('');
    const showResult = ref(false);
    const resultMessage = ref('');
    const chosenType = ref('');

    const getQuestion = async () => {
      try {
        showResult.value = false;
        chosenType.value = types.value[Math.floor(Math.random() * types.value.length)];
        const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${chosenType.value}`);
        const data = response.data.data;
        let x = Math.floor(Math.random() * data.length);
        question.value = data[x].desc;
        correctAnswer.value = data[x].name;
        const options = [
          option1.value = data[x].name,
          data[Math.floor(Math.random() * data.length)].name,
          data[Math.floor(Math.random() * data.length)].name,
          data[Math.floor(Math.random() * data.length)].name,
        ];
        options.sort(() => Math.random() - 0.5); // Shuffle options
        option1.value = options[0];
        option2.value = options[1];
        option3.value = options[2];
        option4.value = options[3];
      } catch (error) {
        console.error(error);
      }
    };

    const checkAnswer = (selectedOption) => {
      if (selectedOption === correctAnswer.value) {
        resultMessage.value = 'Correct!';
      } else {
        resultMessage.value = 'Incorrect. The correct answer is: ' + correctAnswer.value;
      }
      showResult.value = true;
    };

    return {
      types,
      chosenType,
      question,
      option1,
      option2,
      option3,
      option4,
      showResult,
      resultMessage,
      getQuestion,
      checkAnswer,
    };
  },
};
</script>

<style>
.quiz {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.quiz ul {
  list-style: none;
  padding: 0;
}
.quiz li {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px;
  transition: background-color 0.3s;
}
.quiz li:hover {
  background-color: #f0f0f0;
}
</style>
