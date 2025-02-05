import { TestBed } from '@angular/core/testing';
import { RemoteConfigService } from './remote-config.service';
import { FirebaseApp, getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig, RemoteConfig } from '@angular/fire/remote-config';
import { environment } from 'src/environments/environment';

describe('RemoteConfigService', () => {
  let service: RemoteConfigService;
  let app: FirebaseApp;
  let providedRemoteConfig: RemoteConfig;
  let remoteConfig: RemoteConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase, 'name')),
        provideRemoteConfig(() => {
          providedRemoteConfig = getRemoteConfig(getApp('name'));
          return providedRemoteConfig;
        }),
      ],
    });
    app = TestBed.inject(FirebaseApp);
    remoteConfig = TestBed.inject(RemoteConfig);
    service = TestBed.inject(RemoteConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
