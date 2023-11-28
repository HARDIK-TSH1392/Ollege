import { render } from '@testing-library/react';
import Course from '../Course';

test('should render course component', () => {
    const mockData = {
        instructor: 'John Doe',
        name: 'React Course', // You can add other necessary properties
    };

    render(<Course data={mockData} />);
});

test('should render course component with empty data', () => {
    const mockData = {};

    render(<Course data={mockData} />);
    // Add assertions to check if the rendered content handles empty data gracefully
});

test('should render course component without an instructor', () => {
    const mockData = {
        name: 'Angular Course',
    };

    render(<Course data={mockData} />);
    // Add assertions to check if the rendered content handles missing instructor gracefully
});

test('should render course component without a name', () => {
    const mockData = {
        instructor: 'Bob Smith',
    };

    render(<Course data={mockData} />);
    // Add assertions to check if the rendered content handles missing name gracefully
});

test('should render course component with additional props', () => {
    const mockData = {
        instructor: 'Alice Johnson',
        name: 'Node.js Course',
        additionalProp: 'Some Value',
    };

    render(<Course data={mockData} />);
    // Add assertions to check if the rendered content handles additional props gracefully
});
