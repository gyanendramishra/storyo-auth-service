import { EStatus } from './user.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ maxlength: 50, required: true })
  firstName: string;

  @Prop({ maxlength: 50, required: true })
  lastName: string;

  @Prop({ maxlength: 15, required: true })
  phone: string;

  @Prop({ maxlength: 50, required: true, unique: true })
  email: string;

  @Prop({ maxlength: 200, required: true })
  password: string;

  @Prop({
    maxlength: 200,
    required: true,
    enum: [EStatus.ACTIVE, EStatus.INACTIVE, EStatus.BLOCKED],
    default: EStatus.INACTIVE,
  })
  status: string;

  @Prop({ default: Date.now })
  memberSince: Date;
}

export interface UserType extends User {
  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre<User>('save', async function (next) {
//   if (!this.isModified('password') || !this.isNew) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });
