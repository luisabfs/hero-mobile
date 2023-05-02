import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { HeroData } from '../../hooks/useFetchHeroes';
import { treatThumbnailUri, truncateString } from '../../utils';
import { Font } from '../../styles';
import { Container, Thumbnail } from './styles';
import HeroDetailsModal from '../HeroDetailsModal';

interface Props {
    item: HeroData;
}

const HeroItem: React.FC<Props> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { path, extension } = item.thumbnail;

  return (
    <TouchableWithoutFeedback testID="heroTouchable" onPress={() => setModalVisible(true)}>
        <Container>
            <HeroDetailsModal testID="heroModal" modalVisible={modalVisible} setModalVisible={setModalVisible} item={item} />
            
            <Thumbnail testID="heroThumbnail" source={{uri: treatThumbnailUri({ path, extension })}}  />
            <Font size={21} color="#4e4e4e">{truncateString(item.name, 20)}</Font>
        </Container>
    </TouchableWithoutFeedback>
    );
}

export default HeroItem;