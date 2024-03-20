import React, { useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import { TiDeleteOutline } from 'react-icons/ti';

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

    const deleteImage = index => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleCancel = () => {
        setImages([]);
        setFileList(null);
        onClose();
    };

    return (
        <div className='dialog-container'>
            <p style={{ marginBottom: -15 }}>Upload Multiple images along with the</p>
            <p>brands you would like us to detect:</p>
            <input type='file' accept='image/*' multiple onChange={handleFileChange} />
            <div>
                {images.map((image, index) => (
                    <div key={index} className='image-container'>
                        <img
                            src={image.url}
                            alt={image.alt}
                            style={{ width: '100px', margin: '10px' }}
                            className='images'
                        />
                        <TiDeleteOutline
                            className='delete-icon'
                            style={{ zIndex: 4, color: 'red', position: 'relative', left: 110, top: 10 }}
                            onClick={() => deleteImage(index)} // Pass the index to the deleteImage function
                        />
                    </div>
                ))}
            </div>
            <p>Total Images: {images.length}</p>
            <div className='brand-checkbox'>
                <p>Brands:</p>
                <input type='checkbox' id='Nike' className='brand-checkbox1' value='Nike' />
                <label htmlFor='Nike' id='Nike'>
                    Nike
                </label>
                <input type='checkbox' id='Adidas' className='brand-checkbox2' value='Adidas' />
                <label htmlFor='Adidas' id='Adidas'>
                    Adidas
                </label>
                <input type='checkbox' id='Puma' className='brand-checkbox3' value='Puma' />
                <label htmlFor='Puma' id='Puma'>
                    Puma
                </label>
                <input type='checkbox' id='New-Balance' className='brand-checkbox4' value='New Balence' />
                <label htmlFor='New Balance' id='New-Balance'>
                    New Balance
                </label>
                <br />

                <input type='checkbox' id='Lululemon' className='brand-checkboxes' value='Lululemon' />
                <label htmlFor='Lululemon' id='Lululemon'>
                    Lululemon
                </label>
                <input type='checkbox' id='Reebok' className='brand-checkboxes' value='Reebok' />
                <label htmlFor='Reebok' id='Reebok'>
                    Reebok
                </label>
                <input type='checkbox' id='North-Face' className='brand-checkboxes' value='North Face' />
                <label htmlFor='North Face' id='North-Face'>
                    North Face
                </label>
                <input type='checkbox' id='Under-Armor' className='brand-checkboxes' value='Under Armor' />
                <label htmlFor='Under Armor' id='Under-Armor'>
                    Under Armor
                </label>
            </div>
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
