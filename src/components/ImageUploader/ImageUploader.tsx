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
    const [showWarning, setShowWarning] = useState(false);
    const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
    const [showBrandWarning, setShowBrandWarning] = useState(false);

    const api = UseAxios();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setFileList(e.target.files);
            setShowWarning(false);
            const newImages = Array.from(e.target.files).map((file, index) => ({
                url: URL.createObjectURL(file),
                alt: `uploaded-${index}`,
                file: file,
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
            if (images.length === 1) {
                setShowWarning(false);
                setFileList(null);
            }
        }
    };

    const handleUpload = async () => {
        if ((images.length !== 0 || fileList) && checkedBrands.length > 0) {
            setShowWarning(false);
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
            onClose();
        } else {
            if (images.length === 0) {
                setShowWarning(true);
            } else {
                setShowBrandWarning(true);
            }
        }
    };

    const handleCheckboxChange = (e: { target: { value: string; checked: boolean } }) => {
        const brand = e.target.value;
        if (e.target.checked) {
            setCheckedBrands(prevCheckedBrands => [...prevCheckedBrands, brand]);
            setShowBrandWarning(false);
        } else {
            setCheckedBrands(prevCheckedBrands => prevCheckedBrands.filter(item => item !== brand));
        }
    };

    const deleteImage = (index: number) => {
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
            <p>Total Images: {images.length}</p>
            <div className='image-container'>
                {images.map((image, index) => (
                    <div key={index} className='image'>
                        <TiDeleteOutline
                            className='delete-icon'
                            style={{
                                zIndex: 4,
                                color: 'red',
                                position: 'relative',
                                left: 93,
                                top: 27,
                                display: 'flex',
                            }}
                            onClick={() => deleteImage(index)}
                        />
                        <img
                            key={index}
                            src={image.url}
                            alt={image.alt}
                            style={{ width: '100px', margin: '10px', position: 'relative', display: 'flex' }}
                        />
                    </div>
                ))}
            </div>
            <div className='brand-checkbox'>
                <p>Brands:</p>
                <input
                    type='checkbox'
                    id='Nike'
                    className='brand-checkbox1'
                    value='Nike'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='Nike'>Nike</label>
                <input
                    type='checkbox'
                    id='Adidas'
                    className='brand-checkbox2'
                    value='Adidas'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='Adidas'>Adidas</label>
                <input
                    type='checkbox'
                    id='Puma'
                    className='brand-checkbox3'
                    value='Puma'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='Puma'>Puma</label>
                <input
                    type='checkbox'
                    id='New-Balance'
                    className='brand-checkbox4'
                    value='New Balance'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='New Balance'>New Balance</label>
                <br />

                <input
                    type='checkbox'
                    id='Lululemon'
                    className='brand-checkboxes'
                    value='Lululemon'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='Lululemon'>Lululemon</label>
                <input
                    type='checkbox'
                    id='Reebok'
                    className='brand-checkboxes'
                    value='Reebok'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='Reebok'>Reebok</label>
                <input
                    type='checkbox'
                    id='North-Face'
                    className='brand-checkboxes'
                    value='North Face'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='North Face'>North Face</label>
                <input
                    type='checkbox'
                    id='Under-Armor'
                    className='brand-checkboxes'
                    value='Under Armor'
                    onChange={handleCheckboxChange}
                />
                <label htmlFor='Under Armor'>Under Armor</label>
            </div>
            {showWarning && <p style={{ display: 'block', color: 'red' }}>Please select an image(s)</p>}
            {showBrandWarning && <p style={{ display: 'block', color: 'red' }}>Please select a brand(s)</p>}
            <p>Checked brands: {checkedBrands.join(', ')}</p>
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
