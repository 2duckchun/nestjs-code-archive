import { Test, TestingModule } from '@nestjs/testing';
import { TypestudyService } from './typestudy.service';

describe('TypestudyService', () => {
  let service: TypestudyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypestudyService],
    }).compile();

    service = module.get<TypestudyService>(TypestudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
