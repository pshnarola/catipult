import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SwPush } from '@angular/service-worker';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'catipultFront';
  VAPID_PUBLIC_KEY  = 'BAPxLCaL28DrFRSS1zU31orSjtG7Al2bAC9VmzuK8ieYYaVPoSpeoGZ54RgVy3_SK5YOT_mur4jsuNIzqMX94qo';
privateKey = 'ApUIaavuNHi_Ey6Jj0gs00D5aH-BVmJJeexX6RUSLlM';

  @HostBinding('class') componentCssClass;
  constructor(public overlayContainer: OverlayContainer,
    private swPush: SwPush) {
    this.overlayContainer.getContainerElement().classList.add('poseidon');
    this.componentCssClass = 'poseidon';

  }
  ngOnInit() {
    // $('.right_col .navbar-right').click(function(e)
    // {
    //   let body = document.getElementsByTagName('body')[0];
    //   console.log(body);
    //       body.classList.remove('nav-sm');
    //       body.classList.add('nav-md');

    // });
    const v = this.swPush.notificationClicks;
    v.subscribe((data) => {
      console.log(data);

       window.open(data.notification.data.url, "_self");
     // window.open(data.notification.data.url, "_blank", "x=y")
    }, error => {
      console.log(error);
    });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // $('.right_col, .navbar-right').click(function(e)
    // {
    //   $('body').removeClass('nav-sm');
    //   $('body').addClass('nav-md');
    // });
  }
}
