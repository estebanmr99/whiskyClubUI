import { Injectable } from '@angular/core';

// This is the service to save information in the local storage.
@Injectable()
export class LocalStorageService {

  // This is the method to save something in the local storage.
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // This is the method to get something from the local storage.
  get(key: string) {
    return localStorage.getItem(key);
  }

  // This is the method to remove something from the local storage.
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
