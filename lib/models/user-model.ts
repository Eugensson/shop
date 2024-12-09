import bcrypt from "bcryptjs";
import { Schema, model, models, Types, CallbackError } from "mongoose";

export type User = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  favoriteProducts: Types.ObjectId[];
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/i, "Введіть дійсну електронну адресу"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Пароль має бути не менше 6 символів"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    favoriteProducts: {
      type: [Types.ObjectId],
      ref: "Product",
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err: unknown) {
      if (err instanceof Error) {
        next(err as CallbackError);
      } else {
        next(new Error("Невідома помилка під час хешування пароля"));
      }
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = models?.User || model("User", UserSchema);
