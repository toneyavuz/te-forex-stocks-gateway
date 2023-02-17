import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CreateCalculatorDto, UpdateCalculatorDto } from '../../../module/calculator/dto/create-calculator.dto';
import { AppModule } from '../../../app.module';

const createBody: CreateCalculatorDto = {
  lots: [
    {
      count: 10,
      value: 0.5,
    },

    {
      count: 5,
      value: 0.2,
    },

    {
      count: 1,
      value: 0.1,
    },
  ],
  name: 'Calculator Testing',
  fee: 2000,
  buyTotalCash: 1200,
  sellTotalCash: 1600,
  buyCollateral: 420,
  sellCollateral: 490,
  buyPrice: 22910,
  sellPrice: 22928,
  buySpread: 20,
  sellSpread: 22,
  buyLiquidation: 0.2,
  sellLiquidation: 0.2,
};

const updateBody: UpdateCalculatorDto = {
  id: undefined,
  name: 'Calculator updated',
  lots: [
    {
      count: 4,
      value: 0.5,
    },

    {
      count: 2,
      value: 0.2,
    },

    {
      count: 1,
      value: 0.1,
    },
  ],
};

describe('Calculator Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it(`/POST Create Calculator`, () => {
    return request(app.getHttpServer())
      .post('/calculator')
      .send(createBody)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        const lostsCount = createBody.lots?.reduce((total, item) => total + item.count, 0);
        const pass = Object.keys(res.body).length === 3 && res.body.calculator !== null && res.body.buy.length === lostsCount && res.body.sell.length === lostsCount;
        if(pass) {
          updateBody.id = res.body.calculator._id;
        }
        return pass;
      });
  });

  it(`/POST Create Calculator Empty Body`, () => {
    return request(app.getHttpServer())
      .post('/calculator')
      .send(updateBody)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'fee must be a number conforming to the specified constraints',
          'fee should not be empty',
          'buyTotalCash must be a number conforming to the specified constraints',
          'buyTotalCash should not be empty',
          'sellTotalCash must be a number conforming to the specified constraints',
          'sellTotalCash should not be empty',
          'buyCollateral must be a number conforming to the specified constraints',
          'buyCollateral should not be empty',
          'sellCollateral must be a number conforming to the specified constraints',
          'sellCollateral should not be empty',
          'buyPrice must be a number conforming to the specified constraints',
          'buyPrice should not be empty',
          'sellPrice must be a number conforming to the specified constraints',
          'sellPrice should not be empty',
          'buySpread must be a number conforming to the specified constraints',
          'buySpread should not be empty',
          'sellSpread must be a number conforming to the specified constraints',
          'sellSpread should not be empty',
          'buyLiquidation must be a number conforming to the specified constraints',
          'buyLiquidation should not be empty',
          'sellLiquidation must be a number conforming to the specified constraints',
          'sellLiquidation should not be empty'
        ],
        error: 'Bad Request'
      });
  });


  it(`/PATCH Update Calculator`, () => {
    return request(app.getHttpServer())
      .patch(`/calculator/${updateBody.id}`)
      .send(updateBody)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        const lostsCount = updateBody.lots?.reduce((total, item) => total + item.count, 0);
        const pass = Object.keys(res.body).length === 3 && res.body.calculator !== null && res.body.buy.length === lostsCount && res.body.sell.length === lostsCount;
        return pass;
      });
  });

  it(`/GET Find All Calculator`, () => {
    return request(app.getHttpServer())
      .get('/calculator')
      .expect(200)
      .expect((res) => {
        if(!Array.isArray(res.body)) throw new Error(`${typeof res.body} Response is not array`);
      });
  });

  it(`/DELETE Delete Calculator`, () => {
    return request(app.getHttpServer())
      .delete(`/calculator/${updateBody.id}`)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
      });
  });
});
