import { ValueTransformer } from 'typeorm';
import { encrypt, decrypt } from './encryption.utils';

export class EncryptionTransformer implements ValueTransformer {
  to(value: string | null | undefined): string | null | undefined {
    if (value) {
      return encrypt(value);
    }
    return value;
  }

  from(value: string | null | undefined): string | null | undefined {
    if (value) {
      return decrypt(value);
    }
    return value;
  }
}
