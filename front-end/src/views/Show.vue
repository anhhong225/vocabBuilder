<template>
    <div>
      <h1>Show Word</h1>
      <div class="ui labeled input fluid"><!---display English word-->
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly  :value="word.english"/><!-- Read-only input to display the English word -->
      </div>
      <div class="ui labeled input fluid"><!---display German word-->
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly  :value="word.german"/><!-- Read-only input to display the German word -->
      </div>
      <div class="ui labeled input fluid"><!--display the Vietnamese word -->
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
        <input type="text" readonly  :value="word.vietnamese"/><!-- Read-only input to display the Vietnamese word -->
      </div>
      <div class="actions">
        <!--router-link to the edit page, passing the word ID as a parameter-->
        <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
          Edit word
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';//Import API helper functions for making requests

  export default {
    name: 'show',//component name
    data() {
      return {
        word: '' //empty string to store data
      };
    },
    async mounted() {
      //Fetch the word details from the API using the ID from the route parameters
      this.word = await api.getWord(this.$route.params.id);
    }
  };
  </script>
  
  <style scoped>
  .actions a {/*style for action link*/
    display: block; /*display as a block*/
    text-decoration: underline; /*underline text*/
    margin: 20px 10px;
  }
  </style>