import { render, screen } from '@testing-library/react';
import Badge from '../../components/Badge';

describe('Badge Component', () => {
  it('should render badge with nacional type', () => {
    render(<Badge label="Nacional" type="nacional" />);
    const badge = screen.getByText('Nacional');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-500');
  });

  it('should render badge with municipal type', () => {
    render(<Badge label="Municipal" type="municipal" />);
    const badge = screen.getByText('Municipal');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-400');
  });

  it('should render badge with estadual type', () => {
    render(<Badge label="Estadual" type="estadual" />);
    const badge = screen.getByText('Estadual');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-500');
  });
});
