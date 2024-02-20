import React, { useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

interface ImageState {
    url: string;
    alt: string;
    file: File;
}

const BoundBox: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[] | null>(null);
    {
        /*const [isLoading, setIsLoading] = useState<boolean>(false);*/
    }
    const [selectedImage, setSelectedImage] = useState(0);
    const [images, setImages] = useState<ImageState[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map((file, index) => ({
                url: URL.createObjectURL(file),
                alt: `uploaded-${index}`,
                file: file,
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
        }
    };
    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        const file = images[index]?.file;
        if (!file) return;

        {
            /*setIsLoading(true);*/
        }
        const reader = new FileReader();
        reader.onload = async event => {
            if (event.target) {
                const dataUrl = event.target.result as string;
                setImageData(dataUrl);
                const imageElement = document.createElement('img');

                imageElement.src = dataUrl;
                const model = await cocoSsd.load();
                const predictions = await model.detect(imageElement);
                setPredictions(predictions);
                {
                    /*setIsLoading(false);*/
                }
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className='object-detector'>
                <input
                    type='file'
                    accept='image/*'
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {imageData && (
                    <div className='image-container'>
                        <img src={imageData} alt='Uploaded' />
                        {predictions &&
                            predictions.map((prediction, index) => (
                                <div
                                    key={index}
                                    className='bounding-box'
                                    style={{
                                        top: prediction.bbox[1],
                                        left: prediction.bbox[0],
                                        width: prediction.bbox[2],
                                        height: prediction.bbox[3],
                                    }}
                                >
                                    <p>{prediction.class}</p>
                                </div>
                            ))}
                    </div>
                )}
                <div
                    className='image-list'
                    style={{
                        borderStyle: 'solid',
                        borderBlockColor: 'black',
                        display: 'inline-block',
                        position: 'relative',
                        height: 600,
                        width: 180,
                    }}
                >
                    <p style={{ textAlign: 'center' }}>Images</p>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={image.alt}
                            className={index === selectedImage ? 'image-list-prev selected' : 'image-list-prev'}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>
            </div>
            {/*{isLoading && <p>Loading...</p>}*/}

            <button onClick={() => fileInputRef.current?.click()}>Select Image</button>
        </>
    );
};

export default BoundBox;
