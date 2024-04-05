function clamp<T>(value: T, min: T, max: T): T {
  return min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value;
}

export default clamp;
