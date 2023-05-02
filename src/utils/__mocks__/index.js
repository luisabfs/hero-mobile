import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import responsePage1 from '../../utils/responsePage1.json';
import responsePage2 from '../../utils/responsePage2.json';

const mock = new MockAdapter(axios);

mock.onGet('https://gateway.marvel.com/v1/public/characters').reply(({ params }) => {
    if(params.offset === 0) {
        return [200, responsePage1];
    } else if(params.offset === 4) {
        return [200, responsePage2];
    } else {
        return [400];
    }
});