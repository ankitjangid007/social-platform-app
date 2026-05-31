import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { testI18n } from './test/test-utils';
import en from '../public/locals/en.json';

beforeAll(async () => {
  if (!testI18n.isInitialized) {
    await testI18n.init();
  }
});

function renderApp() {
  return render(
    <I18nextProvider i18n={testI18n}>
      <App />
    </I18nextProvider>
  );
}

describe('App', () => {
  it('renders portal title from translations', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(en.appTitle)).toBeInTheDocument();
    });
  });

  it('does not show API key button in header', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(en.appTitle)).toBeInTheDocument();
    });
    expect(screen.queryByLabelText(/configure openai api key/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/api key/i)).not.toBeInTheDocument();
  });

  it('toggles document direction when switching to Arabic', async () => {
    const user = userEvent.setup();
    renderApp();

    await waitFor(() => {
      expect(screen.getByText(en.appTitle)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /arabic/i }));

    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
  });

  it('shows language toggle buttons', async () => {
    renderApp();
    expect(screen.getByRole('button', { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /arabic/i })).toBeInTheDocument();
  });
});
