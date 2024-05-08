export const environment = {
  production: true,
  uat:false,
  developemnet:false,
  local:false,
  environment: 'prod',
  env: {
    NG_APP_ENV: import.meta.env['NG_APP_ENV'],
  },
};
