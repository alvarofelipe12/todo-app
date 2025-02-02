import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData<T>(key: string): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : <T>[];
  }
}
