import { useEffect, useState } from 'react';
import { groupArrayByThree } from '../utils';
import { FetchHeroes } from './index'

const LIMIT_PER_PAGE = 4;

interface Props {
  fetchHeroes: FetchHeroes["fetchHeroes"];
  responseData: FetchHeroes["responseData"];
}

export interface Pagination {
  handlePreviousPage: (heroName?: string, newIndex?: number) => void;
  handleNextPage: (heroName?: string, newIndex?: number) => void;
  pageOffset: number;
  currentPageIndex: number;
  setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  indexes: number[][] | undefined;
}

export const usePagination = ({ fetchHeroes, responseData }: Props): Pagination => {
    const [pageOffset, setPageOffset] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [indexes, setIndexes] = useState<Array<any>>();

  useEffect(() => {
    setIndexes(groupArrayByThree([...Array(totalPages + 1).keys()].slice(1)));
  }, [currentPageIndex, totalPages])

    useEffect(() => {
        if(responseData?.total) setTotalPages(Math.ceil(responseData?.total / LIMIT_PER_PAGE));
    }, [responseData])

    const handlePreviousPage = (heroName?: string, newIndex?: number): Promise<void> | undefined => {
        const offset = pageOffset - (LIMIT_PER_PAGE * (newIndex ? currentPageIndex - newIndex : 1));
        if(offset < 0) return;
        
        setPageOffset(offset);
        setCurrentPageIndex(prevState => prevState === 1 ? 1 : newIndex ? newIndex : prevState - 1);
        fetchHeroes(offset, heroName ? heroName : undefined);
      }
      
      const handleNextPage = (heroName?: string, newIndex?: number) => {
        const offset = LIMIT_PER_PAGE * (newIndex ? newIndex - 1 : currentPageIndex);
        if(responseData?.total && offset > responseData?.total) return;
    
        setPageOffset(offset);
        setCurrentPageIndex(prevState => newIndex ? newIndex : prevState + 1);
        fetchHeroes(offset, heroName ? heroName : undefined);
      }
    
    return {handlePreviousPage, handleNextPage, pageOffset, currentPageIndex, setCurrentPageIndex, totalPages, indexes};
};