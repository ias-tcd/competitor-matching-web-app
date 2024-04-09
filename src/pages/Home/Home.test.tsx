import { render, screen, RenderResult, fireEvent, act } from '@testing-library/react';
import Home from './Home';
import AuthContext from '../../context/AuthContext';
import { DetectionProvider } from '../../context/DetectionProvider';
import { MemoryRouter } from 'react-router-dom';
import context from '../../context/__mocks__/AuthContext';

describe('testing the Home component', () => {
    let renderResult: RenderResult;

    beforeEach(async () => {
        await act(async () => {
            renderResult = render(
                <AuthContext.Provider value={context}>
                    <DetectionProvider>
                        <MemoryRouter>
                            <Home />
                        </MemoryRouter>
                    </DetectionProvider>
                </AuthContext.Provider>,
            );
        });
    });

    it('renders the Home component', () => {
        expect(renderResult).not.toBeNull();
    });

    it('should render an image of the IAS logo', () => {
        const logoContainer = screen.getByTestId('logo-container');
        expect(logoContainer).not.toBeNull();
        const image = logoContainer?.firstChild;
        expect(image?.nodeName).toEqual('IMG');
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

    it.skip('should open the dialog when the text button is selected', () => {
        const imageButton = screen.getByText('Text');
        fireEvent.click(imageButton);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(1);
    });

    it('should not open the dialog when the text button is selected since it is not supported', () => {
        const imageButton = screen.getByText('Text');
        fireEvent.click(imageButton);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });

    it.skip('should open the dialog when the video button is selected', () => {
        const imageButton = screen.getByText('Video');
        fireEvent.click(imageButton);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(1);
    });

    it('should not open the dialog when the video button is selected since it is not supported', () => {
        const imageButton = screen.getByText('Video');
        fireEvent.click(imageButton);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });

    it('should close the image dialog on cancel', () => {
        const imageButton = screen.getByText('Images');
        fireEvent.click(imageButton);

        const cancel = document.getElementsByClassName('cancel-button')[0];
        fireEvent.click(cancel);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });

    it.skip('should close the video dialog on cancel', () => {
        const videoButton = screen.getByText('Video');
        fireEvent.click(videoButton);

        const cancel = document.getElementsByClassName('cancel-button')[0];
        fireEvent.click(cancel);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });

    it.skip('should close the text dialog on cancel', () => {
        const textButton = screen.getByText('Text');
        fireEvent.click(textButton);

        const cancel = document.getElementsByClassName('cancel-button')[0];
        fireEvent.click(cancel);

        const dialog = document.getElementsByClassName('overlay');
        expect(dialog.length).toEqual(0);
    });
});
