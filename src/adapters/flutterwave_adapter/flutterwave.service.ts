import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlutterwaveService {
    private flutterwaveAccessToken: string = "";
    private tokenExpiresIn: number = 0;
    private lastTokenRefreshTime: number = 0; 

    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    async createPayment(paymentData: any) {
        throw new Error('Method not implemented.');
    }

    private async getFlutterwaveAccessToken(): Promise<string> {
        if(this.flutterwaveAccessToken && (Date.now() - this.lastTokenRefreshTime) + 60 < this.tokenExpiresIn) {
          return this.flutterwaveAccessToken;
        }
        await this.generateAccessToken();
        return this.flutterwaveAccessToken;
    }

    private async generateAccessToken() {
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    
        const params = {
          client_id: this.configService.get<string>('FLUTTERWAVE_PUBLIC_KEY'),
          client_secret: this.configService.get<string>('FLUTTERWAVE_SECRET_KEY'),
          grant_type: 'client_credentials'
        }
    
        const res = await firstValueFrom(this.httpService.post("https://idp.flutterwave.com/realms/flutterwave/protocol/openid-connect/token", null, {headers, params}))
        if(res.data) {
          this.flutterwaveAccessToken = res.data.access_token;
          this.tokenExpiresIn = res.data.expires_in;
          this.lastTokenRefreshTime = Date.now();
        }
    }
}