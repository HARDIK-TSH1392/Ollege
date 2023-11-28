// __tests__/Navbar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  test('renders KourseLera logo', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the KourseLera logo is rendered
    const logo = screen.getByText(/KourseLera/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders navigation links correctly', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the "Home" link is rendered with the correct styles
    const homeLink = screen.getByRole('link', { name: /Home/i, current: true });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass('bg-blue-700');

    // Check if the "About" and "Creators" links are rendered
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const creatorsLink = screen.getByRole('link', { name: /Creators/i });

    expect(aboutLink).toBeInTheDocument();
    expect(creatorsLink).toBeInTheDocument();
  });

  test('navigates to the correct route when a link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if clicking the "About" link navigates to the correct route
    fireEvent.click(screen.getByRole('link', { name: /About/i }));
    expect(screen.getByText(/About/i)).toBeInTheDocument();

    // Check if clicking the "Creators" link navigates to the correct route
    fireEvent.click(screen.getByRole('link', { name: /Creators/i }));
    expect(screen.getByText(/Aryan Vohra/i)).toBeInTheDocument();
  });

  test('renders search bar and login/signup button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the search bar is rendered
    const searchBar = screen.getByPlaceholderText(/Search/i);
    expect(searchBar).toBeInTheDocument();

    // Check if the login/signup button is rendered
    const loginSignupButton = screen.getByRole('button', { name: /Login\/Signup/i });
    expect(loginSignupButton).toBeInTheDocument();
  });
});
