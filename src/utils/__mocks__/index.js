import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import responsePage1 from '../responsePage1.json';
import responsePage2 from '../responsePage2.json';

const mock = new MockAdapter(axios);

mock.onGet('https://gateway.marvel.com/v1/public/characters').reply(({ params }) => {
    const { offset, nameStartsWith } = params;

    if(!!nameStartsWith) {
        const filteredResponse = responsePage1.data.results.filter(item => item.name.startsWith(nameStartsWith));
        if(filteredResponse.length > 0) {
            return [200, { data: { offset: 0, limit: 4, total: filteredResponse.length, count: filteredResponse.length, results: filteredResponse }}]
        } else {
            return [200, { data: { offset: 0, limit: 4, total: 0, count: 0, results: [] }}]
        }
    } else if(offset === 0) {
        return [200, responsePage1];
    } else if(offset === 4) {
        return [200, responsePage2];
    } else {
        return [500];
    }
});