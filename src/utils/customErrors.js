export default class customErrors {
  static createError(name, cause, message, code) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = code
    throw error;
  }
}
