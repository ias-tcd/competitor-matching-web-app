import React from 'react';
import { Grid, Container } from '@mui/material';
import { useDetectionResults } from '../../context/DetectionResultsContext';
import './ResultsPage.css';
import IndividualResult from './IndividualResult';
import { Detection } from '../../types/interfaces';

const ResultsPage: React.FC = () => {
    const { detectionResults } = useDetectionResults();

    const length = detectionResults?.length ?? 0;

    const h1ClassName = length > 1 ? 'results-heading' : '';
    const containerClassName = length > 2 ? 'container-wrapper' : length === 2 ? 'container-wrapper-double' : '';

    return (
        <div style={{ width: '100vw', paddingTop: '4em' }}>
            <h1 className={h1ClassName}>Detection Results</h1>
            <div className={containerClassName}>
                <Container maxWidth='lg' className='results-container'>
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
        </div>
    );
};

export default ResultsPage;
