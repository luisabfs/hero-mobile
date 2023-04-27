import React from 'react';
import { ActivityIndicator } from 'react-native';
import { usePagination } from '../../hooks';
import { HeroData } from '../../hooks/useFetchHeroes';

import { Container, PageIndexButton, ArrowLeft, ArrowRight } from './styles';
import { Font } from '../../styles';

interface Props {
  heroes?: HeroData[];
  heroName?: string;
  fetchHeroes?: any;
  responseData?: any;
}

const Paginate: React.FC<Props> = ({ heroes, heroName, fetchHeroes, responseData }) => {
  const { handlePreviousPage, handleNextPage, currentPageIndex, indexes, totalPages, setCurrentPageIndex } = usePagination({fetchHeroes, responseData});
  const currentBlockOfPages = Math.floor(currentPageIndex / 3.1);

  return (
    <Container>
      <ArrowLeft disabled={currentPageIndex === 1} onPress={() => handlePreviousPage(heroName ? heroName : undefined)} />
      
      {heroes && indexes ? (indexes[currentBlockOfPages].map((index: number) => (
        <PageIndexButton key={index} activeIndex={+index === currentPageIndex} onPress={() => setCurrentPageIndex(+index)}>
          <Font color={+index === currentPageIndex ? "#ffffff" : '#D42026'} size={21}>{index}</Font>
        </PageIndexButton>
      ))) : <ActivityIndicator />}
      
      <ArrowRight disabled={currentPageIndex === totalPages} onPress={() => handleNextPage(heroName ? heroName : undefined)} />
    </Container>
  );
}

export default Paginate;