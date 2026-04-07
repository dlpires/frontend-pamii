import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_KEY || 'default_secret_key_32_characters'; // Use environment variables for security
const iv = crypto.randomBytes(16); // Initialization vector

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (hash: string): string => {
  const [ivHex, encryptedText] = hash.split(':');
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivHex, 'hex')
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString();
};
