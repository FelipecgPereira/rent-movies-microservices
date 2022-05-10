import { AuthDto } from './dto/AuthDto';
import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';


@Controller('authenticate')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  sigIn(@Body() {login,password}:AuthDto) {
    return this.accountService.sigInClient({login,password});
  }

}
