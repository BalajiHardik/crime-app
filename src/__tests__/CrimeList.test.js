import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CrimeList from '../components/CrimeList';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify({ id: 1, email: 'user1@example.com' }));
});

test('renders all crimes and shows who inserted them', async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      {
        id: 101,
        userId: 1,
        userEmail: 'user1@example.com',
        criminalName: 'Jane Smith',
        details: 'Fraud case',
        criminalStatus: 'Active'
      },
      {
        id: 102,
        userId: 2,
        userEmail: 'user2@example.com',
        criminalName: 'Mark Lee',
        details: 'Burglary',
        criminalStatus: 'Arrested'
      }
    ]
  });

  render(<CrimeList />);

  await waitFor(() => {
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Inserted by: user1@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Mark Lee/i)).toBeInTheDocument();
    expect(screen.getByText(/Inserted by: user2@example.com/i)).toBeInTheDocument();
  });
});

test('allows logged-in user to delete their own crime', async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      {
        id: 103,
        userId: 1,
        userEmail: 'user1@example.com',
        criminalName: 'Tom Hardy',
        details: 'Cybercrime',
        criminalStatus: 'Active'
      }
    ]
  });

  axios.delete.mockResolvedValueOnce({});

  render(<CrimeList />);

  await waitFor(() => {
    expect(screen.getByText(/Tom Hardy/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Delete/i));

  await waitFor(() => {
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3001/crimes/103');
  });
});

test('allows logged-in user to update their own crime', async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      {
        id: 104,
        userId: 1,
        userEmail: 'user1@example.com',
        criminalName: 'Tom Updated',
        details: 'Cybercrime',
        criminalStatus: 'Active'
      }
    ]
  });

  axios.put.mockResolvedValueOnce({});

  render(<CrimeList />);

  await waitFor(() => {
    expect(screen.getByText(/Tom Updated/i)).toBeInTheDocument();
  });

  window.prompt = jest.fn()
    .mockReturnValueOnce('Tom Final')
    .mockReturnValueOnce('Updated details')
    .mockReturnValueOnce('Released');

  fireEvent.click(screen.getByText(/Edit/i));

  await waitFor(() => {
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:3001/crimes/104',
      expect.objectContaining({
        criminalName: 'Tom Final',
        details: 'Updated details',
        criminalStatus: 'Released',
        userId: 1,
        userEmail: 'user1@example.com'
      })
    );
  });
});

test('does not show edit/delete buttons for other users\' crimes', async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      {
        id: 105,
        userId: 2,
        userEmail: 'user2@example.com',
        criminalName: 'Other User',
        details: 'Unauthorized access',
        criminalStatus: 'Active'
      }
    ]
  });

  render(<CrimeList />);

  await waitFor(() => {
    expect(screen.getByText(/Other User/i)).toBeInTheDocument();
    expect(screen.queryByText(/Edit/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument();
  });
});
