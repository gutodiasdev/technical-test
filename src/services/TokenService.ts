import { SessionData } from "@/contexts/AuthContext";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

export interface TokenPayload {
  id: number;
  email: string;
  name: string;
}

class TokenService {
  private key: Uint8Array<ArrayBufferLike>;

  constructor() {
    this.key = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTH_SECRET);
  }

  async signToken(payload: TokenPayload) {
    const jwtPayload: JWTPayload = {
      ...payload
    };
    return await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1 day from now')
      .sign(this.key);
  }

  async verifyToken(input: string) {
    const { payload } = await jwtVerify(input, this.key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionData;
  }
}

export const tokenService = new TokenService();