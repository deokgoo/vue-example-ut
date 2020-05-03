import * as movieApi from '../src/service/movieApi.js';

describe('movieApi Test', () => {
  it('getToken', async () => {
    const tokenApi = await movieApi.getToken();
    const token = tokenApi.data;
    
    expect(token.length>0).toBe(true);
  }, 50000)

  it('getMovieRank', async () => {
    const tokenApi = await movieApi.getToken();
    const token = tokenApi.data;
    const movieRankApi = await movieApi.getMovieRanking(token);
    const movieRank = movieRankApi.data.results;

    expect(movieRank.length>0).toBe(true);
  }, 50000)
})