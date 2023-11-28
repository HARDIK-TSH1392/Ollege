// __tests__/Resources.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Resources from '../components/Resources';

describe('Resources Component', () => {
  test('renders Resources button with dropdown arrow', () => {
    render(<Resources />);

    // Check if the Resources button is rendered
    const resourcesButton = screen.getByText(/Resources/i);
    expect(resourcesButton).toBeInTheDocument();

    // Check if the dropdown arrow is rendered
    const dropdownArrow = screen.getByRole('img', { name: /Dropdown Arrow/i });
    expect(dropdownArrow).toBeInTheDocument();
  });

  test('does not render dropdown content initially', () => {
    render(<Resources />);

    // Check if the dropdown content is not initially rendered
    const dropdownContent = screen.queryByText(/Notes/i);
    expect(dropdownContent).toBeNull();
  });

  test('toggles dropdown content on button click', () => {
    render(<Resources />);

    // Check if the dropdown content is not initially rendered
    let dropdownContent = screen.queryByText(/Notes/i);
    expect(dropdownContent).toBeNull();

    // Click the Resources button to toggle the dropdown
    fireEvent.click(screen.getByText(/Resources/i));

    // Check if the dropdown content is now rendered
    dropdownContent = screen.getByText(/Notes/i);
    expect(dropdownContent).toBeInTheDocument();

    // Click the Resources button again to hide the dropdown
    fireEvent.click(screen.getByText(/Resources/i));

    // Check if the dropdown content is no longer rendered
    dropdownContent = screen.queryByText(/Notes/i);
    expect(dropdownContent).toBeNull();
  });

  // Add more test cases to check the correct rendering of dropdown items, links, etc.
});
