import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { mustStartWithZeroValidator } from '../shared/start-with-zero.directive';
import { beANumberValidator } from '../shared/be-a-number.directive';
import * as Global from '../shared/global';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  

  @Output() loginEvent = new EventEmitter<string>();
  loginForm: FormGroup;
  otpForm: FormGroup;

  otpRequestResponse = "";
  invalidOtp = "";

  constructor(private fb: FormBuilder  , private apiService: ApiService ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'mobileNumber': new FormControl(null, {validators: [Validators.required,  Validators.minLength(10),  Validators.maxLength(10)
        , mustStartWithZeroValidator(), beANumberValidator()] }),
      "otp": new FormControl()
    });

    this.otpForm = new FormGroup({
      "otps": new FormControl({ value:"", disabled: true }, [Validators.required, this.dummyValidator])
    });
  }

  /**
   * Make mobileNumber available to validate
   */
  get mobileNumber() { return this.loginForm.get('mobileNumber'); }

  get requestResponse() { return this.otpRequestResponse; }

  get requestInvalidOtp() { return this.invalidOtp; }

  set requestInvalidOtp(newVal: string) {  this.invalidOtp = newVal; }

  onRequestSubmit() {
    console.dir('formData' );
    console.log(this.loginForm );
    console.log(this.loginForm.value );
    this.apiService.doOtpRequest(this.loginForm.value).subscribe((result) => {
     
      this.otpForm.get('otps').enable({onlySelf:true});
      this.otpRequestResponse = result.response; 
      console.log('result #' + result.response + "#");
      // if (result.response.startsWith("error") {
      // } else {
      // }
      // this.loginEvent.emit('otp_success');
    });
  }

  dummyValidator(control: FormControl) {
    console.dir( FormControl );
    // setTimeout(()=>{
    //   if (this.loginForm) {
    //     console.log(this.loginForm.value);
    //   }
    // }, 10000);
    console.log('checking...');
    return null;
  }

  onLoginSubmit() {
    console.log('formData login' );
    console.log(this.loginForm );
    this.loginForm.get('otp').setValue(this.otpForm.value.otps.toUpperCase());
    //"27" + loginData.mobileNumber.substr(1);
    
    console.log(this.loginForm.value );
    console.log(this.otpForm.value );
    this.apiService.doLogin(this.loginForm.value).subscribe((result) => {
      // console.log('formData' );
      // if (result.response == "updated") {
      //   this.otpRequestResponse = "";
      // }
     // this.otpRequestResponse = result.response;
      console.log('result #' + result + "#") ;
      console.log(result) ;
      if (result.response == "success") {
        this.loginEvent.emit('otp_success');
      } else {
        this.invalidOtp = "Invalid OTP entered, try again!";
      }
      
    });
  }

 
  // signUpClick() {
  //   this.loginEvent.emit('register');
  // }

  // loginClick() {
  //   this.loginEvent.emit('recover');
  // }
}
