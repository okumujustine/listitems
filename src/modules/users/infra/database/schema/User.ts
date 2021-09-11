
import { IUserSchemaDTO } from "@modules/users/dtos/IUserSchemaDTO";
import {Schema} from "mongoose"


  
  const UserSchema = new Schema<IUserSchemaDTO>({
    id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    iat: { type: Number, required: true },
  });

  export { UserSchema }