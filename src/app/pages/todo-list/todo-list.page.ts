import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { combineLatest, map, Observable, Subscription, tap } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { TaskModel } from 'src/app/models/task.model';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
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
  tasks$!: Observable<TaskModel[]>;
  newTaskTitle = '';
  categories$!: Observable<CategoryModel[]>;
  categoryDeletionsSub?: Subscription;
  categoryFilter?: number = 0;
  paletteToggle = false;
  private prefersDark!: MediaQueryList;
  private prefersDarkListener!: (event: MediaQueryListEvent) => void;
  private readonly remoteConfig = isPlatformServer(inject(PLATFORM_ID))
    ? undefined
    : getRemoteConfig(inject(FirebaseApp));
  private remoteConfigSub?: Subscription;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
    this.categories$ = this.categoryService.categories$;

    // Detect category deletions and remove them from tasks
    this.categoryDeletionsSub = combineLatest([this.tasks$, this.categories$])
      .pipe(
        tap(([tasks, categories]) => {
          // Get all existing category ids
          const categoryIds = new Set(categories.map((c) => c.id));
          tasks
            // Find tasks with deleted categories
            .filter(
              (task) => task.category && !categoryIds.has(task.category.id)
            )
            // iterating after the filter result to remove categories on the given tasks
            .forEach(({ id }) => {
              this.taskService.removeCategoryOnTask(undefined, id);
            });
        })
      )
      .subscribe();

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
    if (this.categoryDeletionsSub) {
      this.categoryDeletionsSub.unsubscribe();
    }
    if (this.prefersDark) {
      this.prefersDark.removeEventListener('change', this.prefersDarkListener);
    }
    if (this.remoteConfigSub) {
      this.remoteConfigSub.unsubscribe();
    }
  }

  addTask() {
    this.taskService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
  }

  toggleTask(id: number, slidingItem: IonItemSliding) {
    this.taskService.toggleTask(id);
    slidingItem.close();
  }

  deleteTask(id: number, slidingItem: IonItemSliding) {
    this.taskService.deleteTask(id);
    slidingItem.close();
  }

  trackById(index: number, task: TaskModel): number {
    return task.id;
  }

  handleChange(event: Event, taskId: number) {
    const target = event.target as HTMLIonSelectElement;
    const categoryId = target.value as number;
    this.taskService.udpateCategoryOnTask(taskId, categoryId);
  }

  onFilter(event: Event): void {
    const target = event.target as HTMLIonSelectElement;
    const filterValue = target.value ? Number(target.value) : undefined;
    this.taskService.filterTasksByCategory(filterValue);
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
