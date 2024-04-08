import React from 'react';
import { Grid } from '@mui/material';
import { useDetectionResults } from '../../context/DetectionResultsContext';
import BoundingBoxes from '../../components/BoundingBoxes/BoundingBoxes';
import IndividualResult from './IndividualResult';
import { Detection } from '../../types/interfaces';

const ResultsPage: React.FC = () => {
    const { detectionResults } = useDetectionResults();

    return (
        <div>
            <h1>Detection Results</h1>
            <Grid container spacing={2}>
                {detectionResults.map((result, index) => {
                    const getBoundingBoxes = () => {
                        const detections = Object.values(result?.analysis?.detections);
                        return detections?.flatMap(detection =>
                            detection?.map((detection: Detection) => detection?.bbox),
                        );
                    };

                    return (
                        <Grid item xs={12} lg={12} key={index}>
                            <IndividualResult
                                boundingBoxes={getBoundingBoxes()}
                                image={{ src: result?.image?.source }}
                            />
                        </Grid>
                        // <div key={index} style={{ position: 'relative', margin: '20px' }}>
                        //     <BoundingBoxes
                        //         boundingBoxes={getBoundingBoxes()}
                        //         image={{
                        //             src: result?.image?.source,
                        //         }}
                        //     />
                        // </div>
                    );
                })}
            </Grid>
        </div>
    );
};

export default ResultsPage;
