import { JwtPayload } from "jsonwebtoken";

export default interface IJwtProvider {
    verify(token: string): Promise<string|JwtPayload>; 
}
  