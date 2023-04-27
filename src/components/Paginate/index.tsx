import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useFetchHeroes, usePagination } from '../../hooks';
import { HeroData } from '../../hooks/useFetchHeroes';

import { Container, PageIndexButton, ArrowLeft, ArrowRight } from './styles';
import { Font } from '../../styles';

interface Props {
  heroes: HeroData[];
}

const Paginate: React.FC<Props> = ({ heroes }) => {
  const { handlePreviousPage, handleNextPage, setCurrentPageIndex, currentPageIndex, totalPages, pageOffset } = usePagination();

  return (
    <Container>
      <ArrowLeft 
        // onPress={() => handlePreviousPage(heroName ? heroName : undefined)}
      />

      {/* why am I doing this? */}
      {pageOffset > 4 ? (
          <PageIndexButton>
            <Text>{pageOffset / 4}</Text>
          </PageIndexButton>
      ) : null}

      <PageIndexButton activeIndex>
        <Font size={21} color="#ffffff">
          {currentPageIndex}
        </Font>
      </PageIndexButton>
      
      {/* <Text>{currentPageIndex + 1 > totalPages ? null : currentPageIndex + 1}</Text>
      <Text>{currentPageIndex + 2 > totalPages ? null : currentPageIndex + 2}</Text> */}
      
      {heroes?.length === 4 ? (
          <PageIndexButton>
            <Font size={21}>{pageOffset / 4 + 2 }</Font>
          </PageIndexButton>
      ) : null} 
      
      {heroes?.length === 4 ? (
          <PageIndexButton>
            <Font size={21}>{pageOffset / 4 + 3 }</Font>
          </PageIndexButton>
      ) : null}
      
      <ArrowRight />
    </Container>
  );
}

export default Paginate;