import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatLuxonDateModule } from '@angular/material-luxon-adapter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatDatepickerModule,
    MatLuxonDateModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>WL</span>
    </mat-toolbar>

    <!-- <input matInput [matDatepicker]="picker" />
    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle> -->
    <!-- <mat-datepicker #picker="matCalendar"></mat-datepicker> -->
    <div style="width: 500px">
      <mat-calendar />
    </div>

    <button (click)="test.set('hello')">Change</button>
    {{ test() }} {{ test2() }}
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'weightlifting';

  test = signal('hi');
  test2 = computed(() => this.test() + 'there');
  test3 = effect(() => {
    console.log('effect', this.test());
  });
}
