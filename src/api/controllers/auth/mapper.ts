import { UserOutput } from "../../../db/models/Auth";

import { CreateUser } from "../../interfaces";

export const ToAuth = (user: UserOutput) : CreateUser => ({
    name: user.name,
    slug: user.slug,
    email: user.email,
    password: user.password,
})