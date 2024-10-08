import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NextDeliveryMessage } from 'common/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('comms/your-next-delivery/:id')
  getNextDelivery(@Param() params: { id: string }): NextDeliveryMessage {
    return this.appService.getNextDeliveryMessage(params.id);
  }
}
