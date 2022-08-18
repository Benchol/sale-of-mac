import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Machine-sale';

  @HostListener('window:scroll', ['$event']) onScroll(e: Event) {
    // console.log('scrolling', window.pageYOffset)
  }
}
