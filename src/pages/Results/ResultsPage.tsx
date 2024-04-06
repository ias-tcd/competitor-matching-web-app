import React from 'react';
import { useDetectionResults } from '../../context/DetectionResultsContext';
import BoundingBoxes from '../../components/BoundingBoxes/BoundingBoxes';

const ResultsPage: React.FC = () => {
    const { detectionResults } = useDetectionResults();

    return (
        <div>
            <h1>Detection Results</h1>
            {detectionResults.map((result, index) => {
                const getBoundingBoxes = () => {
                    const detections = Object.values(result?.analysis?.detections);
                    return detections?.flatMap(detection => detection?.map(d => d?.bbox));
                };

                return (
                    <div key={index} style={{ position: 'relative', margin: '20px' }}>
                        <BoundingBoxes
                            boundingBoxes={getBoundingBoxes()}
                            image={{
                                src: result.analysis.image
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ResultsPage;
