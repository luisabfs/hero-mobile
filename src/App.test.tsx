import './utils/__mocks__';

import React from 'react';
import { render, renderHook, waitFor, act, screen } from '@testing-library/react-native';
import { useFetchHeroes} from './hooks';
import App from './App';

describe('<App />', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should display error message if API response returns no heroes', async () => {
        const { result: fetchHeroesResult } = renderHook(() => useFetchHeroes());
        const { update } = render(<App />)

        act(() => {
            fetchHeroesResult.current.fetchHeroes(0, 'Non-existent hero');
        });   

        update(<App />)
        
        await waitFor(() => {
            expect(fetchHeroesResult.current.heroes).toBeFalsy();
            expect(screen.getByAccessibilityHint('errorMessage'));
        });
    });
});