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
            <h1 style={{ marginTop: '4em' }}>Detection Results</h1>
            <Container maxWidth='lg'>
                {detectionResults.map((result, index) => {
                    const getBoundingBoxes = () => {
                        const detections = Object.values(result?.analysis?.detections);
                        return detections?.flatMap(detection =>
                            detection?.map((detection: Detection) => detection?.bbox),
                        );
                    };

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
