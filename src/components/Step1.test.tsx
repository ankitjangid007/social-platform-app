import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { useWizard } from '../context/FormContext';
import { renderWithProviders } from '../test/test-utils';

function Step1Wizard() {
  const { currentStep } = useWizard();
  if (currentStep === 1) return <Step1 />;
  if (currentStep === 2) return <Step2 />;
  return null;
}

describe('Step1', () => {
  it('renders personal information section', () => {
    renderWithProviders(<Step1 />);
    expect(screen.getByRole('heading', { name: /personal information/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  it('shows validation when submitting empty form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Step1 />);

    await user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    });
  });

  it('advances to step 2 when required fields are valid', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Step1Wizard />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/national id/i), '123456');
    await user.type(screen.getByLabelText(/date of birth/i), '1990-01-01');
    await user.selectOptions(screen.getByLabelText(/gender/i), 'male');
    await user.type(screen.getByLabelText(/^address/i), '123 Main St');
    await user.type(screen.getByLabelText(/^city/i), 'Springfield');
    await user.type(screen.getByLabelText(/country/i), 'USA');
    await user.type(screen.getByLabelText(/phone/i), '+1 555 123 4567');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');

    await user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /family & financial/i })).toBeInTheDocument();
    });
  });
});
