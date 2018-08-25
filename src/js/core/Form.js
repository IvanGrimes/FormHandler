import {
  CLICK,
} from '../common/constants';

export default class Form {
  constructor({ ...opts }) {
    this.node = opts.node;
    this.submit = opts.submit;
    this.classNames = opts.classNames;
    this.fields = opts.fields;
    this.listener = opts.listener;
    this.valid = null;
    this.submitted = false;
    this.sended = null;
    this.callback = opts.callback;
    console.log(this.classNames)
    this.submit.addEventListener(CLICK, this.listener);
  }

  get fieldsValidity() {
    const validness = new Set();

    // eslint-disable-next-line no-unused-vars
    Object.entries(this.fields).forEach(([name, field]) => {
      if (field.validation) {
        validness.add(field.valid);
      }
    });

    return !validness.has(false);
  }

  setState() {
    const validity = this.fieldsValidity;

    this.callback(this.node, this.valid, validity);

    this.valid = validity;

    if (this.submitted) {
      this.toggleClassNames();
    }
    this.toggleSubmitButton();
  }

  toggleClassNames() {
    if (this.valid) {
      this.node.classList.remove(this.classNames.isNotValid);
      this.node.classList.add(this.classNames.isValid);
    } else {
      this.node.classList.remove(this.classNames.isValid);
      this.node.classList.add(this.classNames.isNotValid);
    }
  }

  toggleSubmitButton() {
    if (this.valid) {
      this.submit.classList.remove(this.classNames.disabledSubmitButton);
    } else {
      this.submit.classList.add(this.classNames.disabledSubmitButton);
    }
  }

  clear() {
    // eslint-disable-next-line no-unused-vars
    Object.entries(this.fields).forEach(([name, field]) => {
      field.clear();
    });

    this.callback(this.node, this.valid, false);
    this.valid = false;
    this.node.classList.remove(this.classNames.isNotValid);
    this.node.classList.remove(this.classNames.isValid);
  }
}
