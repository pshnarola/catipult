import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorService } from './interceptor/interceptor.service';
import { LoaderService } from './interceptor/loader.service';
import { LoaderinterceptorService } from './interceptor/loaderinterceptor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderinterceptorService, multi: true }
  ]
})
export class CoreModule { }
