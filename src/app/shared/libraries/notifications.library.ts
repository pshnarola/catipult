import * as $ from "jquery";

export function getNotificationGlyph(title:string):string {

  switch(title.toLowerCase()){
    case 'success':
      return 'glyphicon glyphicon-ok-circle'
      break;
    case 'error':
      return 'glyphicon glyphicon-exclamation-sign'
      break;
    case 'info':
      return 'fas fa-info-circle';
      break;
  }
}

export function getNotificationClass(title:string):string {

  switch(title.toLowerCase()){
    case 'success':
      return 'success'
      break;
    case 'error':
      return 'danger'
      break;
    case 'info':
      return 'info';
      break;
  }
}

export function notification(title:string, msg:string,duration:number,verticalPosition:string = 'top', horizontalPosition:string = 'right'):void {
  $.notify({
    // options
    icon: getNotificationGlyph(title),
    title: `${title}`,
    message: `${msg}`,
    url: null,
    target: null
  },{
    // settings
    element: 'body',
    position: null,
    type: getNotificationClass(title),
    allow_dismiss: true,
    newest_on_top: true,
    showProgressbar: false,
    placement: {
      from: verticalPosition,
      align: horizontalPosition
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: duration,
    timer: 1000,
    url_target: '_blank',
    mouse_over: null,
    animate: {
      enter: 'animate__animated animate__fadeInDown',
      exit: 'animate__animated animate__fadeOutUp'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title"><strong>{1}</strong></span> ' + '<br>' + 
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>' 
  });
}