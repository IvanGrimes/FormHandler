import Field from './Field';

export default class Input extends Field {
  constructor({ ...opts }) {
    super({ ...opts });
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

  clear() {
    this.callback(this.validation, this.name, this.node, this.valid, false);
    this.node.value = '';
    this.valid = false;
    this.submitted = false;
    this.node.classList.remove(this.classNames.isNotValid);
    this.node.classList.remove(this.classNames.isValid);
  }
}
