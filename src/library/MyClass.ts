export default class MyClass {
  a: string;
  b: boolean;
  c: number;

  constructor(a: string, b: boolean, c: number) {
    this.a = a;
    this.b = b;
    this.c = (c + 1) * 2;
  }

  whoAmI() {
    return "a" + this.a + "b" + this.b + "c" + this.c;
  }
}
