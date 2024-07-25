import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { readFileSync } from 'fs';

export class JwtFactory implements JwtOptionsFactory {
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const publicKey = readFileSync(__dirname + '/assets/jwtRS256.key');
    const privateKey = readFileSync(__dirname + '/assets/jwtRS256.key.pub');

    return {
      publicKey,
      privateKey,
      secretOrPrivateKey: privateKey,
      signOptions: { expiresIn: '60m', algorithm: 'RS256' },
    };
  }
}
