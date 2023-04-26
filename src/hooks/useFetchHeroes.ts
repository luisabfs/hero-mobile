import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_KEY, API_HASH } from '@env';

axios.defaults.baseURL = "https://gateway.marvel.com/v1/public/";

interface HeroData {
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

export const useFetchHeroes = () => {
    const [heroes, setHeroes] = useState<HeroData[]>();

    const fetchHeroes = async () => {
      try {
          const response = await axios.request({
            method: 'GET',
            url: '/characters',
            params: {
              apikey: API_KEY,
              hash: API_HASH,
              ts: 1,
              limit: 4, 
              orderBy: 'name',
              offset: 200
            }
          });
          setHeroes(response.data.data.results);
      } catch(error) {
          console.log(error)
      }
    }

    useEffect(() => {
      fetchHeroes();
    }, []);

    return { heroes, fetchHeroes };
};