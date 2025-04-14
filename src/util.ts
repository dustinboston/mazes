export function sample<T>(array: T[]): T | undefined {
  // Return a random element from the array
  return array[Math.floor(Math.random() * array.length)];
}
