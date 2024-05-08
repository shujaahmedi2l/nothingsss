export interface IAppConfig {
  name: string,
  title: string,
  version: string,
  apiUrl: apiURL,
  environment: string
}

export interface apiURL {
  backendUrl: string,
  frontendUrl: string,
}
export interface IConfirmation {
  title?: string,
  message: string,
  btnOkText?: string,
  btnCancelText?: string,
  extraIcon?: string,
  iconClass?: any,
  dialogSize?: 'sm' | 'lg'
}
