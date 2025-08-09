import { render, screen, fireEvent } from '@testing-library/react';
import CrimeForm from '../components/CrimeForm';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify({ id: 1, email: 'user1@example.com' }));
});

test('renders crime form and adds a crime', async () => {
  render(<CrimeForm />);

  fireEvent.change(screen.getByPlaceholderText(/Criminal Name/i), {
    target: { value: 'John Doe' }
  });

  fireEvent.change(screen.getByPlaceholderText(/Details/i), {
    target: { value: 'Robbery at market' }
  });

  fireEvent.change(screen.getByDisplayValue('Active'), {
    target: { value: 'Arrested' }
  });

  axios.post.mockResolvedValueOnce({});

  fireEvent.click(screen.getByText(/Add Crime/i));

  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:3001/crimes',
    expect.objectContaining({
      criminalName: 'John Doe',
      details: 'Robbery at market',
      criminalStatus: 'Arrested',
      userId: 1,
      userEmail: 'user1@example.com'
    })
  );
});
