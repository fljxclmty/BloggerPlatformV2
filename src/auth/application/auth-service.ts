import { usersQueryRepository } from "../../users/repositories/users-q-repo";
import jwt from "jsonwebtoken";
import { Result } from "../../common/result/result-type";
import { ResultStatus } from "../../common/result/result-code";
import { bcryptService } from "../../common/services/bcrypt-service";
import { add } from "date-fns";
import { usersRepository } from "../../users/repositories/users-repo";
import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { sendRegistrationMail } from "./mail-service";
import { RegistrationConfirmationCodeModel } from "../models/auth-models";
import { usersCollection } from "../../db/mongo-db";
//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

export const authService = {
  async loginUser(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<string | null>> {
    const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);
    const passwordHash = await bcryptService.hashPassword(password);
    const isMatched = await bcryptService.comparePasswords(
      password,
      passwordHash,
    );

    if (!user || !isMatched) {
      return {
        status: ResultStatus.Unauthorized,
        errorMessage: "Unauthorized",
        extensions: [
          { field: "Login, email or password", message: "Wrong credentials" },
        ],
        data: null,
      };
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const token = jwt.sign({ userId: user._id.toString() }, secret, {
      expiresIn: "1h",
    });

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: token,
    };
  },

  async registerUser(login: string, pass: string, email: string) {
    const user = await usersQueryRepository.doesUserExistsByLoginAndEmail(
      login,
      email,
    );

    if (user) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "User already exists",
        extensions: [
          {
            field: "Login, email",
            message: "User with this login or email already exists",
          },
        ],
        data: null,
      };
    }

    const passwordHash = await bcryptService.hashPassword(pass);
    const confirmationCode = randomUUID();

    const newUser = {
      _id: new ObjectId(),
      login: login,
      email: email,
      passwordHash: passwordHash,
      createdAt: new Date().toISOString(),
      emailConfirmation: {
        confirmationCode: confirmationCode,
        expirationDate: add(new Date(), {
          hours: 1,
          minutes: 30,
        }),
        isConfirmed: false,
      },
    };

    await usersRepository.createUser(newUser);

    const activationLink = `https://bloggerplatformv2.onrender.com/confirm-registration?code=${confirmationCode}`;

    try {
      await sendRegistrationMail(newUser.email, activationLink);
    } catch (e) {
      console.error("Mail sending error", e);
    }

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: newUser,
    };
  },

  async confirmRegistration(code: string) {
    // 1. Ищем пользователя с таким кодом подтверждения
    const user = await usersCollection.findOne({
      "emailConfirmation.confirmationCode": code,
    });

    // 2. Если пользователь не найден — код неверный
    if (!user) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "User does not exist",
        extensions: [
          {
            field: "Login, email or password",
            message: "User does not exist",
          },
        ],
        data: null,
      };
    }

    // 3. Проверяем, не подтвержден ли он уже
    if (user.emailConfirmation.isConfirmed) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "Already confirmed",
        extensions: [
          {
            field: "Confirmation code",
            message: "Already confirmed",
          },
        ],
        data: null,
      };
    }

    // 4. Проверяем дату истечения кода
    if (user.emailConfirmation.expirationDate < new Date()) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "Confirmation code has expired",
        extensions: [
          {
            field: "Confirmation code",
            message: "Confirmation code has expired",
          },
        ],
        data: null,
      };
    }

    // 5. Если всё ок — обновляем статус на confirmed: true
    const result = await usersCollection.updateOne(
      { _id: user._id },
      { $set: { "emailConfirmation.isConfirmed": true } },
    );

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: result.modifiedCount === 1,
    };
  },

  async emailConfirmationResending(email: string) {
    const user = await usersCollection.findOne({
      email: email,
    });

    if (!user) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "User does not exist",
        extensions: [
          {
            field: "Login, email or password",
            message: "User does not exist",
          },
        ],
        data: null,
      };
    }

    if (user.emailConfirmation.isConfirmed) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "Already confirmed",
        extensions: [
          {
            field: "Confirmation code",
            message: "Already confirmed",
          },
        ],
        data: null,
      };
    }

    const result = await usersCollection.updateOne(
      { _id: user._id },
      { $set: { "emailConfirmation.isConfirmed": true } },
    );

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: result.modifiedCount === 1,
    };
  },
};
