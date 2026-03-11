import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { ThemeProvider } from '@/contexts';
import { SignupModal } from './SignupModal';

function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('SignupModal', () => {
  const onEnter = vi.fn();

  beforeEach(() => {
    onEnter.mockClear();
  });

  it('renders title and prompt', () => {
    renderWithTheme(<SignupModal onEnter={onEnter} />);
    expect(
      screen.getByRole('heading', { name: /welcome to codeleap network/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/please enter your username/i)).toBeInTheDocument();
  });

  it('has username input with placeholder', () => {
    renderWithTheme(<SignupModal onEnter={onEnter} />);
    const input = screen.getByPlaceholderText(/your username/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Username');
  });

  it('disables ENTER button when username is empty', () => {
    renderWithTheme(<SignupModal onEnter={onEnter} />);
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeDisabled();
  });

  it('disables ENTER button when username is only whitespace', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SignupModal onEnter={onEnter} />);
    const input = screen.getByPlaceholderText(/your username/i);
    await user.type(input, '   ');
    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();
  });

  it('enables ENTER button when username has content', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SignupModal onEnter={onEnter} />);
    const input = screen.getByPlaceholderText(/your username/i);
    await user.type(input, 'alice');
    expect(screen.getByRole('button', { name: /enter/i })).not.toBeDisabled();
  });

  it('calls onEnter with trimmed username on submit', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SignupModal onEnter={onEnter} />);
    const input = screen.getByPlaceholderText(/your username/i);
    await user.type(input, '  bob  ');
    await user.click(screen.getByRole('button', { name: /enter/i }));
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter).toHaveBeenCalledWith('bob');
  });
});
