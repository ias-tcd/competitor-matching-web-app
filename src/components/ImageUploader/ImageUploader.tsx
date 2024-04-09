import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import { TiDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useDetectionResults } from '../../context/DetectionResultsContext';
import { Brand } from '../../types/interfaces';

interface BrandCheckBoxProps {
    brand: Brand;
    index: number;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BrandCheckBox = ({ brand, index, handleCheckboxChange }: BrandCheckBoxProps) => {
    const { enabled } = brand;

    return (
        <>
            <input
                type='checkbox'
                id={brand?.name}
                className={`brand-checkbox${index + 1}`}
                value={JSON.stringify(brand)}
                onChange={handleCheckboxChange}
                disabled={!enabled}
            />
            <label htmlFor={brand?.name}>{brand?.name}</label>
            {index % 4 === 3 && <br />}
        </>
    );
};

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
    const [showWarning, setShowWarning] = useState(false);
    const [checkedBrands, setCheckedBrands] = useState<Brand[]>([]);
    const [showBrandWarning, setShowBrandWarning] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);

    const navigate = useNavigate();
    const api = UseAxios();
    const { setDetectionResults } = useDetectionResults();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await api.get(`/brands/brands/`);
                setBrands(data);
            } catch (err) {
                console.error(`Error in fetching brands: ${err}`);
            }
        };

        fetchBrands();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setShowWarning(false);
            const newImages = Array.from(e.target.files).map((file, index) => ({
                url: URL.createObjectURL(file),
                alt: `uploaded-${index}`,
                file: file,
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
            if (images.length === 1) {
                setShowWarning(false);
            }
        }
    };

    const handleUpload = async () => {
        if (images.length > 0 && checkedBrands.length > 0) {
            setShowWarning(false);
            const formData = new FormData();
            images.forEach((image, index) => formData.append(`images[${index}]`, image.file));
            formData?.append('brands', checkedBrands?.map(brand => brand?.id)?.join(','));

            try {
                const { data } = await api.post('/images/predictions/', formData);
                setDetectionResults(data);
                navigate('/results');
            } catch (err) {
                console.error('Upload failed:', err);
                alert('Failed to upload images. Please try again.');
            }
        } else {
            setShowWarning(images.length === 0);
            setShowBrandWarning(checkedBrands.length === 0);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const brand = JSON.parse(e.target.value) as Brand;
        if (e.target.checked) {
            setCheckedBrands(prevCheckedBrands => [...prevCheckedBrands, brand]);
            setShowBrandWarning(false);
        } else {
            setCheckedBrands(prevCheckedBrands => prevCheckedBrands.filter(item => item?.id !== brand?.id));
        }
    };

    const deleteImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleCancel = () => {
        setImages([]);
        onClose();
    };

    return (
        <div className='dialog-container'>
            <p style={{ marginBottom: -15 }}>Upload Multiple images along with the</p>
            <p>brands you would like us to detect:</p>
            <input
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileChange}
                data-testid='image-uploader-input'
            />
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
                {brands
                    ?.filter((brand: Brand) => brand?.enabled)
                    ?.map((brand: Brand, index: number) => (
                        <BrandCheckBox
                            handleCheckboxChange={handleCheckboxChange}
                            brand={brand}
                            index={index}
                            key={brand?.id}
                        />
                    ))}
            </div>
            {showWarning && <p style={{ display: 'block', color: 'red' }}>Please select an image(s)</p>}
            {showBrandWarning && <p style={{ display: 'block', color: 'red' }}>Please select a brand(s)</p>}
            <p>Checked brands: {checkedBrands?.map(brand => brand?.name).join(', ')}</p>
            <button
                className='upload-button'
                onClick={handleUpload}
                disabled={!checkedBrands?.length || !images?.length}
            >
                Upload Images
            </button>
            <button className='cancel-button' onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
};

export default ImageUploader;
