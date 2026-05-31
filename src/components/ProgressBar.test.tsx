import { screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';
import { renderWithProviders } from '../test/test-utils';

describe('ProgressBar', () => {
  it('renders all three step labels', () => {
    renderWithProviders(<ProgressBar />);
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByText('Family & Finance')).toBeInTheDocument();
    expect(screen.getByText('Your Situation')).toBeInTheDocument();
  });

  it('marks step 1 as current on initial load', () => {
    renderWithProviders(<ProgressBar />);
    const currentStep = screen.getByRole('listitem', { current: 'step' });
    expect(currentStep).toHaveTextContent('1');
    expect(currentStep).toHaveTextContent('Personal Info');
  });

  it('exposes progressbar with accessible label', () => {
    renderWithProviders(<ProgressBar />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      'Step 1 of 3'
    );
  });
});
