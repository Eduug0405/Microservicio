export class Points {
  private constructor(private readonly value: number) {}

  static create(value: number, allowNegative = false): Points {
    if (!Number.isInteger(value)) {
      throw new Error('Los puntos deben ser un número entero');
    }
    if (!allowNegative && value < 0) {
      throw new Error('Los puntos deben ser mayores o iguales a 0');
    }
    return new Points(value);
  }

  get raw(): number {
    return this.value;
  }

  add(other: Points): Points {
    return Points.create(this.value + other.value);
  }

  subtract(other: Points): Points {
    if (other.value > this.value) {
      throw new Error('No puedes restar más puntos de los que tienes');
    }
    return Points.create(this.value - other.value);
  }
}
