import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto, LoginDto, RegisterDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: dto.login },
    });

    if (!user) throw new BadRequestException('Credentials incorrect');

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) throw new BadRequestException('Password incorrect');

    return {
      token: this.getToken(user.id),
      role: user.role,
    };
  }

  async register(dto: RegisterDto) {
    const isExist = await this.prisma.user.findFirst({
      where: { login: dto.login },
    });

    if (isExist) {
      throw new BadRequestException('Login taken');
    }

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: hash,
      },
    });

    return {
      token: this.getToken(user.id),
      role: user.role,
    };
  }

  async changePassword(user: User, dto: ChangePasswordDto) {
    const { id, password } = user;
    const { currentPassword, newPassword } = dto;

    const pwMatches = await argon.verify(password, currentPassword);

    if (!pwMatches) {
      throw new BadRequestException('Incorrect current password');
    }

    const hash = await argon.hash(newPassword);

    const newUserData = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hash,
      },
    });

    delete newUserData.password;

    return newUserData;
  }

  async getToken(userId: number): Promise<string> {
    const payload = {
      userId,
    };

    const secret = this.config.get('SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: secret,
    });

    return token;
  }
}
