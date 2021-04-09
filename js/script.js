"use strict";

// API Key
const apiKey = "837fe6873adf73088b3b213a4902260e";

const app = new Vue({
    el: "#app",
    data: {
        userInput: "",
        movies: []
    },
    methods: {
        search() {
            axios.get("https://api.themoviedb.org/3/search/movie?", {
                params: {
                    api_key: apiKey,
                    query: this.userInput
                }
            }).then((response) => {
                this.movies = response.data.results;
                console.log(this.movies);
            });

            this.userInput = "";
        }
    },
    mounted(){

    }
});