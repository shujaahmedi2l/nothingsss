export const environment = {
  production: false,
  uat:true,
  developemnet:false,
  local:false,
  environment: 'uat',
  env: {
    NG_APP_ENV: import.meta.env['NG_APP_ENV'],
  },
};
