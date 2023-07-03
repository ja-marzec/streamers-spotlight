import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClearDataSerice } from './clear-data/clear-data.service';

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const clearDataSerice = app.get(ClearDataSerice);

  await clearDataSerice.clearData();
  await app.close();

  console.log('Data clearing complete.');
};

bootstrap();
