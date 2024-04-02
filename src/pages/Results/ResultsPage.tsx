import React from 'react';
import { useDetectionResults } from '../../context/DetectionResultsContext';

const ResultsPage: React.FC = () => {
    const { detectionResults } = useDetectionResults();

    return (
        <div>
            <h1>Detection Results Overview</h1>
            <p>
                The results were obtained using YOLOv7, an advanced deep learning model known for its accuracy and
                efficiency in real-time object detection. This approach is particularly useful for identifying specific
                objects within images, making it invaluable for various applications such as surveillance, automated
                image tagging, and more.
            </p>
            {detectionResults.map((result, index) => (
                <div key={index}>
                    <h2>Image {index + 1}</h2>
                    <img
                        src={result.image.source}
                        alt={`Detection ${index + 1}`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <h3>Detections:</h3>
                    {result.analysis.detections[result.image.source].map((detection, detIndex) => (
                        <p key={detIndex}>
                            Bounding Box: ({detection.bbox.x}, {detection.bbox.y}, {detection.bbox.width},{' '}
                            {detection.bbox.height})<br />
                            Confidence: {detection.confidence}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ResultsPage;
