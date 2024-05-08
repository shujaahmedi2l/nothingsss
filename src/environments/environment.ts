export const environment = {
  production: false,
  uat: false,
  developemnet: false,
  local:false,
  environment: 'local',
  env: {
    NG_APP_ENV: import.meta.env['NG_APP_ENV'],
  },
};
