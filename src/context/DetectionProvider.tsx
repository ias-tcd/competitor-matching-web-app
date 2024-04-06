import React, { ReactNode, useState } from 'react';
import DetectionResultsContext from './DetectionResultsContext';
import { DetectionResults } from '../types/interfaces';

interface DetectionProviderProps {
    children: ReactNode;
}

export const DetectionProvider: React.FC<DetectionProviderProps> = ({ children }) => {
    const [detectionResults, setDetectionResults] = useState<DetectionResults>([]);

    return (
        <DetectionResultsContext.Provider value={{ detectionResults, setDetectionResults }}>
            {children}
        </DetectionResultsContext.Provider>
    );
};
