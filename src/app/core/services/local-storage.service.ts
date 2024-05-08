import { Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import * as CryptoJS from 'crypto-js';
import { TOKEN } from '../constants/constant-list';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  public platformId: any;

  constructor(injector: Injector) {
    this.platformId = injector.get(PLATFORM_ID);
  }

  setDataInLocalStorage(payload: { key: string, value: any }, encrypted: boolean = true): void {
      if (encrypted) {
        this.setEncryptData(payload);
      } else {
        localStorage.setItem(payload.key, JSON.stringify(payload.value));
      }
  }

  getDataInLocalStorage(key: string, encrypted: boolean = true): any {
    if (encrypted) {
      return this.getEncryptedData(key);
    }
    try {
      const item = localStorage?.getItem(key);
      if (item && item !== 'undefined') {
        return JSON.parse(item);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  removeDataInLocalStorage(key: string): void {
      localStorage.removeItem(key);

  }

  remove(key: string): void {
    this.removeDataInLocalStorage(key);
  }

  get(key: string, encrypted: boolean = true): any {
    return this.getDataInLocalStorage(key, encrypted);
  }

  // @ts-ignore
  set(payload: { key: string, value: any }, encrypted: boolean = true): any {
    this.setDataInLocalStorage(payload, encrypted);
  }

  clearDataInLocalStorage(): any {

      localStorage.clear();

  }

  setToken(token: string): void {
    if (token) {
      this.set({ key: TOKEN, value: token }, false);
    }
  }

  getToken(): any {
      return this.getDataInLocalStorage(TOKEN, false);
  }

  getEncryptedData(key: string, secret: string | null = this.getToken()): any {
    try {
      if (!secret) {
        return null;
      }
      const item = localStorage?.getItem(key);
      if (item && item !== 'undefined') {
        const bytes = CryptoJS.AES.decrypt(item, secret);
        const cryptoInFo = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(cryptoInFo);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  //@ts-ignore
  setEncryptData(payload: { key: string, value: any }, secret: string | null = this.getToken()): void {
    if (secret) {
      const cryptoInfo = CryptoJS.AES.encrypt(JSON.stringify(payload.value), secret).toString();
      localStorage.setItem(payload.key, cryptoInfo);
    }
  }

  getEncryptedCryptoInfo(payload: any = null, secret: string | null = this.getToken()): any {
    try {
      if (secret && payload) {
        return CryptoJS.AES.encrypt(JSON.stringify(payload), secret).toString();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  getDecryptedCryptoInfo(encryptData: any = '', secret: string | null = this.getToken()): any {
    try {
      if (secret && encryptData) {
        const bytes = CryptoJS.AES.decrypt(encryptData, secret);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    } catch (e) {
      return null;
    }
  }
}

