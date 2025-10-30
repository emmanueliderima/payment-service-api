import { Module } from "@nestjs/common"
import { PaystackService } from "./paystack.service"
import { HttpModule } from "@nestjs/axios"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [PaystackService],
    exports: [PaystackService]
})

export class PaystackModule {}