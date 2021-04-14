"use strict";

// Re-create a Netflix-like UI with Vue.js

const app = new Vue({
    el: "#app",
    data: {
        baseUrl: "https://api.themoviedb.org/3/",
        apiKey: "837fe6873adf73088b3b213a4902260e",
        userInput: "",
        inputParams: "",
        tvTitles: [],
        navSections: ["Home", "Trending", "Movies", "TV Series", "Discover"],
        sectionSelected: "Home",
        otherSection: "",
        flags: ["de", "en", "es", "fr", "it", "ja", "ko", "nl", "pl", "pt", "ru", "zh"],
        maxRating: 5,
        pagesIndex: 1,
        totalPages: null
    },
    methods: {
        // Method to search Movies and TV series
        search() {
            // Enabling no nav menu section to be selected before searching (to display input parameters)
            this.sectionSelected = "";

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

            // Storing user input
            this.inputParams = this.userInput;

            // Clearing user input after searching
            this.userInput = "";
        },
        // Method to display daily trending Movies & TV series
        trendingDaily() {
            axios.get(this.baseUrl + "trending/all/day", {
                params: {
                    api_key: this.apiKey,
                    page: this.pagesIndex
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
                this.totalPages = response.data.total_pages;
            });
        },
        // Method to display weekly trending Movies & TV series
        trendingWeekly() {
            axios.get(this.baseUrl + "trending/all/week", {
                params: {
                    api_key: this.apiKey,
                    page: this.pagesIndex
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
                this.totalPages = response.data.total_pages;
            });
        },
        // Method to search for most popular Movies
        searchPopularMovies() {
            axios.get(this.baseUrl + "movie/popular", {
                params: {
                    api_key: this.apiKey,
                    page: this.pagesIndex
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
                this.totalPages = response.data.total_pages;
            });
        },
        // Method to search for most popular TV series
        searchPopularTvSeries() {
            axios.get(this.baseUrl + "tv/popular", {
                params: {
                    api_key: this.apiKey,
                    page: this.pagesIndex
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
                this.totalPages = response.data.total_pages;
            });
        },
        // Method to display the "Discover" section
        discoverTitles() {
            // Movies
            axios.get(this.baseUrl + "discover/movie", {
                params: {
                    api_key: this.apiKey,
                    page: this.pagesIndex
                }
            }).then((response) => {
                this.tvTitles = response.data.results;
                this.totalPages = response.data.total_pages;
            });

            // TV series
            axios.get(this.baseUrl + "discover/tv", {
                params: {
                    api_key: this.apiKey,
                    page: this.pagesIndex
                }
            }).then((response) => {
                this.tvTitles = [...this.tvTitles, ...response.data.results];
                this.totalPages = response.data.total_pages;
            });
        },
        // Method to access navbar menu sections
        selectSection(section) {
            // Resetting to first page when selecting other sections
            this.otherSection = this.sectionSelected;
            this.sectionSelected = section;
            (this.otherSection !== this.sectionSelected) ? this.pagesIndex = 1 : "";
            
            // Selecting sections
            switch(this.sectionSelected) {
                // Home
                case this.navSections[0]:
                    this.trendingWeekly();
                break;

                // Trending
                case this.navSections[1]:
                    this.trendingDaily();
                break;

                // Movies
                case this.navSections[2]:
                    this.searchPopularMovies();
                break;

                // TV series
                case this.navSections[3]:
                    this.searchPopularTvSeries();
                break;

                // Discover
                case this.navSections[4]:
                    this.discoverTitles();
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
        },
        // Method to access the previous page
        prevPage(section) {
            if (this.pagesIndex === 1) {
                return
            }
            
            // Decreasing page index
            this.pagesIndex--;
            
            // Staying on the section selected
            this.selectSection(section);
        },
        // Method to access the following page
        nextPage(section) {
            if (this.pagesIndex === this.totalPages) {
                return
            }

            // Increasing page index
            this.pagesIndex++;

            // Staying on the section selected
            this.selectSection(section);
        }
    },
    mounted(){
        // Displaying weekly trending titles by default
        this.trendingWeekly();
    }
});