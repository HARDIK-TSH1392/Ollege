import { render } from '@testing-library/react';
import Card from '../Card'; // Import the Card component

test('should render card component with different data', () => {
    const mockData = {
        instructor: 'Jane Doe',
        name: 'Vue Course',
        coursecode: 'VUE101',
    };

    render(<Card data={mockData} />);
});

test('should render card component with empty data', () => {
    const mockData = {};

    render(<Card data={mockData} />);
});

test('should render card component without an instructor', () => {
    const mockData = {
        name: 'Angular Course',
        coursecode: 'ANG101',
    };

    render(<Card data={mockData} />);
});

test('should render card component without a name', () => {
    const mockData = {
        instructor: 'Bob Smith',
        coursecode: 'REACT101',
    };

    render(<Card data={mockData} />);
});

test('should render card component without a course code', () => {
    const mockData = {
        instructor: 'Alice Johnson',
        name: 'Node.js Course',
    };

    render(<Card data={mockData} />);
});

test('should render card component with additional props', () => {
    const mockData = {
        instructor: 'John Doe',
        name: 'React Course',
        coursecode: 'REACT101',
        additionalProp: 'Some Value',
    };

    render(<Card data={mockData} />);
});
