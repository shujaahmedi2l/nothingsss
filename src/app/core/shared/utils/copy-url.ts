import { FE_URL } from '@app/core/constants/apis-list';


export function copyURL(value: string): Promise<void> {
  if (navigator?.clipboard) {
    return navigator?.clipboard?.writeText(`${FE_URL}${value.replace(value[0], '')}`);
  }
  return new Promise((resolve, reject) => {
    reject();
  });
}
