export class Description {
  private limitLength = 1024;

  constructor(readonly value: string, limitLenght?: number) {
    if (limitLenght) this.limitLength = limitLenght;
  }

  isValid(): boolean {
    return this.value.length < 3 || this.value.length > this.limitLength
      ? false
      : true;
  }
}
