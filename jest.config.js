import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
	testEnvironment: 'node',
	transform: {
		...tsJestTransformCfg
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy'
	},
	transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$))'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.app.json'
		}
	}
};
