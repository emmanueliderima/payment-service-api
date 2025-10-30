import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [PaymentsModule, ConfigModule.forRoot({
    isGlobal: true
  })]
})
export class AppModule {}
