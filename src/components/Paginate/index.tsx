import React from 'react';
import { ActivityIndicator } from 'react-native';
import { HeroData, Pagination } from '../../hooks';

import { Container, PageIndexButton, ArrowLeft, ArrowRight } from './styles';
import { Font } from '../../styles';

interface Props {
  heroes?: HeroData[];
  heroName?: string;
  pagination: Pagination;
}

const Paginate: React.FC<Props> = ({ heroes, heroName, pagination }) => {
  const { handlePreviousPage, handleNextPage, currentPageIndex, indexes, totalPages } = pagination;
  const currentBlockOfPages = Math.floor(currentPageIndex / 3.1);

  return (
    <Container>
      <ArrowLeft disabled={currentPageIndex === 1} onPress={() => handlePreviousPage(heroName ? heroName : undefined)} />
      
      {heroes && indexes ? (indexes[currentBlockOfPages].map((index: number) => (
        <PageIndexButton key={index} activeIndex={+index === currentPageIndex} disabled={+index === currentPageIndex} onPress={() => {
          index > currentPageIndex ? handleNextPage(heroName ? heroName : undefined, index) : handlePreviousPage(heroName ? heroName : undefined, index)
        }}>
          <Font color={+index === currentPageIndex ? "#ffffff" : '#D42026'} size={21}>{index}</Font>
        </PageIndexButton>
      ))) : <ActivityIndicator />}
      
      <ArrowRight disabled={currentPageIndex === totalPages} onPress={() => handleNextPage(heroName ? heroName : undefined)} />
    </Container>
  );
}

export default Paginate;