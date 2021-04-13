"use strict";

const app = new Vue({
    el: "#app",
    data: {
        baseUrl: "https://api.themoviedb.org/3/",
        apiKey: "837fe6873adf73088b3b213a4902260e",
        userInput: "",
        tvTitles: [],
        flags: ["de", "en", "es", "fr", "it", "ja", "ko", "nl", "pl", "pt", "ru", "zh"],
        maxRating: 5,
        navSections: ["Home", "Movies", "TV Series"],
        sectionSelected: "Home"
    },
    methods: {
        // Method to search Movies and TV series
        search() {
            // Movies
            axios.get(this.baseUrl + "search/movie", {
                params: {
                    api_key: this.apiKey,
                    query: this.userInput
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
            });

            // TV series
            axios.get(this.baseUrl + "search/tv", {
                params: {
                    api_key: this.apiKey,
                    query: this.userInput
                }
            }).then((response) => {
                this.tvTitles = [...this.tvTitles, ...response.data.results];
            });

            // Clearing user input after searching
            this.userInput = "";
        },
        // Method to display daily trending Movies & TV series
        trending() {
            axios.get(this.baseUrl + "trending/all/day", {
                params: {
                    api_key: this.apiKey,
                }
            }).then((response) => this.tvTitles = response.data.results);
        },
        // Method to search for most popular Movies
        searchPopularMovies() {
            axios.get(this.baseUrl + "movie/popular", {
                params: {
                    api_key: this.apiKey
                }
            }).then((response) => this.tvTitles = response.data.results);
        },
        // Method to search for most popular TV series
        searchPopularTvSeries() {
            axios.get(this.baseUrl + "tv/popular", {
                params: {
                    api_key: this.apiKey
                }
            }).then((response) => this.tvTitles = response.data.results);
        },
        // Method to access navbar menu sections
        selectSection(section) {
            this.sectionSelected = section;

            // Selecting sections
            switch(this.sectionSelected) {
                // Home
                case this.navSections[0]:
                    this.trending();
                break;

                // Movies
                case this.navSections[1]:
                    this.searchPopularMovies();
                break;

                // TV series
                case this.navSections[2]:
                    this.searchPopularTvSeries();
                break;
            }
        },
        // Method to display flags (languages)
        displayFlags(str) {
            return `img/flags/${str}.svg`;
        },
        // Method to round up the original x/10 to a x/5 rating
        roundRating(num) {
            return num = Math.ceil(num / 2);
        }   
    },
    mounted(){
        // Displaying daily trending titles by default
        this.trending();
    }
});