import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface CreateTransactionBody {
    amount: string;
    email: string;
    reference: string;
    callback_url: string;
}

export interface PaystackTransactionInitializeResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}

@Injectable()
export class PaystackService {

    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    async createTransaction(body: CreateTransactionBody): Promise<PaystackTransactionInitializeResponse | null> {
        const paystackSecret = this.configService.get<string>("PAYSTACK_SECRET_KEY");
        const headers = {
            'Authorization': `Bearer ${paystackSecret}`,
            'Content-Type': 'application/json',
        }
        try{
            const response = await firstValueFrom(this.httpService.post('https://api.paystack.co/transaction/initialize', body, {headers}));
            if(response.status !== 200 || !response.data) {
                console.log(response.data)
                return null
            }
            return response.data;
        } catch(error) {
            console.error(error);
        }
        
        return null;
    }
    async verifyTransaction(reference: string) {
        const response = await firstValueFrom(this.httpService.get(`https://api.paystack.co/transaction/verify/${reference}`));
        return response.data;
    }


}
