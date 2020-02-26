'use strict';
declare const Buffer;

import { HttpHeaders } from '@angular/common/http';
// import * as jwt_decode from 'jwt-decode';

export const sep = '/';
// export const version = '0.43a'; in wild release
// added beforeunload on start
// moved disable = true; in start
// change send to spend
export const version = '0.04';
// fix https://stackoverflow.com/a/50390802/344050

// export const isDesktopDevice: boolean;

// https://stackoverflow.com/a/9039885/344050
export const apple = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
// export const bitcoin = require('bitcoinjs-lib');

export const Nationality = ['', 'Angola', 'Botswana', 'Congo', 'Kenya'
  , 'Lesotho', 'Malawi', 'Mozambique', 'Namibia', 'Nigeria', 'South Africa', 'Swaziland', 'Uganda', 'Zambia', 'Zimbabwe'];
export const MaritalStatus = ['', 'Single', 'Married', 'Divorced', 'Widowed'];
// export const StateOfHealth = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const Province = ['', 'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo'
  , 'Mpumalanga', 'North Cape', 'North West', 'Western Cape'];
  // tslint:disable-next-line:max-line-length
export const Qualifications = ['', 'National Certificate', 'Higher National Certificate', 'National Diploma', 'Higher National Diploma', 'Bachelor Degree'
  , '	Masters Degree', 'Doctoral Degree', 'PhD'];
export const Support = ['', 'Website', 'Validation', 'Certification', 'General'];
// export let descriptors: any;

export const fees = 0.00003;
export const dust = 0.00000547;


// tslint:disable-next-line:max-line-length
export const Loading = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';


// export const favURL = 'http://favour.bquest.co.za/favour/server/fav-api.php'; // must still create
export const favURL = 'http://bquest.co.za/fav-api/fav-api.php';
export const waURL = 'https://wallet.bquest.co.za/bq/bq-web.php';

export const SMS_service_no = '0767449983';

export interface FinTekJson {
  id: number;
  codeName: string;
  name: string;
  // level_value: number;
  base: string;
  type: string;
  // oracle: number,
}

export interface LoggedUserJson {
  username: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  publicKey: string;
  studentNo: string;
}

/**
 * Only the request response
 * As heavy lifting done by asychronous server daemon
 * 
 */
export interface ResponseJson {
  response: string;
  mobile_no: string;
}

export interface PaymentRequest {
  amount: number;
  address: string;
  detail: string;
}

export let nonce = '';
export function setNonce(): void {
  if (nonce === '') {
    nonce = Math.floor(Math.random() * 1000000000) + 'MX';
  }
}

export let eMobile: string;
export function setEMobile(newEMobile: string): void {
  eMobile = newEMobile;
}

let genericHeader = <HttpHeaders>{};

export function setGenericHeader(genHeader: HttpHeaders): void {
  genericHeader = genHeader;
}

export function getGenericHeader(): { headers: HttpHeaders } {
  return { headers: genericHeader };
}

export let finTek: [FinTekJson];

export function setFinTek(theFinTek: [FinTekJson]) {
  finTek = theFinTek;
}

/**
 *  Checks if a variable has a real value
 * @param variable
 */
export function anything(variable: any): boolean {
  if (variable === null || variable === undefined) {
    return false;
  }
  if (typeof variable === 'string' && variable === '') {
    return false;
  }
  return true;
}

/**
 * Converts a MySql string to date time
 * Possible improvement for only dates
 * @param mysqlDateTimeStr
 */
export function mySql2DateTime(mysqlDateTimeStr: string): Date {
  const a = (mysqlDateTimeStr).split(' ');
  const d = a[0].split('-');
  const t = a[1].split(':');
  return new Date(+d[0], (+d[1] - 1), +d[2], +t[0], +t[1]);
}

export interface SingleJson {
  table: string;
  column: string;
  value: string;
  id: number;
  idColumn: string;
}

export interface HistoryJson {
  spend: string;
  credit: string; // Sent or Received
  target: string;
  // level_value: number;
  date: number;
  amount: number;
  txid: string;
}

export interface LoginJson {
  mobileNumber: string;
  otp: string; // Sent or Received
}

/**
 * Returns the  url field value
 * If no field supply returns an object with all fields as fields
 * @param field
 */
export function getSearchParams(field?: string) {
  const p = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, ki, v) { p[ki] = v; return v; });
  return field ? p[field] : p;
}

/**
 *
 * https://stackoverflow.com/a/50767210/344050
 * @export
 * @param {Buffer} buffer
 * @returns {string}
 */
export function bufferToHex(buffer: any): string {
  return Array
    .from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
