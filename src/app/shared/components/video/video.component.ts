import { Component, ElementRef, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { VideoService } from 'src/app/shared/components/video/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() driverName:string;
  @Input() videoUrl:string;

  @ViewChild('videoModal', { static: false }) videoModal: BsModalService;

  private element:any;

  modalRef: BsModalRef;

  constructor(private videoService:BsModalService, private el: ElementRef) { 
    this.element = el.nativeElement;
  }

  ngOnInit():void {
    this.startupScript();
  }

  ngOnDestroy():void {
    this.shutdownScript();
  }

  startupScript():void {
  }

  shutdownScript():void {
  }

  open(){
    this.element = '';

    this.modalRef = this.videoModal.show(  
      'video',  
      Object.assign({}, { class: 'modal-md' })  
    ); 
  }

  close(): void{
    this.modalRef.hide();
    this.element.remove();
  }
}
