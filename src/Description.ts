export class Description {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }

  isValid(): boolean {
    return this.value.length < 3 || this.value.length > 1024 ? false : true;
  }

  getValue() {
    return this.value;
  }
}
