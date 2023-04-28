import styled from "styled-components/native";
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1.5px;
    border-bottom-color: #D42026;
`;

export const Thumbnail = styled.Image`
    height: ${windowHeight * 0.1}px;
    width: ${windowHeight * 0.1}px;
    borderRadius: ${Math.round((windowHeight * 0.1 + windowWidth * 0.1) / 2)}px
    margin: 18px;
    margin-right: 30px;
`;
