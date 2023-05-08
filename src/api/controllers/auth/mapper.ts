import { UserOutput } from "../../../db/models/Auth";

import { CreateUser } from "../../interfaces";
import { emailVerification } from "../../interfaces/auth.interface";

export const ToAuth = (user: UserOutput) : CreateUser => ({
    name: user.name,
    slug: user.slug,
    email: user.email,
    password: user.password,
})

export const toVerifyEmail = (user: UserOutput) : emailVerification => ({
    email: user.email
}) 