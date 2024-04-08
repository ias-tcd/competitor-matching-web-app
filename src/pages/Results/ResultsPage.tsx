import React from 'react';
import { Grid } from '@mui/material';
import { useDetectionResults } from '../../context/DetectionResultsContext';
import IndividualResult from './IndividualResult';
import { Detection } from '../../types/interfaces';

const ResultsPage: React.FC = () => {
    const { detectionResults } = useDetectionResults();

    return (
        <div>
            <h1>Detection Results</h1>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: 'center',
                    maxWidth: '70%',
                    margin: '0 auto',
                }}
            >
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
                    );
                })}
            </Grid>
        </div>
    );
};

export default ResultsPage;
