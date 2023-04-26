import React, { useEffect, useState } from 'react';
import { useFetchHeroes } from './useFetchHeroes';

export const usePagination = () => {
    const { responseData, fetchHeroes } = useFetchHeroes();

    const [pageOffset, setPageOffset] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if(responseData?.total) setTotalPages(Math.ceil(responseData?.total / 4));
    }, [responseData])

    const handlePreviousPage = (heroName?: string) => {
        const offset = pageOffset - 4;
        if(offset < 0) return;
        setCurrentPageIndex(prevState => prevState === 1 ? 1 : prevState - 1);
        fetchHeroes(offset, heroName ? heroName : undefined);
      }
      
      const handleNextPage = (heroName?: string) => {
        const offset = 4 * (currentPageIndex);
        if(responseData?.total && offset >= responseData?.total) return;
    
        setPageOffset(offset);
        setCurrentPageIndex(prevState => prevState + 1);
        fetchHeroes(offset, heroName ? heroName : undefined);
      }
    
    return {handlePreviousPage, handleNextPage, pageOffset, currentPageIndex, setCurrentPageIndex, totalPages};
};