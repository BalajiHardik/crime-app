import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Register';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Register Component', () => {
  test('renders register form with login link', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login here/i)).toBeInTheDocument();
  });

  test('submits registration and navigates to login', async () => {
    axios.post.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/Register/i));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/users', {
      email: 'test@example.com',
      password: 'password123',
    });

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
