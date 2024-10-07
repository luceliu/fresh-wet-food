import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

type NextDeliveryMessage = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

const formatCatNameList = (names: string[]) => {
  if (names.length === 0) {
    return '';
  }
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getNextDeliveryMessage(userId: string): NextDeliveryMessage {
    const filePath = join(__dirname, '..', 'data.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const myJson = JSON.parse(fileContent);
    const user = myJson.find((x: any) => x.id === userId);
    const catNames = user.cats.map((cat: any) => cat.name);
    const catNamesList = formatCatNameList(catNames);
    console.log(catNamesList);
    console.log(user);
    return {
      title: `Your next delivery for ${catNamesList}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNamesList}'s fresh food.`,
      totalPrice: 134.0,
      freeGift: true,
    };
  }
}
