import { createContext, useContext } from 'react';
import { DetectionResults } from '../types/interfaces';

interface DetectionContextType {
    detectionResults: DetectionResults;
    setDetectionResults: (results: DetectionResults) => void;
}

const DetectionResultsContext = createContext<DetectionContextType | undefined>(undefined);

export const useDetectionResults = (): DetectionContextType => {
    const context = useContext(DetectionResultsContext);
    if (context === undefined) {
        throw new Error('useDetectionResults must be used within a DetectionProvider');
    }
    return context;
};

export default DetectionResultsContext;
