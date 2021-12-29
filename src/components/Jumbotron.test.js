import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Jumbotron from './Jumbotron';

describe('Jumbotron', () => {
  test('it should render the passed in title', async () => {
    render(<Jumbotron title="My App" />);
    const title = screen.getByText(/my app/i);
    waitFor(() => {
      expect(title).toBeInTheDocument();
    });
  });
});
