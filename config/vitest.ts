import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import mockContext from '../src/context/__mocks__/AuthContext';

afterEach(() => {
    cleanup();
});

vi.mock('jwt-decode', () => mockContext.tokens);
