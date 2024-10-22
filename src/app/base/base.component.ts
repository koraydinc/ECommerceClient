import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerType: SpinnerType) {
    this.spinner.show(spinnerType);

    setTimeout(() => {
      this.hideSpinner(spinnerType);
    }, 5000);
  }

  hideSpinner(spinnerType: SpinnerType) {
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType {
  BallFussion = "s1",
  BallSpinClockwiseFadeRotating = "s2",
  Timer = "s3"
}
