import styled from 'styled-components/native';

interface Props {
    type?: "black" | "light" | "regular";
    size?: number;
    color?: string;
}

export const HeaderContainer = styled.View`
    margin: 12px 30px;
`;

export const Font = styled.Text`
    font-family: ${({type = "regular"}: Props) => `Roboto-${type}` };
    font-size: ${({size = 14}: Props) => size }px;
    color: ${({color = '#D42026'}: Props) => color };
`;

export const NameBanner = styled.Text`
    font-family: 'Roboto-Regular';
    padding: 10px;
    padding-left: 135px;
    backgroundColor: #D42026;
    color: #FFFFFF;
    font-size: 16px;
`;

export const Input = styled.TextInput`
    padding: 5px;
    border-width: 1px;
    height: 31px;
    border-radius: 5px;
    border-color: #3A3A3A;
`;

export const Divider = styled.View`
    height: 2px;
    width: 53px;
    margin-top: 3px;
    margin-bottom: 12px;
    background-color: #D42026;
`;

export const Footer = styled.View`
    background-color: #D42026;
    height: 25px;
`;
