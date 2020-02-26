import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, takeUntil, tap, catchError } from 'rxjs/operators';
import * as Global from './global';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
// import * as BITBOXSDK from 'bitbox-sdk/lib/bitbox-sdk';


declare const Buffer;
@Injectable()

/**
 * This service manages the navigation location of our application
 *
 */
export class ApiService {

  /** Subscribe to this field to be notified of changes in the location*/
  // messageSource = new Rx.BehaviorSubject<string>('landing2');
  private currentLocation: string;
  private disableActivatedBtn = true;
  private descriptors: [[string]];
  private loggedInUser: Global.LoggedUserJson;
  // BitBox = new BITBOXSDK.default();

  public constructor(private http: HttpClient) { }

  public doStartup(): Observable<Global.LoggedUserJson> {
    // TODO also check if not login

    const paramBody = {
      'action': 'getDescriptors'
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody)) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          console.log(response);
         // let loginObj: any;
          try {
            this.descriptors = response;
            console.log(response[5]);
          } catch (objError) {
            throw new Error('Unable to get descriptors.');
          }
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }

  public getDescriptors(): [[string]] {
    return this.descriptors;
  }
  /**
   * doLogin is a singleton service that wil access the one and only database
   * 
   * @param loginData 
   */
  public doOtpRequest(loginData: Global.LoginJson): Observable<Global.ResponseJson> {
    // TODO also check if not login
    const sa =  "27" + loginData.mobileNumber.substr(1);
    console.log("sa " + sa);
    const paramBody = {
      contactName: sa,
      mobileNumber: sa,
      currentMessage: 'weblogin',
      // date: 'date',
      external: true,
    };
    return this.http.post(Global.waURL, JSON.stringify(paramBody)) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        
        tap((response: Global.ResponseJson) => {
           console.log(' testing');
          
          // do (()=> {
          //   return { response: 'OTP sent as a WhatsApp message!', mobile_no: sa };
          // })
          // console.log(response);
          // let loginObj: Global.OtpRequestResponseJson;
          // try {
          // //  loginObj = JSON.parse(response) as Global.OtpRequestResponseJson;
          //   loginObj = {response: 'OTP sent as a WhatsApp message!', mobile_no: sa};
          // } catch (objError) {
          //   loginObj = {response: 'error: No response', mobile_no: ''};
          // }
          // console.log(" loginObj " + loginObj);
          // //return {response: 'OTP sent as a WhatsApp message!', mobile_no: sa};
        })
        
      // TODO
      //  catchError(this.handleError)
    );
  }

  /**
   * doLogin is a singleton service that wil access the one and only database
   * 
   * @param loginData 
   */
  public doLogin(loginData: Global.LoginJson ): Observable<Global.ResponseJson> {
    // TODO also check if not login
    const sa =  "27" + loginData.mobileNumber.substr(1);
    console.log("sa " + sa);
    const paramBody = {
      contactName: sa,
      mobileNumber: sa,
      currentMessage: 'login ' + loginData.otp,
      // date: 'date',
      external: true,
    };
    return this.http.post(Global.waURL, JSON.stringify(paramBody)) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: Global.ResponseJson) => {
          console.log(' Test login');
          // console.log(response);
          // let loginObj: any;
          // try {
          //   loginObj = JSON.parse(response) as Global.LoggedUserJson;
          // } catch (objError) {
          //   throw new Error('Unable to login');
          // }
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }


  public doRecover(loginData: Global.LoginJson): Observable<string> {
    // TODO also check if not login

    const paramBody = {
      'action': 'login'
      , 'info': loginData
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody)) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          console.log(response);
          // Global.setUserJWT(response);
          //   Global.processJWT(response.jwt);
          //   console.log(Global.tokenInfo);
          //  const hd = new HttpHeaders().set('Authorization', response.jwt);
          // console.log(hd);
          //  Global.setGenericHeader(hd);
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }


  public doRegistration(registrationData: {any}): Observable<string> {
    // TODO also check if not login

    const paramBody = {
      'action': 'register'
      , 'info': registrationData
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody)) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          console.log(response);
          let loginObj: any;
          try {
            loginObj = JSON.parse(response);
          } catch (objError) {
            throw new Error('Unable to register');
          }
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }

  public createFavour(registrationData: {any}): Observable<string> {
    // TODO also check if not login
    console.log(registrationData);
    const paramBody = {
      'action': 'createFavour'
      , 'info': registrationData
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody)) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          console.log(response);
          let loginObj: any;
          try {
            loginObj = JSON.parse(response);
          } catch (objError) {
            throw new Error('Unable to createFavour');
          }
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }

  getLoginUser(): Global.LoggedUserJson {
    return this.loggedInUser;
  }

  setLoginUser(log: Global.LoggedUserJson) {
    this.loggedInUser = log;
  }
}
  // /**
  //  * All about satoshis
  //  * @param amount
  //  * @param whereAddress
  //  */
  // public checkEWP(thePin: string, ecn: string): Observable<{ jwt }> {
  //   const sshn = this.generateSSHN(thePin);
  //   const paramBody = {
  //     'action': 'checkEWP'
  //     , 'info': { thePin: sshn, ecn: ecn }
  //   };
