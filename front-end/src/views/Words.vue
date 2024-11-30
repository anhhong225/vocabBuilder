<template>
    <div>
        <h1>Words Extra</h1>
        <!--a table to display words-->
        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>Vietnamese</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in words" :key="i"><!--for loop-->
                <td>{{ word.english }}</td>
                <td>{{ word.german }}</td>
                <td>{{ word.vietnamese }}</td>
                <td width="75" class="center aligned">
                    <!-- Link to the 'Show' page for the specific word -->
                    <router-link :to="{name: 'show', params: {id: word._id}}">Show</router-link></td>
                <td width="75" class="center aligned">
                    <!-- Link to the 'Edit' page for the specific word -->
                    <router-link :to="{name: 'edit', params: {id: word._id}}">Edit</router-link>
                </td>
                <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                    <!-- 'Destroy' action link-->
                    <a :href="`/words/${word._id}`">Destroy</a></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
    name: 'words', //componetnt name
    data() {
        return {
            words: [] //Initialize `words` as an empty array to store the word list
        };
    },
    methods: {
        async onDestroy(id) { //method to delete a word by ID
            const sure = window.confirm('Are you sure?'); //show confirm dialog
            if(!sure) return; //If the user cancels, exit the method
            await api.deleteWord(id); //Call the API to delete the word
            this.flash('Word deleted successfully!', 'success'); //display flash message
            const newWords = this.words.filter(word => word._id !== id); //filtered  out the deleted word
            this.words = newWords; //update words list
        }
    },
    async mounted() {
        //Fetch the list of words from the API when the component is mounted
        this.words = await api.getWords();
    }
};
</script>