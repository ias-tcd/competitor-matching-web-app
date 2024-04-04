import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('testing the Home component', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
        renderResult = render(<Home />);
    });

    it('renders the Home component', () => {
        expect(renderResult).not.toBeNull();
    });

    it('should include IAS in the title', () => {
        const header = document.querySelector('h1');
        expect(header?.textContent?.includes('IAS')).toBeTruthy();
    });

    it('should prompt the user to upload a piece of media', () => {
        expect(screen.findByText('Choose the type of media you want to upload:')).not.toBeNull();
    });

    it('should render 3 buttons for the media', () => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toEqual(3);
    });

    it('should not show the uploader by default', () => {
        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });

    it('should open the dialog when the image button is selected', () => {
        const imageButton = screen.getByText('Images');
        fireEvent.click(imageButton);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(1);
    });

    it('should open the dialog when the text button is selected', () => {
        const imageButton = screen.getByText('Text');
        fireEvent.click(imageButton);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(1);
    });

    it('should open the dialog when the video button is selected', () => {
        const imageButton = screen.getByText('Video');
        fireEvent.click(imageButton);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(1);
    });

    it('should close the image dialog on cancel', () => {
        const imageButton = screen.getByText('Images');
        fireEvent.click(imageButton);

        const cancel = document.getElementsByClassName('cancel-button')[0];
        fireEvent.click(cancel);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });

    it('should close the video dialog on cancel', () => {
        const imageButton = screen.getByText('Video');
        fireEvent.click(imageButton);

        const cancel = document.getElementsByClassName('cancel-button')[0];
        fireEvent.click(cancel);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });

    it('should close the text dialog on cancel', () => {
        const imageButton = screen.getByText('Text');
        fireEvent.click(imageButton);

        const cancel = document.getElementsByClassName('cancel-button')[0];
        fireEvent.click(cancel);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });
});
