import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import * as fs from 'fs'; // Import the file system module

jest.mock('fs'); // Tell Jest to mock the `fs` module

describe('ItemsService', () => {
  let appService: AppService;

  const mockJsonData = [
    {
      id: '76d6eb8d-5c2e-49f7-b798-d69700dda4c3',
      firstName: 'Dolores',
      lastName: 'Hartmann',
      email: 'Dolores_Hartmann10@hotmail.com',
      cats: [
        {
          name: 'Destiny',
          subscriptionActive: true,
          breed: 'American Shorthair',
          pouchSize: 'F',
        },
        {
          name: 'Tiffany',
          subscriptionActive: false,
          breed: 'Minskin',
          pouchSize: 'B',
        },
        {
          name: 'Alexandre',
          subscriptionActive: true,
          breed: 'Somali',
          pouchSize: 'A',
        },
      ],
    },
    {
      id: '853f5f64-3734-4ed1-9012-562735c1fe32',
      firstName: 'Aylin',
      lastName: 'Bechtelar',
      email: 'Aylin.Bechtelar@hotmail.com',
      cats: [
        {
          name: 'Connor',
          subscriptionActive: true,
          breed: 'Bombay',
          pouchSize: 'F',
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should return the correct delivery message for the given user with one active subscription cat', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(mockJsonData),
    );
    const deliveryMessage = appService.getNextDeliveryMessage(
      '853f5f64-3734-4ed1-9012-562735c1fe32',
    );
    expect(deliveryMessage).toEqual({
      title: 'Your next delivery for Connor',
      message:
        "Hey Aylin! In two days' time, we'll be charging you for your next order for Connor's fresh food.",
      totalPrice: 71.25,
      freeGift: false,
    });
  });

  it('should return the correct delivery message for the given user with three cats but only two have active subscriptions', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(mockJsonData),
    );
    const deliveryMessage = appService.getNextDeliveryMessage(
      '76d6eb8d-5c2e-49f7-b798-d69700dda4c3',
    );
    expect(deliveryMessage).toEqual({
      title: 'Your next delivery for Destiny and Alexandre',
      message:
        "Hey Dolores! In two days' time, we'll be charging you for your next order for Destiny and Alexandre's fresh food.",
      totalPrice: 126.75,
      freeGift: true,
    });
  });
});
