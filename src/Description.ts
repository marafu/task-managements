export class Description {
  private value: string;
  private limitLength = 1024;
  constructor(value: string, limitLenght?: number) {
    this.value = value;
    if (limitLenght) this.limitLength = limitLenght;
  }

  isValid(): boolean {
    return this.value.length < 3 || this.value.length > this.limitLength
      ? false
      : true;
  }

  getValue() {
    return this.value;
  }
}
