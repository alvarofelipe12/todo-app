import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { map, Subscription } from 'rxjs';
import {
  fetchAndActivate,
  getAllChanges,
  getRemoteConfig,
  RemoteConfigSettings,
} from '@angular/fire/remote-config';
import { FirebaseApp } from '@angular/fire/app';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: false,
})
export class TodoListPage implements OnInit, OnDestroy {
  paletteToggle = false;
  private prefersDark!: MediaQueryList;
  private prefersDarkListener!: (event: MediaQueryListEvent) => void;
  private readonly remoteConfig = isPlatformServer(inject(PLATFORM_ID))
    ? undefined
    : getRemoteConfig(inject(FirebaseApp));
  private remoteConfigSub?: Subscription;
  pageTitle = 'To-Do List';

  constructor() {}

  ngOnInit() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(this.prefersDark.matches);
    this.prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkPalette(mediaQuery.matches)
    );
    this.prefersDarkListener = (mediaQuery) =>
      this.initializeDarkPalette(mediaQuery.matches);
    this.prefersDark.addEventListener('change', this.prefersDarkListener);

    // Fetch the darkTheme parameter from Remote Config
    if (this.remoteConfig) {
      const settings: RemoteConfigSettings = {
        minimumFetchIntervalMillis: 0, // no cache
        fetchTimeoutMillis: 60000, // 1 minute
      };
      this.remoteConfig.settings = settings;
      fetchAndActivate(this.remoteConfig)
        .then(() => {
          // Listen for changes in the Remote Config values
          this.remoteConfigSub = getAllChanges(this.remoteConfig!)
            .pipe(map((config) => config['darkTheme']?.asBoolean()))
            .subscribe((isDarkThemeEnabled) => {
              console.log(isDarkThemeEnabled);
              if (isDarkThemeEnabled !== undefined) {
                this.initializeDarkPalette(isDarkThemeEnabled);
              }
            });
        })
        .catch((error) => {
          console.error('Error activating Remote Config:', error);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.prefersDark) {
      this.prefersDark.removeEventListener('change', this.prefersDarkListener);
    }
    if (this.remoteConfigSub) {
      this.remoteConfigSub.unsubscribe();
    }
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange() {
    this.paletteToggle = !this.paletteToggle;
    this.toggleDarkPalette(this.paletteToggle);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}
