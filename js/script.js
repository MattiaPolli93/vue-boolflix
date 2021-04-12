"use strict";

// Base URL
const baseUrl = "https://api.themoviedb.org/3/search/"
// API Key
const apiKey = "837fe6873adf73088b3b213a4902260e";
// Flags
const flagSeries = ["de", "en", "es", "fr", "it", "ja", "nl", "pl", "pt", "ru"];

const app = new Vue({
    el: "#app",
    data: {
        userInput: "",
        tvTitles: [],
        flags: [...flagSeries]
    },
    methods: {
        // Method to search Movies and TV series
        search() {
            // Movies
            axios.get(baseUrl + "movie", {
                params: {
                    api_key: apiKey,
                    query: this.userInput
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
            });

            // TV series
            axios.get(baseUrl + "tv", {
                params: {
                    api_key: apiKey,
                    query: this.userInput
                }
            }).then((response) => {
                this.tvTitles = [...this.tvTitles, ...response.data.results];
            });

            // Clearing user input after searching
            this.userInput = "";
        },
        // Method to display flags (languages)
        displayFlags(str) {
            return `img/flags/${str}.svg`;
        }
    },
    mounted(){

    }
});