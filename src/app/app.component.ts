import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
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
  test3 = effect(() => {console.log('effect',this.test())})
}
