import React, { useState } from 'react';
import BoundBox from './BoundBox';
import './index.css';

interface ImageState {
    url: string;
    alt: string;
    file: File;
}

interface ImageUploaderProps {
    onClose: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onClose }) => {
    const [images, setImages] = useState<ImageState[]>([]);
    const [fileList, setFileList] = useState<FileList | null>(null);

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

    const handleUpload = () => {
        if (fileList) {
            console.log('Uploading images:', fileList);
            {
                /*alert('Images uploaded successfully!');*/
            }
        }
        onClose();
    };

    const handleCancel = () => {
        setImages([]);
        setFileList(null);
        onClose();
    };

    return (
        <div className='Page'>
            <div className='dialog-container'>
                <p>Upload multiple images</p>
                <input type='file' accept='image/*' multiple onChange={handleFileChange} style={{ display: 'none' }} />
                <div>
                    {images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.alt} style={{ width: '100px', margin: '10px' }} />
                    ))}
                </div>
                {/*<p>Total Images: {images.length}</p>*/}
                {<BoundBox />}
                <button className='upload-button' onClick={handleUpload}>
                    Upload Images
                </button>
                <button className='cancel-button' onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ImageUploader;
