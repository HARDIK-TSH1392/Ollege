// __tests__/Hero.test.js
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

describe('Hero Component', () => {
  test('renders heading and description correctly', () => {
    render(<Hero />);

    // Check if the heading is rendered
    const heading = screen.getByText(/Courses at your disposal/i);
    expect(heading).toBeInTheDocument();

    // Check if the description is rendered
    const description = screen.getByText(/Find any course you like and look at reviews and resources/i);
    expect(description).toBeInTheDocument();
  });

  test('renders "Find courses" button', () => {
    render(<Hero />);

    // Check if the "Find courses" button is rendered
    const findCoursesButton = screen.getByRole('link', { name: /Find courses/i });
    expect(findCoursesButton).toBeInTheDocument();
  });

  test('renders "Learn more" link', () => {
    render(<Hero />);

    // Check if the "Learn more" link is rendered
    const learnMoreLink = screen.getByRole('link', { name: /Learn more/i });
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute('href', '/');
  });

  // Add more test cases as needed
});
