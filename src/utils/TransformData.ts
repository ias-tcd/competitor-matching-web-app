import { DetectionResults, ImageAnalysis } from '../types/interfaces';

// eslint-disable-next-line
export const transformDataToMatchExpectedFormat = (rawData: any[]): DetectionResults => {
    const transformedData: DetectionResults = rawData?.map(
        (item): ImageAnalysis => ({
            image: {
                id: item.image.id,
                source: item.image.source,
                user: item.image.user,
            },
            analysis: {
                id: item.analysis.id,
                image: item.analysis.image,
                user: item.analysis.user,
                detections: item.analysis.detections?.map(
                    // eslint-disable-next-line
                    (detection: { bbox: { x: any; y: any; width: any; height: any }; confidence: any }) => ({
                        bbox: {
                            x: detection.bbox.x,
                            y: detection.bbox.y,
                            width: detection.bbox.width,
                            height: detection.bbox.height,
                        },
                        confidence: detection.confidence,
                    }),
                ),
            },
        }),
    );

    return transformedData;
};
