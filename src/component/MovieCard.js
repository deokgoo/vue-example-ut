import Vue from 'vue';
import { getToken, getMovieRanking } from '../service/movieApi.js';

 const MovieCard = Vue.component('movie-card', {
  template: `
    <div class="movie-card">
      <button @click="callApi">get rank</button>
    </div>
  `,
  data() {
    return { 
      movieData: {}
    }
  },
  methods: {
    async callApi() {
      const tokenApi = await getToken();
      const token = tokenApi.data;
      const movieRankApi = await getMovieRanking(token);
      const movieRank = movieRankApi.data.results;

      this.movieData = movieRank;
    }
  }
});

export default MovieCard;