import { render, screen } from '@testing-library/react';
import React from 'react';
import ProofOfOwnershipForm from '../proof-of-ownership-form.jsx';
import test_data from './test-data';

describe('proof-of-ownership-form.jsx', () => {
    let cards;
    beforeAll(() => {
        cards = test_data;
    });
    it('should render a single card item inside the form', () => {
        render(<ProofOfOwnershipForm cards={[cards.requests[0]]} updateAccountStatus={jest.fn()} />);
        const cardItems = screen.getAllByRole('card-item');
        expect(cardItems.length).toEqual(1);
    });
    it('should render multiple card items inside the form', () => {
        render(<ProofOfOwnershipForm cards={cards.requests} updateAccountStatus={jest.fn()} />);
        const cardItems = screen.getAllByRole('card-item');
        expect(cardItems.length).toEqual(cards.requests.length);
    });
});
