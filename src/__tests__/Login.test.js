import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';

test('renders login form with register link', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Register here/i)).toBeInTheDocument();
});
