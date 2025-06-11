import { z } from 'zod'

const required256message = " is required and should be less than 256 characters";
const nameMessage = "Name" + required256message;
const emailMessage = "Email" + required256message;
export const schema = z.object({
    name: z
        .string({ message: nameMessage })
        .min(1, nameMessage)
        .max(256, nameMessage),
    email: z.string()
        .email({ message: emailMessage })
        .max(256, emailMessage),
    createdAt: z.coerce.date()
})