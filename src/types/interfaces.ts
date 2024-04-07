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

export interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Detection {
    bbox: BBox;
    confidence: number;
}

export interface Analysis {
    id: string;
    image: string;
    user: string;
    detections: { [key: string]: Detection[] };
}

export interface ImageAnalysis {
    image: {
        id: string;
        source: string;
        user: string;
    };
    analysis: Analysis;
}

export type DetectionResults = ImageAnalysis[];

export interface Brand {
    id: string;
    name: string;
    created_at: string | Date;
    updated_at: string | Date;
    logo: string;
    enabled: boolean;
}
