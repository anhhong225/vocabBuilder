<template>
    <div>
        <h1>Edit Word</h1>
        <!--include the WordForm component, bind the 'word' object, and handle createOrUpdate event -->
        <word-form @createOrUpdate="createOrUpdate" :word="this.word"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';//Import WordForm component
import { api } from '../helpers/helpers';//import api helper

export default {
    name: 'edit', //component name: edit
    components: {
        'word-form': WordForm //Register the WordForm component to word-form
    },
    data: function(){
        return {
            word: {} //initialize the 'word' object to hold the data
        };
    },
    async mounted() {
        // Fetch the word data using the ID from the route parameters and assign it to the 'word' object
        this.word = await api.getWord(this.$route.params.id);
    },
    methods: {
        createOrUpdate: async function(word) {//a method to handle updating a word
            await api.updateWord(word); // Call the API to update the word with the provided data
            this.flash('Word updated sucessfully!', 'success'); //show flah message
            this.$router.push(`/words/${word._id}`);//redirect to the word page after updating successfully
        }
    }
};
</script>