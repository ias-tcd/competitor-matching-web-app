import axios from 'axios';
import { DetectionResults } from '../types/interfaces';
import { transformDataToMatchExpectedFormat } from '../utils/TransformData';

export const fetchDetectionResults = async (formData: FormData): Promise<DetectionResults> => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000'; 
    const fullUrl = `${apiUrl}/images/predictions`; 
    console.log(`Making request to: ${fullUrl}`);
    try {
        const response = await axios.post(fullUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const rawData = response.data;
        const formattedData: DetectionResults = transformDataToMatchExpectedFormat(rawData);

        return formattedData;
    } catch (error) {
        console.error('Failed to fetch detection results:', error);
        throw error;
    }
};
