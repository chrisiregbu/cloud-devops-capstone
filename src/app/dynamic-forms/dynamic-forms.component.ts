import { Component, Injectable, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';


// Superclass for all kinds of form items.
class FormItemBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: {
                  value?: T,
                  key?: string,
                  label?: string,
                  required?: boolean,
                  order?: number,
                  controlType?: string
              } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}


// Textbox form items.
class TextboxFormItem extends FormItemBase<string> {

  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}


// Dropdown form items.
class DropdownFormItem extends FormItemBase<string> {

  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}


// Encapsulate form items in a FormGroup of FormControl objects.
@Injectable({
  providedIn: 'root',
})
class FormItemsService {

  toFormGroup(formItems: FormItemBase<any>[]) {
    let group: any = {};
    for (let formItem of formItems) {
      group[formItem.key] = formItem.required ? new FormControl(formItem.value || '', Validators.required)
                                              : new FormControl(formItem.value || '');
    }
    return new FormGroup(group);
  }
}


// Component to represent one item in a dynamic form.
@Component({
  selector:    'dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
  styleUrls: ['./dynamic-form-item.component.css']
})
export class DynamicFormItemComponent {

  @Input() 
  formItem: FormItemBase<any>;

  @Input() 
  form: FormGroup;

  get isValid() { 
    return this.form.controls[this.formItem.key].valid; 
  }
}


// Component to represent an entire dynamic form.
@Component({
  selector:    'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() 
  formItems: FormItemBase<any>[] = [];

  form: FormGroup;
  payLoad = '';

  constructor(private service: FormItemsService) {}

  ngOnInit() {
    this.form = this.service.toFormGroup(this.formItems);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}

// Top-level component, which drives the whole thing.
@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
})
export class DynamicFormsComponent {

  formItems: any[];

  constructor() {

      let items: FormItemBase<any>[] = [
          new TextboxFormItem({
              key: 'firstName',
              label: 'Customer number',
              value: '',
              required: true,
              order: 1
          }),
      ];

      this.formItems = items.sort((a, b) => a.order - b.order);
  }
}
