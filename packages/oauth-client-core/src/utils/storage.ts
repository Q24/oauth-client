export function removeByRegex(storage: Storage, regexString: string): void {
  const regex = new RegExp(regexString);

  Object.keys(storage)
    .filter((key) => regex.test(key))
    .forEach((key) => storage.removeItem(key));
}
