import { Test, TestingModule } from '@nestjs/testing';
import { JoineeService } from './joinee.service';

describe('JoineeService', () => {
  let service: JoineeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoineeService],
    }).compile();

    service = module.get<JoineeService>(JoineeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
