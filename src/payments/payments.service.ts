import { Injectable, HttpException } from '@nestjs/common';
import { PaystackService } from 'src/adapters/paystack_adapter/paystack.service';
import { FlutterwaveService } from 'src/adapters/flutterwave_adapter/flutterwave.service';
import { HttpStatusCode } from 'axios';

@Injectable()
export class PaymentsService {
    constructor(private readonly paystackService: PaystackService, private readonly flutterwaveService: FlutterwaveService) {}
  
    async createPayment(paymentData: any) {
        const res = await this.paystackService.createTransaction(paymentData);
        if(!res) {
            throw new HttpException('Payment failed', HttpStatusCode.InternalServerError);
        }
        return res;
    }
}
