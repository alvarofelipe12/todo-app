import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  fetchAndActivate,
  getAllChanges,
  getRemoteConfig,
  RemoteConfigSettings,
} from '@angular/fire/remote-config';
import { map, Observable } from 'rxjs';
import { RemoteConfigRepository } from '../../domain/repositories/remote-config.repository';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService extends RemoteConfigRepository {
  private readonly remoteConfig = isPlatformServer(inject(PLATFORM_ID))
    ? undefined
    : getRemoteConfig(inject(FirebaseApp));

  constructor() {
    super();
    if (this.remoteConfig) {
      const settings: RemoteConfigSettings = {
        minimumFetchIntervalMillis: 0, // no cache
        fetchTimeoutMillis: 60000, // 1 minute
      };
      this.remoteConfig.settings = settings;
    }
  }

  fetchAndActivate(): Observable<boolean> {
    if (!this.remoteConfig) {
      return new Observable<boolean>((subscriber) => {
        subscriber.error('Remote Config is not available');
        subscriber.complete();
      });
    }

    return new Observable<boolean>((subscriber) => {
      fetchAndActivate(this.remoteConfig!)
        .then(() => {
          getAllChanges(this.remoteConfig!)
            .pipe(map((config) => config['darkTheme']?.asBoolean()))
            .subscribe({
              next: (isDarkThemeEnabled) => subscriber.next(isDarkThemeEnabled),
              error: (err) => subscriber.error(err),
              complete: () => subscriber.complete(),
            });
        })
        .catch((error) => subscriber.error(error));
    });
  }
}
