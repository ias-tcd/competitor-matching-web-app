import React from 'react';
import { Grid, Container } from '@mui/material';
import { useDetectionResults } from '../../context/DetectionResultsContext';
import './ResultsPage.css';
import IndividualResult from './IndividualResult';
import { Detection } from '../../types/interfaces';

const ResultsPage: React.FC = () => {
    const { detectionResults } = useDetectionResults();

    return (
        <div style={{ width: '100vw' }}>
            <h1 style={{ marginTop: '90px' }}>Detection Results</h1>
            <Container maxWidth='md'>
                {detectionResults.map((result, index) => {
                    const getBoundingBoxes = () => {
                        const detections = Object.values(result?.analysis?.detections);
                        return detections?.flatMap(detection =>
                            detection?.map((detection: Detection) => detection?.bbox),
                        );
                    };

                    //     const getBrands = () => {
                    //         const detections = Object.values(result?.analysis?.detections);
                    //         const brands = detections.flatMap(detection => detection.map(d => d.brand).filter(Boolean));
                    //         return [...new Set(brands)];
                    //     };

                    //     const brands = getBrands();
                    //     const brandsMessage =
                    //         brands.length > 0
                    //             ? `We identified ${brands.length} logo(s): ${brands.join(', ')}.`
                    //             : 'No logos found.';

                    //     return (
                    //         <div key={index} className='result-container' style={{ position: 'relative', margin: '20px' }}>
                    //             <BoundingBoxes
                    //                 boundingBoxes={getBoundingBoxes()}
                    //                 image={{
                    //                     src: result?.image?.source,
                    //                 }}
                    //             />
                    //             <div className='detection-info'>
                    //                 <p>{brandsMessage}</p>
                    //             </div>
                    //         </div>
                    //     );
                    // })}
                    // <div className='model-info'>
                    //     <p>
                    //         The YOLOv7 model has proven to be an effective tool for real-time object detection, including the
                    //         identification of logos in images. This capability can be incredibly useful for businesses looking
                    //         to monitor brand visibility across various media channels or to analyze market trends. By leveraging
                    //         YOLOv7's advanced detection algorithms, companies can gain valuable insights into how and where
                    //         their brand is being represented.
                    //     </p>
                    // </div>

                    return (
                        <Grid item xs={12} xl={12} key={index}>
                            <IndividualResult
                                boundingBoxes={getBoundingBoxes()}
                                image={{ src: result?.image?.source }}
                            />
                        </Grid>
                    );
                })}
            </Container>
        </div>
    );
};

export default ResultsPage;
