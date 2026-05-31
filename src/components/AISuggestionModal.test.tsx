import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AISuggestionModal } from './AISuggestionModal';
import { renderWithProviders } from '../test/test-utils';

describe('AISuggestionModal', () => {
  it('renders suggestion and field label', () => {
    renderWithProviders(
      <AISuggestionModal
        suggestion="Draft text here."
        fieldLabel="Current Financial Situation"
        onAccept={jest.fn()}
        onDiscard={jest.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Draft text here.')).toBeInTheDocument();
    expect(screen.getByText('Current Financial Situation')).toBeInTheDocument();
  });

  it('calls onAccept with edited text', async () => {
    const user = userEvent.setup();
    const onAccept = jest.fn();

    renderWithProviders(
      <AISuggestionModal
        suggestion="Original"
        fieldLabel="Field"
        onAccept={onAccept}
        onDiscard={jest.fn()}
      />
    );

    const textarea = screen.getByLabelText(/edit ai suggestion/i);
    await user.clear(textarea);
    await user.type(textarea, 'Edited suggestion');
    await user.click(screen.getByRole('button', { name: /accept/i }));

    expect(onAccept).toHaveBeenCalledWith('Edited suggestion');
  });

  it('calls onDiscard when discard is clicked', async () => {
    const user = userEvent.setup();
    const onDiscard = jest.fn();

    renderWithProviders(
      <AISuggestionModal
        suggestion="Text"
        fieldLabel="Field"
        onAccept={jest.fn()}
        onDiscard={onDiscard}
      />
    );

    await user.click(screen.getByRole('button', { name: /discard/i }));
    expect(onDiscard).toHaveBeenCalled();
  });
});
