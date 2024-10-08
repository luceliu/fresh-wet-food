import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { NextDeliveryMessage, User, Cat } from '../common/types';

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

  getOrderPrice(cats: Cat[]): number {
    const pouchSizeValues: { [key: string]: number } = {
      A: 55.5,
      B: 59.5,
      C: 62.75,
      D: 66.0,
      E: 69.0,
      F: 71.25,
    };

    return cats.reduce((total, cat) => {
      const value = pouchSizeValues[cat.pouchSize];
      return total + (value || 0);
    }, 0);
  }

  getNextDeliveryMessage(userId: string): NextDeliveryMessage {
    const filePath = join(__dirname, '..', '..', 'data.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const userDataJson = JSON.parse(fileContent);
    const user = userDataJson.find((u: User) => u.id === userId);

    const activeSubscriptionCats = user.cats.filter(
      (cat: Cat) => cat.subscriptionActive,
    );

    // assuming that if a cat's subscription is inactive, we won't display their name at all in the messaging
    const catNames = activeSubscriptionCats.map((cat: Cat) => cat.name);
    const catNamesList = formatCatNameList(catNames);
    const orderPrice = this.getOrderPrice(activeSubscriptionCats);

    return {
      title: `Your next delivery for ${catNamesList}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNamesList}'s fresh food.`,
      totalPrice: orderPrice,
      freeGift: orderPrice > 120,
    };
  }
}
