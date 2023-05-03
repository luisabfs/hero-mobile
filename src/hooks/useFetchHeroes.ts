import axios, {AxiosError, AxiosResponse} from 'axios';
import { useEffect, useState } from 'react';
import { API_KEY, API_HASH } from '@env';

axios.defaults.baseURL = "https://gateway.marvel.com/v1/public/";

interface ResponseData {
  total: number;
  results: HeroData;
}

export interface HeroData {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description?: string;
  events?: { items: { name: string }[] };
  series?: { items: { name: string }[] };
}

export interface FetchHeroes {
  responseData: ResponseData | undefined;
  heroes: HeroData[] | undefined;
  fetchHeroes: (offset: number, heroName?: string) => Promise<void>;
}

export const useFetchHeroes = (): FetchHeroes => {
    const [responseData, setResponseData] = useState<ResponseData>();
    const [heroes, setHeroes] = useState<HeroData[] | any>();

    const fetchHeroes = async (offset: number, heroName?: string): Promise<void> => {
      try {
          const response = await axios.request({
            method: 'GET',
            url: '/characters',
            params: {
              apikey: API_KEY,
              hash: API_HASH,
              ts: 1,
              limit: 4, 
              offset,
              nameStartsWith: heroName?.trim()
            }
          }) as AxiosResponse<{ data: ResponseData; }>;

          setResponseData(response?.data.data);
          if(response?.data.data.total === 0) throw AxiosError;
          setHeroes(response?.data.data.results);
      } catch(error) {
          setHeroes(undefined);
      }
    }

    useEffect(() => {
      fetchHeroes(0);
    }, []);

    return { responseData, heroes, fetchHeroes };
};