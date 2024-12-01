<template>
  <form action="#" @submit.prevent="onSubmit"> <!--Prevent default form submission-->
     <!--Error message displayed if validation fails-->
    <p v-if="errorsPresent" class="error">Please fill out all fields!</p>
     <div class="ui labeled input fluid"> <!--Input field for English-->
       <div class="ui label">
         <i class="united kingdom flag"></i> English
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.english" /> <!-- Binds input to word.english -->
     </div>
      <!--Input field for German-->
     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="germany flag"></i> German
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.german" /><!-- Binds input to word.german -->
     </div>
     <!--Input field for Vietnamese-->
     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="vietnam flag"></i> Vietnamese
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.vietnamese" /><!-- Binds input to word.vietnamese -->
     </div>
     <button class="positive ui button">Submit</button><!--Submit button-->
   </form>
 </template>
 
 <script>
 export default {
   name: 'word-form', //component name is word-form
   props: { //properties to accept a word object from parent
     word: {
       type: Object, //type of word
       required: false,
       default: () => { //Default object structure if no word is passed
        return {
          english: '',
          german: '',
          vietnamese: '',
        };
       }
     }
   },
   data() {
     return {
       errorsPresent: false //for tracking is validation errors
     };
   },
   methods: {
     onSubmit: function() { 
       if (this.word.english === '' || this.word.german === '' ||  this.word.vietnamese === ''){
        this.errorsPresent = true;//Set error flag if any field is empty
       }else {
        this.errorsPresent = false;//clear error flag
        this.$emit('createOrUpdate', this.word);//Emit the word object to the parent component
       }
     }
   }
 };
 </script>
 <!-- Styling for the error message -->
 <style scoped>
 .error {
   color: red;
 }
 </style>