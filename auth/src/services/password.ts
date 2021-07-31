import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// we want to turn scrypt's callbacks into promises, we can do this by the internal promisy util.
const scryptAsync = promisify(scrypt);

// Going to begin hashing passwords, instead of simply using bcrypt I want this project to use as little external libraries as possible, so a bit of manual work ahead.
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`

  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashedPassword;

  }
}