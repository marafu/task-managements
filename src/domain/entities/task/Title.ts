export class Title {
  constructor(readonly value: string) {}

  isValid(): boolean {
    if (this.value.length < 2 || this.value.length > 32) {
      return false;
    }
    return true;
  }
}
