export interface TokenClaims {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    id: string;
    username: string;
    first_name: string;
    last_name: string;
}

export interface Tokens {
    access: string;
    refresh: string;
}

export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Detection {
    bbox: BoundingBox;
    confidence: number;
}

export interface Detections {
    [key: string]: Detection[];
}

export interface Analysis {
    id: string;
    image: string;
    user: string;
    detections: Detections;
}

export interface Image {
    id: string;
    source: string;
    user: string;
}

export interface ImageAnalysis {
    image: Image;
    analysis: Analysis;
}
