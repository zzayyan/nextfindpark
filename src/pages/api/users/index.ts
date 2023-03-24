import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const {id} = req.body
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(404)
        }

        res.status(200).json(user)
    }

    if (req.method === "POST") {
        const response = createUser(req.body)

        res.status(201).json(response)
    }

}

export async function createUser(body: any) {
    const { username, fullname, email, password, role } = body
    const hashedPassword = await bcrypt.hash(password, 12)

    const response = await prisma.user.create({
        data: {
            name: username,
            email: email,
            role: (!role) ? "user": role,
            password: hashedPassword,
            profile: {
                create: {
                    fullname: fullname
                }
            }
        }
    })

    return response
}