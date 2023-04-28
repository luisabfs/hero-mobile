import styled from "styled-components/native";
import { Dimensions } from 'react-native';

export const OuterContainer = styled.TouchableOpacity`
   flex: 1;
   align-items: center;
   justify-content: center;
   background-color: rgba(0,0,0,0.8);
`;

export const Container = styled.View`
    width: 80%;
    padding: 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
`;
