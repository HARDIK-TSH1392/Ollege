import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Resources from "../Resources" // Replace with the correct path

test('renders the Resources component with the default state', () => {
  render(<Resources />);

  // Assert that the button is rendered
  const resourcesButton = screen.getByText(/Resources/i);
  expect(resourcesButton).toBeInTheDocument();

  // Assert that the dropdown is initially closed
  const dropdownContent = screen.queryByRole('menu');
  expect(dropdownContent).not.toBeInTheDocument();
});



test('renders the dropdown items with the correct attributes', () => {
  render(<Resources />);

  // Click the button to open the dropdown
  const resourcesButton = screen.getByText(/Resources/i);
  fireEvent.click(resourcesButton);

  // Assert that the dropdown items are rendered with the correct attributes
  const dropdownItems = screen.getAllByRole('link'); // Change role to 'link'
  expect(dropdownItems).toHaveLength(7); // Assuming there are 7 items in the dropdown

  // You can add more specific assertions based on your styles and requirements
});

