import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://gcm:gKbhswle0yBkE5Ap@cluster1.gne07sr.mongodb.net/gcm-pwa?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
