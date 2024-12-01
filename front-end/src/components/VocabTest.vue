<template>
  <div><!--display score-->
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>
    <form action="#" @submit.prevent="onSubmit"> <!--a form for testing-->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div><!--read-only text for German-->
        <input type="text" readonly :disabled="testOver" :value="currWord.german"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnames
        </div>
        <input type="text" placeholder="Enter word..." v-model="vietnamese" :disabled="testOver" autocomplete="off" />
      </div>
      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="['results', resultClass]"><!--display result feedback-->
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {//Randomly shuffle words for the test
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      incorrectGuesses: [],//Track incorrect guesses
      result: '',//Store result feedback message
      resultClass: '',//Store style for the result message
      english: '', //Model for the English word input
      vietnamese: '',//Model for the Vietnamese word input
      score: 0,
      testOver: false //Flag indicating if the test is over
    };
  },
  computed: {
    currWord: function() { //get the current word to check
      return this.randWords.length ? this.randWords[0] : '';//Return the first word or an empty string if none left
    }
  },
  methods: {
    onSubmit: function() {//Handle submission
      // Check if the English and Vietnamese answer are correct
      if (this.english.toLowerCase() === this.currWord.english.toLowerCase() && this.vietnamese.toLowerCase() === this.currWord.vietnamese.toLowerCase()) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord.german); //track incorrect answer
      }
      //Reset input fields  
      this.english = '';
      this.vietnamese = '';
      this.randWords.shift(); //remove tested word from array 

      if (this.randWords.length === 0) { //check if all words are tested
        this.testOver = true; //make flag test is over
        this.displayResults(); //display result
      }
    },
    displayResults: function() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    }
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>