import { render, fireEvent, screen, act } from '@testing-library/react';
import ImageUploader from './ImageUploader';
import { vi } from 'vitest';
import AuthContext from '../../context/AuthContext';
import context from '../../context/__mocks__/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { DetectionProvider } from '../../context/DetectionProvider';

describe('testing the ImageUploader component', () => {
    const onClose = vi.fn();
    URL.createObjectURL = vi.fn();

    beforeEach(async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={context}>
                    <DetectionProvider>
                        <MemoryRouter>
                            <ImageUploader onClose={onClose} />
                        </MemoryRouter>
                    </DetectionProvider>
                </AuthContext.Provider>,
            );
        });
    });

    it('should call the onClose function when cancelling', () => {
        const cancelButtons = document.getElementsByClassName('cancel-button');
        expect(cancelButtons.length).toEqual(1);
        fireEvent.click(cancelButtons[0]);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not use the API when there are no files', () => {
        const mock = new MockAdapter(axios);
        const uploadButtons = document.getElementsByClassName('upload-button');
        expect(uploadButtons.length).toEqual(1);
        fireEvent.click(uploadButtons[0]);
        expect(mock.history.get).toHaveLength(0);
    });

    it('should allow the user to upload an image', () => {
        const input = screen.getByTestId('image-uploader-input') as HTMLInputElement;
        const file = new File(['dummy content'], 'myimage.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file] } });
        expect(input.files).toHaveLength(1);
    });

    it('should allow the user to upload multiple images together', () => {
        const input = screen.getByTestId('image-uploader-input') as HTMLInputElement;
        const file = new File(['dummy content'], 'myimage.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file, file] } });
        expect(input.files).toHaveLength(2);
    });

    it('should allow the user to upload multiple images successively', () => {
        const input = screen.getByTestId('image-uploader-input') as HTMLInputElement;
        const file1 = new File(['dummy content1'], 'myimage1.png', { type: 'image/png' });
        const file2 = new File(['dummy content2'], 'myimage2.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file1] } });
        fireEvent.change(input, { target: { files: [file1, file2] } });
        expect(input.files).toHaveLength(2);
    });

    it('should display the total number of images uploaded', () => {
        const input = screen.getByTestId('image-uploader-input') as HTMLInputElement;
        const file = new File(['dummy content'], 'myimage.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file, file] } });
        let imageCount = screen.getByText('Total Images: 2');
        expect(imageCount).not.toBeNull();

        fireEvent.change(input, { target: { files: [file] } });
        imageCount = screen.getByText('Total Images: 3');
        expect(imageCount).not.toBeNull();
    });
});
