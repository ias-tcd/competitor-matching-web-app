import React, { useState, useEffect, useRef } from 'react';
import { fetchDetectionResults } from '../../services/ApiServices';
import BoundBox from '../../components/BoundBox';

const ResultsPage: React.FC = () => {
  const [detectionResults, setDetectionResults] = useState<any[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData(); 
        const results = await fetchDetectionResults(formData);
        setDetectionResults(results);
      } catch (error) {
        console.error('Error fetching detection results:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Detection Results</h1>
      {detectionResults.map((result, index) => {
        const imageRef = useRef<HTMLImageElement>(null);
        const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

        useEffect(() => {
          if (imageRef.current) {
            setImageDimensions({
              width: imageRef.current.offsetWidth,
              height: imageRef.current.offsetHeight,
            });
          }
        }, [imageRef.current]);

        return (
          <div key={index} style={{ position: 'relative', margin: '20px' }}>
            <img
              ref={imageRef}
              src={result.image.source}
              alt={`Detection ${index + 1}`}
              onLoad={() => {
                if (imageRef.current) {
                  setImageDimensions({
                    width: imageRef.current.offsetWidth,
                    height: imageRef.current.offsetHeight,
                  });
                }
              }}
              style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
            />
            <BoundBox boxes={result.analysis.detections} imageDimensions={imageDimensions} />
          </div>
        );
      })}
    </div>
  );
};

export default ResultsPage;
