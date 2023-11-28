// __tests__/ReviewCard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewCard from '../components/ReviewCard';

describe('ReviewCard Component', () => {
  const testReviewData = [
    {
      name: 'John Doe',
      date: '2023-11-25',
      reviews: ['Positive review 1', 'Positive review 2', 'Positive review 3'],
    },
    {
      name: 'Jane Smith',
      date: '2023-11-24',
      reviews: ['Another positive review', 'Yet another positive review'],
    },
    // Add more review data as needed
  ];

  test('renders reviews correctly', () => {
    render(<ReviewCard reviewData={testReviewData} />);

    // Check if reviews are rendered
    const reviews = screen.getAllByText(/Positive review/i);
    expect(reviews.length).toBe(3);

    const anotherReviews = screen.getAllByText(/Another positive review/i);
    expect(anotherReviews.length).toBe(2);
  });

  test('toggles expansion correctly', () => {
    render(<ReviewCard reviewData={testReviewData} />);

    // Check if reviews are initially collapsed
    const collapsedReviews = screen.getAllByText(/Read More/i);
    expect(collapsedReviews.length).toBe(testReviewData.length);

    // Click on the "Read More" button for the first review
    fireEvent.click(collapsedReviews[0]);

    // Check if the first review is expanded
    const expandedReview = screen.getByText(/Read Less/i);
    expect(expandedReview).toBeInTheDocument();
  });

  test('collapses reviews correctly', () => {
    render(<ReviewCard reviewData={testReviewData} />);

    // Click on the "Read More" button for the first review
    fireEvent.click(screen.getAllByText(/Read More/i)[0]);

    // Check if the first review is expanded
    const expandedReview = screen.getByText(/Read Less/i);
    expect(expandedReview).toBeInTheDocument();

    // Click on the "Read Less" button for the first review
    fireEvent.click(expandedReview);

    // Check if the first review is collapsed again
    const collapsedReview = screen.getByText(/Read More/i);
    expect(collapsedReview).toBeInTheDocument();
  });

  // Add more test cases as needed
});
