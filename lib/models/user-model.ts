import bcrypt from "bcryptjs";
import { Schema, model, models, Types, CallbackError } from "mongoose";

export type User = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
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
      match: [/.+\@.+\..+/i, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
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
        next(new Error("Unknown error during password hashing"));
      }
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = models?.User || model("User", UserSchema);
