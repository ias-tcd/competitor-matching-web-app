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
