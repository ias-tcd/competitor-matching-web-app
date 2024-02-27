import React, { useState } from 'react';
import UseAxios from '../../utils/UseAxios';

interface ImageState {
    url: string;
    alt: string;
    file: File;
}

interface ImageUploaderProps {
    onClose: () => void;
    setFileNames: (fileNames: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onClose, setFileNames }) => {
    const [images, setImages] = useState<ImageState[]>([]);
    const [fileList, setFileList] = useState<FileList | null>(null);
    const api = UseAxios();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setFileList(e.target.files);
            const newImages = Array.from(e.target.files).map((file, index) => ({
                url: URL.createObjectURL(file),
                alt: `uploaded-${index}`,
                file: file,
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
        }
    };

    const handleUpload = async () => {
        if (fileList) {
            let success = false;
            const formData = new FormData();
            images?.forEach((image: ImageState, index: number) => formData.append(`images[${index}]`, image?.file));
            try {
                const { data } = await api.post('/images/predictions/', formData);
                setFileNames(data?.images);
                success = true;
            } catch (err) {
                console.error(err);
            }
            alert(`Images uploaded ${success ? '' : 'un'}successfully!`);
        }
        onClose();
    };

    const handleCancel = () => {
        setImages([]);
        setFileList(null);
        onClose();
    };

    return (
        <div className='dialog-container'>
            <p>Upload multiple images</p>
            <input type='file' accept='image/*' multiple onChange={handleFileChange} />
            <div>
                {images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.alt} style={{ width: '100px', margin: '10px' }} />
                ))}
            </div>
            <p>Total Images: {images.length}</p>
            <button className='upload-button' onClick={handleUpload}>
                Upload Images
            </button>
            <button className='cancel-button' onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
};

export default ImageUploader;
