<template>
    <div>
        <h1>New Word</h1>
        <!-- Include the WordForm component, bind the 'word' object, and handle createOrUpdate event -->
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>
<script>
import WordForm from '../components/WordForm.vue'; //Import the WordForm component
import { api } from '../helpers/helpers'; //Import API helper functions

export default {
    name: 'new-word',//define the name of component
    components: {
        'word-form': WordForm//WordForm to word-form
    },
    methods: {
        // Method to handle creating a new word
        createOrUpdate: async function(word) {
            const res = await api.createWord(word);//call api to create a new word with the provided word
            this.flash('Word created', 'success');//show a flash message when success
            this.$router.push(`/words/${res._id}`)//redirect the user to the newly created word
        }
    }
};
</script>