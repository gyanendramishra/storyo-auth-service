import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserType } from '../user.schema';
import { JwtService } from './jwt.service';
import {
  RegisterRequestDto,
  LoginRequestDto,
  ValidateRequestDto,
} from '../dto/auth.dto';
import {
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
} from '../interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserType>,
  ) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async register(
    userDto: RegisterRequestDto,
  ): Promise<RegisterResponse> {
    let auth = await this.userModel.findOne({ email: userDto.email });

    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    auth = new this.userModel({
      email: userDto.email,
      password: this.jwtService.encodePassword(userDto.password),
    });

    await auth.save();

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({
    email,
    password,
  }: LoginRequestDto): Promise<LoginResponse> {
    const auth = await this.userModel.findOne({ email });

    if (!auth) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found'],
        token: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      password,
      auth.password,
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Password wrong'],
        token: null,
      };
    }

    const token: string = this.jwtService.generateToken(auth);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({
    token,
  }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }

    const auth = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: auth._id };
  }
}
