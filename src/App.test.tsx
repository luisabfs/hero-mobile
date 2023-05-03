import './utils/__mocks__';

import React from 'react';
import { render, renderHook, waitFor, act, screen, fireEvent } from '@testing-library/react-native';
import { useFetchHeroes} from './hooks';
import App from './App';

describe('<App />', () => {
    it('should query heroes by text input value', async () => {
        const { result: fetchHeroesResult } = renderHook(() => useFetchHeroes());
        render(<App />);

        const input = screen.getByLabelText("input");
        fireEvent.changeText(input, 'Thor');
        expect(input.props.value).toBe("Thor")

        act(() => {
            fetchHeroesResult.current.fetchHeroes(0, input.props.value);
        });   
        
        await waitFor(() => {
            expect(fetchHeroesResult.current.responseData?.total).toBeGreaterThan(0);
        });
    });
});