import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';

interface UserRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: UserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('Email/Senha incorretos!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/Senha incorretos!');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export { AuthUserService };
