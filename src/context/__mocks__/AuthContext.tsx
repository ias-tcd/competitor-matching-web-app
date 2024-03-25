import { vi } from 'vitest';

export default {
    user: {
        token_type: 'access',
        exp: new Date().getTime() + 10000,
        iat: new Date().getTime(),
        jti: '',
        id: '',
        username: '',
        first_name: '',
        last_name: '',
    },
    tokens: {
        access: '123',
        refresh: '456',
    },
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    loginError: '',
    registerError: '',
    handleChangedTokens: vi.fn(),
};
