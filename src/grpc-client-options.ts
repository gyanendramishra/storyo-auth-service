import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from './auth/interface';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: AUTH_PACKAGE_NAME,
    url: 'auth-service:4002',
    protoPath: join(__dirname, './auth/auth.proto'),
  },
};
