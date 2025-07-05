import * as crypto from 'crypto';

export function hash(password: string) {
  const data = crypto.createHash('sha256');
  data.update(password);
  return data.digest('hex');
};

export function compareHash(password: string, hashedPassword: string) {
  const data = hash(password);
  if (data == hashedPassword) {
    return true;
  }
  else {
    return false;
  }
}