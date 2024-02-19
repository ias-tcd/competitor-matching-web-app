import React, { useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

interface ObjectDetectorProps {
    onClose: () => void;
}

const BoundBox: React.FC<ObjectDetectorProps> = ({ onClose }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
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
                setIsLoading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='object-detector'>
            <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current?.click()}>Select Image</button>
            {isLoading && <p>Loading...</p>}
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
                                <p>
                                    {prediction.class} - {prediction.score.toFixed(2)}
                                </p>
                            </div>
                        ))}
                </div>
            )}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default BoundBox;
