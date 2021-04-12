"use strict";

// Base URL
const baseUrl = "https://api.themoviedb.org/3/"
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
    mounted(){
        // Displaying daily trending titles by default
        this.trending();
        },
    methods: {
        // Method to display daily trending Movies & TV series
        trending() {
            axios.get(baseUrl + "trending/all/day", {
                params: {
                    api_key: apiKey,
                }
            }).then((response) => this.tvTitles = response.data.results);
        },
        // Method to search Movies and TV series
        search() {
            // Movies
            axios.get(baseUrl + "search/movie", {
                params: {
                    api_key: apiKey,
                    query: this.userInput
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
            });

            // TV series
            axios.get(baseUrl + "search/tv", {
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
    }
});