import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
// import { ApiService } from '../api.service';
import * as Global from '../shared/global';
@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html'
})

export class RecoverComponent implements OnInit {
  recoverForm = this.fb.group({
    mobileNumber: ['', Validators.required],
    emailAddress: ['']
  });

  @Output() recoverEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder, // private apiService: ApiService
    ) { }

  ngOnInit() {

  }

  onRecoverSubmit() {
    console.log('formData' );
    console.log(this.recoverForm );
    console.log(this.recoverForm.value );
    // this.apiService.doRecover(this.recoverForm.value).subscribe((result) => {
    //   this.recoverEvent.emit('recover_success');
    // });
  }

  signUpClick() {
    this.recoverEvent.emit('register');
  }

  loginClick() {
    this.recoverEvent.emit('login');
  }
}
