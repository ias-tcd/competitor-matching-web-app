import { act, fireEvent, render, screen } from '@testing-library/react';
import AuthContext, { IAuthContext } from '../../context/AuthContext';
import mockContext from '../../context/__mocks__/AuthContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './SignUpPage';

describe('testing the LoginPage', () => {
    const renderPage = async (context?: IAuthContext) => {
        context = context ?? mockContext;
        await act(async () => {
            render(
                <AuthContext.Provider value={context as IAuthContext}>
                    <MemoryRouter initialEntries={['/signUp']}>
                        <Routes>
                            <Route path='/signUp' element={<SignUpPage />} />
                            <Route path='/' element={<div data-testid='home-page' />} />
                            <Route path='/login' element={<div data-testid='login-page' />} />
                        </Routes>
                    </MemoryRouter>
                </AuthContext.Provider>,
            );
        });
    };

    it('should redirect to login page if the user presses the button', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const signUpButton = screen.getByText('Login');
        fireEvent.click(signUpButton);
        const homePage = screen.queryAllByTestId('login-page');
        expect(homePage).toHaveLength(1);
    });

    it('should display an error to the user if a registration error occurs', async () => {
        const context = {
            ...mockContext,
            user: null,
            registerError: 'An error occurred!',
        };
        await renderPage(context);
        expect(screen.getByText('An error occurred!')).not.toBeNull();
    });

    it('should not attempt to register if the first name field is not provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const lastName = screen.getByPlaceholderText('Last Name');
        fireEvent.change(lastName, { target: { value: 'Last Name' } });
        const email = screen.getByPlaceholderText('Email');
        fireEvent.change(email, { target: { value: 'hello@email.com' } });
        const passwords = screen.getAllByPlaceholderText('Password');
        fireEvent.change(passwords[0], { target: { value: 'Password123' } });
        fireEvent.change(passwords[1], { target: { value: 'Password123' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);
        expect(context.register).not.toHaveBeenCalled();
    });

    it('should not attempt to register if the last name field is not provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const firstName = screen.getByPlaceholderText('First Name');
        fireEvent.change(firstName, { target: { value: 'First Name' } });
        const email = screen.getByPlaceholderText('Email');
        fireEvent.change(email, { target: { value: 'hello@email.com' } });
        const passwords = screen.getAllByPlaceholderText('Password');
        fireEvent.change(passwords[0], { target: { value: 'Password123' } });
        fireEvent.change(passwords[1], { target: { value: 'Password123' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);
        expect(context.register).not.toHaveBeenCalled();
    });

    it('should not attempt to register if the email field is not provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const firstName = screen.getByPlaceholderText('First Name');
        fireEvent.change(firstName, { target: { value: 'First Name' } });
        const lastName = screen.getByPlaceholderText('Last Name');
        fireEvent.change(lastName, { target: { value: 'Last Name' } });
        const passwords = screen.getAllByPlaceholderText('Password');
        fireEvent.change(passwords[0], { target: { value: 'Password123' } });
        fireEvent.change(passwords[1], { target: { value: 'Password123' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);
        expect(context.register).not.toHaveBeenCalled();
    });

    it('should not attempt to register if the password field is not provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const firstName = screen.getByPlaceholderText('First Name');
        fireEvent.change(firstName, { target: { value: 'First Name' } });
        const email = screen.getByPlaceholderText('Email');
        fireEvent.change(email, { target: { value: 'hello@email.com' } });
        const lastName = screen.getByPlaceholderText('Last Name');
        fireEvent.change(lastName, { target: { value: 'Last Name' } });
        const passwords = screen.getAllByPlaceholderText('Password');
        fireEvent.change(passwords[1], { target: { value: 'Password123' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);
        expect(context.register).not.toHaveBeenCalled();
    });

    it('should not attempt to register if the confirm password field is not provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const firstName = screen.getByPlaceholderText('First Name');
        fireEvent.change(firstName, { target: { value: 'First Name' } });
        const email = screen.getByPlaceholderText('Email');
        fireEvent.change(email, { target: { value: 'hello@email.com' } });
        const lastName = screen.getByPlaceholderText('Last Name');
        fireEvent.change(lastName, { target: { value: 'Last Name' } });
        const passwords = screen.getAllByPlaceholderText('Password');
        fireEvent.change(passwords[0], { target: { value: 'Password123' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);
        expect(context.register).not.toHaveBeenCalled();
    });

    it('should attempt to login if password and email are provided', async () => {
        const context = {
            ...mockContext,
            user: null,
        };
        await renderPage(context);
        const firstName = screen.getByPlaceholderText('First Name');
        fireEvent.change(firstName, { target: { value: 'First Name' } });
        const email = screen.getByPlaceholderText('Email');
        fireEvent.change(email, { target: { value: 'hello@email.com' } });
        const lastName = screen.getByPlaceholderText('Last Name');
        fireEvent.change(lastName, { target: { value: 'Last Name' } });
        const passwords = screen.getAllByPlaceholderText('Password');
        fireEvent.change(passwords[0], { target: { value: 'Password123' } });
        fireEvent.change(passwords[1], { target: { value: 'Password123' } });
        const submit = screen
            .getAllByRole('button')
            .filter(button => (button as HTMLButtonElement).type === 'submit')[0];
        fireEvent.click(submit);

        expect(context.register).toHaveBeenCalledTimes(1);
        expect(context.register).toHaveBeenCalledWith({
            first_name: 'First Name',
            last_name: 'Last Name',
            email: 'hello@email.com',
            password: 'Password123',
            confirm_password: 'Password123',
        });
    });
});
