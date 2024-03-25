import { act, fireEvent, render, screen } from '@testing-library/react';
import AuthContext, { IAuthContext } from '../../context/AuthContext';
import mockContext from '../../context/__mocks__/AuthContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('testing the LoginPage', () => {
    const renderPage = async (context?: IAuthContext) => {
        context = context ?? mockContext;
        await act(async () => {
            render(
                <AuthContext.Provider value={context as IAuthContext}>
                    <MemoryRouter initialEntries={['/login']}>
                        <Routes>
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/' element={<div data-testid='home-page' />} />
                            <Route path='/signUp' element={<div data-testid='sign-up' />} />
                        </Routes>
                    </MemoryRouter>
                </AuthContext.Provider>,
            );
        });
    };

    it('should redirect to the home page if the user is logged in', async () => {
        await renderPage();

        expect(window.location.pathname).toEqual('/');
        const homePage = screen.queryAllByTestId('home-page');
        expect(homePage).toHaveLength(1);
    });

    it('should not redirect if the user is not logged in', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const homePage = screen.queryAllByTestId('home-page');
        expect(homePage).toHaveLength(0);
    });

    it('should redirect to sign up if the user presses the button', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const signUpButton = screen.getByText('Sign Up');
        fireEvent.click(signUpButton);
        const homePage = screen.queryAllByTestId('sign-up');
        expect(homePage).toHaveLength(1);
    });

    it('should display an error to the user if a login error occurs', async () => {
        const context = {
            ...mockContext,
            user: null,
            loginError: 'An error occurred!',
        };
        await renderPage(context);
        expect(screen.getByText('An error occurred!')).not.toBeNull();
    });

    it('should not attempt to login if the password field is not provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const email = screen.getByPlaceholderText('Email');
        fireEvent.change(email, { target: { value: 'hello@email.com' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);
        expect(context.login).not.toHaveBeenCalled();
    });

    it('should not attempt to login if the email field is not provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const password = screen.getByPlaceholderText('Password');
        fireEvent.change(password, { target: { value: 'password123' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);
        expect(context.login).not.toHaveBeenCalled();
    });

    it('should attempt to login if password and email are provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        const submitButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.focus(emailInput);
        fireEvent.input(emailInput, { target: { value: 'email123@email.com' } });
        fireEvent.focus(passwordInput);
        fireEvent.input(passwordInput, { target: { value: 'Password123' } });
        fireEvent.click(submitButton);

        expect(context.login).toHaveBeenCalledTimes(1);
        expect(context.login).toHaveBeenCalledWith('email123@email.com', 'Password123');
    });
});
