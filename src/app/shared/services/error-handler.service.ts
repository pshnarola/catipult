import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';
  public dialogConfig;

  constructor(private router: Router, private dialog: MatDialog) { }

  public handleError(error: HttpErrorResponse, message: String, pageInfo: String){
    if(error.status === 500){
      this.handle500Error(error);
    }
    else if(error.status === 404){
      this.handle404Error(error)
    }
    else{
      this.handleOtherError(error, message, pageInfo);
    }
  }
 
  private handle500Error(error: HttpErrorResponse){
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }
 
  private handle404Error(error: HttpErrorResponse){
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }
 
  private handleOtherError(error: HttpErrorResponse, msg: String, pageInfo: String){
    this.createErrorMessage(error);
    this.dialogConfig.data = { 'errorMessage': msg , 'pageInfo': pageInfo};
    this.dialog.open(ErrorDialogComponent, this.dialogConfig);
  }
 
  private createErrorMessage(error: HttpErrorResponse){
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}