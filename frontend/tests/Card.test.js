// __tests__/Card.test.js
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card Component', () => {
  const testData = {
    name: 'Example Course',
    instructor: 'John Doe',
    coursecode: 'CS101',
  };

  test('renders card with correct data', () => {
    render(<Card data={testData} />);

    // Check if the course name, instructor, and course code are rendered
    const courseName = screen.getByRole('link', { name: /Example Course/i });
    const instructorText = screen.getByText(/John Doe/i);
    const courseCode = screen.getByText(/CS101/i);

    expect(courseName).toBeInTheDocument();
    expect(instructorText).toBeInTheDocument();
    expect(courseCode).toBeInTheDocument();
  });

  test('renders correct links', () => {
    render(<Card data={testData} />);

    // Check if the links are rendered correctly
    const reviewsLink = screen.getByRole('link', { name: /Reviews/i });
    const resourcesLink = screen.getByRole('link', { name: /Resources/i });
    const discussionLink = screen.getByRole('link', { name: /Discussion Groups/i });

    expect(reviewsLink).toHaveAttribute('href', 'courses/CS101/reviews');
    expect(resourcesLink).toHaveAttribute('href', 'courses/CS101/resources');
    expect(discussionLink).toHaveAttribute('href', 'courses/CS101/discussion');
  });

  test('renders the course name as a link', () => {
    render(<Card data={testData} />);

    // Check if the course name is a link
    const courseNameLink = screen.getByRole('link', { name: /Example Course/i });
    expect(courseNameLink).toHaveAttribute('href', 'courses/CS101');
  });

  test('renders the instructor name correctly', () => {
    render(<Card data={testData} />);

    // Check if the instructor name is rendered correctly
    const instructorText = screen.getByText(/John Doe/i);
    expect(instructorText).toBeInTheDocument();
  });

  // Add more test cases as needed
});
