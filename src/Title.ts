export class Title {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }

  isValid(): boolean {
    if (this.value.length < 2 || this.value.length > 32) {
      return false;
    }
    return true;
  }

  getValue(): string {
    return this.value;
  }
}
