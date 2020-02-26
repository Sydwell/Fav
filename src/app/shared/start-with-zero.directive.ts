import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
// export function mustStartWithZeroValidator(nameRe: RegExp): ValidatorFn {
  export function mustStartWithZeroValidator(): ValidatorFn { 
  return (control: AbstractControl): {[key: string]: any} | null => {
    let nameRe: RegExp = new RegExp ('^0\\d{0,9}', 'i');
    const forbidden = !nameRe.test(control.value);
    return forbidden ? {'mustStartWithZero': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appMustStartWithZero]',
  providers: [{provide: NG_VALIDATORS, useExisting: MustStartWithZeroDirective, multi: true}]
})
export class MustStartWithZeroDirective implements Validator {
  @Input('appMustStartWithZero') forbiddenName: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenName ? mustStartWithZeroValidator()(control)
                              : null;
  }
}

