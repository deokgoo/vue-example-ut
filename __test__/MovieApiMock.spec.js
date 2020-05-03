import * as movieApi from '../src/service/movieApi.js';
import axios from 'axios';

jest.mock('axios');

describe('movieApi Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('getToken', async () => {
    const mockCallback = axios.mockImplementation(() => {
      return {
        data: 'testToken'
      }
    })

    const expectArgs = {
      headers: { Authorization: 'Basic ZGVvazpkZW9r' },
      method: 'POST',
      url: 'https://movie-nodejs.herokuapp.com/auth/login',
    }

    const tokenApi = await movieApi.getToken();
    const token = tokenApi.data;
    
    expect(mockCallback.mock.calls.length).toEqual(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(expectArgs);
    expect(token).toBe('testToken');
  })

  it('getMovieRank', async () => {
    const TOKEN = 'testToken';
    const MOVIE_RANK = 'movie rank data';
    const mockCallback = axios.mockImplementation(() => {
      return {
        data: { results: MOVIE_RANK}
      }
    })

    const expectArgs = {
      headers: { Authorization: `Bearer ${TOKEN}` },
      method: 'GET',
      url: 'https://movie-nodejs.herokuapp.com/api/rank',
    }

    const movieRankApi = await movieApi.getMovieRanking(TOKEN);
    const movieRank = movieRankApi.data.results;
    
    expect(mockCallback.mock.calls.length).toEqual(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(expectArgs);
    expect(movieRank).toBe(MOVIE_RANK);
  })

  it('getTokenAndMovieRank', async () => {
    const TOKEN = 'testToken';
    const MOVIE_RANK = 'movie rank data';
    const mockCallback = axios.mockImplementationOnce(() => {
                                return {data: TOKEN}
                              })
                              .mockImplementationOnce(() => {
                                return {data: {results: MOVIE_RANK}}
                              });
    const expectArgs = {
      headers: { Authorization: `Bearer ${TOKEN}` },
      method: 'GET',
      url: 'https://movie-nodejs.herokuapp.com/api/rank',
    }

    const movieRankApi = await movieApi.getTokenAndMovidRanking();
    
    expect(mockCallback.mock.calls.length).toEqual(2);
    expect(mockCallback.mock.calls[1][0]).toEqual(expectArgs);
    expect(movieRankApi.data.results).toBe('movie rank data');
  })
})