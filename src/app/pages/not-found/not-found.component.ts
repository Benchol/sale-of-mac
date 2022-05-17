import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import lotties from 'lottie-web'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  @ViewChild('notFound') notFoundRef!: ElementRef; 

  errorMessage = '';
  faUser = faUser;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.errorMessage = params.message;
      }
    )
  }

  ngAfterViewInit(): void {
    lotties.loadAnimation({
      container: this.notFoundRef.nativeElement, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/404-animation.json' // the path to the animation json
    })
  }

}
