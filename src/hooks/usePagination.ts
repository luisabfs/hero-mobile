import { useEffect, useState } from 'react';
import { groupArrayByThree } from '../utils';
const LIMIT_PER_PAGE = 4;

interface Props {
  fetchHeroes?: any;
  responseData?: any;
}

export const usePagination = ({fetchHeroes, responseData}: Props) => {
    const [pageOffset, setPageOffset] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [indexes, setIndexes] = useState<Array<any>>();

  useEffect(() => {
    setIndexes(groupArrayByThree([...Array(totalPages + 1).keys()].slice(1)));
  }, [currentPageIndex, totalPages])

    console.log('pageOffset', pageOffset)

    useEffect(() => {
        if(responseData?.total) setTotalPages(Math.ceil(responseData?.total / LIMIT_PER_PAGE));
    }, [responseData])

    const handlePreviousPage = (heroName?: string) => {
        const offset = pageOffset - LIMIT_PER_PAGE;
        if(offset < 0) return;
        setCurrentPageIndex(prevState => prevState === 1 ? 1 : prevState - 1);
        fetchHeroes(offset, heroName ? heroName : undefined);
      }
      
      const handleNextPage = (heroName?: string) => {
        const offset = LIMIT_PER_PAGE * currentPageIndex;
        if(responseData?.total && offset > responseData?.total) return;
    
        setPageOffset(offset);
        setCurrentPageIndex(prevState => prevState + 1);
        fetchHeroes(offset, heroName ? heroName : undefined);
      }
    
    return {handlePreviousPage, handleNextPage, pageOffset, currentPageIndex, setCurrentPageIndex, totalPages, indexes};
};