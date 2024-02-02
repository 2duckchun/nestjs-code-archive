import { Test, TestingModule } from '@nestjs/testing';
import { TypestudyController } from './typestudy.controller';
import { TypestudyService } from './typestudy.service';

describe('TypestudyController', () => {
  let controller: TypestudyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypestudyController],
      providers: [TypestudyService],
    }).compile();

    controller = module.get<TypestudyController>(TypestudyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
