import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../../database/prisma/prisma.service';
import { AuthDto } from './dto/AuthDto';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
    ){}

  async sigInClient({login,password}:AuthDto){
    const user = await this.prisma.viewer.findUnique({
        where:{
            login
        }
    });

    if (!user)
        throw new ForbiddenException(
            'Credentials incorrect',
        );

    // compare password
     const pwMatches = await argon.verify(
        user.password,
        password,
   ); 

    // if password incorrect throw exception
    if (!pwMatches)
    throw new ForbiddenException(
    'Credentials incorrect',
  );

  return this.signToken(user.id, user.login);

}

async signToken(userId: string, login: string): Promise<{access_token: string}> {
  const payload = {
    sub: userId,
    login
  }
  const secret = this.config.get('JWT_SECRET');
  
  const token = await this.jwt.signAsync(
    payload,
    {
      expiresIn: '1d',
      secret: secret,
    },
  );

  return {
    access_token: token,
  };
}
}
