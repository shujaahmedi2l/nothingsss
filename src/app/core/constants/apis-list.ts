'use strict';

import { AppConfig } from '@app/app.config';

const apiConfig = new AppConfig();
export const APP_TITLE: string = apiConfig.config.title;
export const APP_ENVIRONMENT: string = apiConfig.config.environment;
export const SERVER_URL: string = apiConfig.config.apiUrl.backendUrl;

export const ADMIN_BASE_URL: string = `${SERVER_URL}`;

export const CUSTOMER_AUTH_BASE_URL: string = `${SERVER_URL}customer/auth`;

export const SIGNIN: string = `${CUSTOMER_AUTH_BASE_URL}/signin`;
export const LOGOUT: string = `${CUSTOMER_AUTH_BASE_URL}/logout`;
export const SIGNUP: string = `${CUSTOMER_AUTH_BASE_URL}/signup`;
export const RESET_PASSWORD: string = `${CUSTOMER_AUTH_BASE_URL}/reset-password`;
export const UPDATE_PASSWORD: string = `${CUSTOMER_AUTH_BASE_URL}/update-password`;

