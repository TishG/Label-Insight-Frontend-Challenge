import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Jumbotron from './Jumbotron';

describe('Jumbotron', () => {
  test('it should render the passed in title', async () => {
    render(<Jumbotron title="My App" />);

    const title = screen.getByText(/my app/i);

    expect(title).toBeInTheDocument();
  });
});
