import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises'
import Vue from 'vue';
import MovieCardTest from '../src/component/MovieCard.js';
import { getToken, getMovieRanking } from '../src/service/movieApi.js';

jest.mock('../src/service/movieApi.js');

describe('MovieCardTest', () => {
  it('when click button, will change data', async () => {
    const wrapper = shallowMount(MovieCardTest);
    getToken.mockResolvedValue(new Promise((resolve) => 
      resolve({data:'somethingToken'})
    ));
    getMovieRanking.mockResolvedValue(new Promise((resolve) => 
      resolve({data:{results: 'some Movie Rank Data'}})
    ));

    wrapper.find('button').trigger('click');
    await flushPromises();

    expect(wrapper.vm.movieData).toEqual('some Movie Rank Data');
  }, 500000)
})