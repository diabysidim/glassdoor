import { Component } from '@angular/core';
import $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  ngAfterViewInit(){
    $('.ui.dropdown').dropdown();
    $('.rating').rating('enable')
  }
}
