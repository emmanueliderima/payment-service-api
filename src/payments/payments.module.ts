import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaystackModule } from 'src/adapters/paystack_adapter/paystack.module';
import { FlutterwaveModule } from 'src/adapters/flutterwave_adapter/flutterwave.module';

@Module({
  imports: [ PaystackModule, FlutterwaveModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
