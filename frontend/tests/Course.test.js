// __tests__/Course.test.js
import { render, screen } from '@testing-library/react';
import Course from '../components/Course';

describe('Course Component', () => {
  const testData = {
    name: 'Software Development using Open-source',
    instructor: 'Pankaj Jalote',
  };

  test('renders course details correctly', () => {
    render(<Course data={testData} />);

    // Check if course name and instructor are rendered
    const courseName = screen.getByText(/Software Development using Open-source/i);
    const instructorName = screen.getByText(/Pankaj Jalote/i);

    expect(courseName).toBeInTheDocument();
    expect(instructorName).toBeInTheDocument();
  });

  test('renders correct links', () => {
    render(<Course data={testData} />);

    // Check if "Reviews" link is rendered
    const reviewsLink = screen.getByText(/Reviews/i);
    expect(reviewsLink).toHaveAttribute('href', '/');

    // Check if "Resources" link is rendered
    const resourcesLink = screen.getByText(/Resources/i);
    expect(resourcesLink).toHaveAttribute('href', '/');

    // Check if "Discussion Groups" link is rendered
    const discussionLink = screen.getByText(/Discussion Groups/i);
    expect(discussionLink).toHaveAttribute('href', '/');
  });

  // Add more test cases as needed
});
