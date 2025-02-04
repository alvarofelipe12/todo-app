import { RemoteConfigService } from './../../../application/services/remote-config.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  paletteToggle = false;
  private remoteConfigSub?: Subscription;

  constructor(private remoteConfigService: RemoteConfigService) {}

  ngOnInit(): void {
    this.fetchDarkTheme();
  }
  ngOnDestroy(): void {
    if (this.remoteConfigSub) {
      this.remoteConfigSub.unsubscribe();
    }
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  fetchDarkTheme() {
    this.remoteConfigSub = this.remoteConfigService
      .fetchAndActivate()
      .subscribe({
        next: (isDarkThemeEnabled) => {
          if (isDarkThemeEnabled !== undefined) {
            this.initializeDarkPalette(isDarkThemeEnabled);
          }
        },
        error: (error) => {
          console.error('Error activating Remote Config:', error);
        },
      });
  }
}
