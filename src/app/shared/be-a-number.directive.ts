import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
// export function mustStartWithZeroValidator(nameRe: RegExp): ValidatorFn {
  export function beANumberValidator(): ValidatorFn { 
  return (control: AbstractControl): {[key: string]: any} | null => {
   // let nameRe: RegExp = new RegExp ('^0\\d{0,9}', 'i');
    
    const forbidden = parseInt(control.value) != control.value;
    // console.log("con " + control.value + " " + parseInt(control.value)) ;
    return forbidden ? {'beANumber': {value: "control.value"}} : null;
  };
}

@Directive({
  selector: '[appBeANumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: BeANumberDirective, multi: true}]
})
export class BeANumberDirective implements Validator {
  @Input('appBeANumber') forbiddenName: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenName ? beANumberValidator()(control)
                              : null;
  }
}
