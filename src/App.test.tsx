import './utils/__mocks__';

import React from 'react';
import { render, renderHook, waitFor, act, screen, fireEvent } from '@testing-library/react-native';
import { useFetchHeroes} from './hooks';
import App from './App';

describe('<App />', () => {
    it('should query heroes by name from text input value', async () => {
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

    it('should display error message if query returns no heroes', async () => {
        const { update } = render(<App />);
        
        const input = screen.getByLabelText("input");
        fireEvent.changeText(input, 'Non-existent hero');
        
        update(<App />);
      
        expect(await screen.findByAccessibilityHint('errorMessage')).toBeTruthy();
    });
    

});