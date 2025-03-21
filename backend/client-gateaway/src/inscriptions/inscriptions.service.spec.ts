import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionsService } from './inscriptions.service';
import { HttpModule } from '@nestjs/axios';

describe('InscriptionsService', () => {
  let service: InscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [InscriptionsService],
    }).compile();

    service = module.get<InscriptionsService>(InscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
