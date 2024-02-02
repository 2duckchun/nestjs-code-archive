import { Controller, Get, Post } from '@nestjs/common';
import { TypestudyService } from './typestudy.service';

@Controller('typestudy')
export class TypestudyController {
  constructor(private readonly typestudyService: TypestudyService) {}

  @Get()
  getUsers() {
    return this.typestudyService.getUsers();
  }

  @Post()
  postUser() {
    return this.typestudyService.postUser();
  }
}
