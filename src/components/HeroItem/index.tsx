import React from 'react';
import { HeroData } from '../../hooks/useFetchHeroes';
import { treatThumbnailUri, truncateString } from '../../utils';
import { Font } from '../../styles';
import { Container, Thumbnail } from './styles';

interface Props {
    item: HeroData;
}

const HeroItem: React.FC<Props> = ({ item }) => {
  const { path, extension } = item.thumbnail;
  return (
    <Container>
        <Thumbnail source={{uri: treatThumbnailUri({ path, extension })}}  />
        <Font size={21} color="#4e4e4e">{truncateString(item.name, 20)}</Font>
    </Container>
    );
}

export default HeroItem;