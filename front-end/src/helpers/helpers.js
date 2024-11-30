import axios from 'axios'; //import for making HTTP request
import Vue from 'vue'; //import Vue framework
import VueFlashMessage from 'vue-flash-message'; //import flash message for Vue
import 'vue-flash-message/dist/vue-flash-message.min.css'; //import css for flash message

Vue.use(VueFlashMessage, { //install VueFlashMessage with option
    messageOptions: {
        timeout: 3000, //appear 3 seconds
        pauseOnInteract: true // Pause the timeout if the user interacts with the message
    }
});

const vm = new Vue(); //create a Vue instance
const baseURL = 'http://localhost:3000/words/'; //Define the base URL for the API endpoints
//function to handle errors in asynchronous functions
const handleError = fn => (...params) => 
    fn(...params).catch(error => {//Catch and log any errors
        console.log(error);//output the error to console
    });
    //Exported `api` object containing methods for interacting with the API
    export const api = {
        getWord: handleError(async id => {//fetch a single word by its ID
            const res = await axios.get(baseURL + id); //GET request to retrieve a word by ID
            return res.data; //return the data from the response
        }),
        getWords: handleError(async () => { //fetch all words
            const res = await axios.get(baseURL);//GET request to retrieve all words
            return res.data; //return the data from the response
        }),
        deleteWord: handleError(async id => { //delete a word by its ID
            const res = await axios.delete(baseURL + id);//a DELETE request to remove a word by ID
            return res.data; //return a data from the response
        }),
        createWord: handleError(async payload => {//create a new word
            const res = await  axios.post(baseURL, payload); //a POST request to add a new  word
            return res.data;//return the data from response
        }),
        updateWord: handleError(async payload => { //Upsate an existing word
            const res = await axios.put(baseURL + payload._id, payload); //a PUT request to update a word by ID
            return res.data; //return a data from the request
        })
    };