import { prismaClient } from "../../database/client.js";
import jwt from "jsonwebtoken";

export class LoginUserController {

    async handle(request, response) {

        const { email, senha } = request.body;      

        console.log({ email, senha });

        const colecionador = await prismaClient.colecionador.findUnique({
            where: {
                email: email,
            }
        });

        if (!colecionador) {
            return response.status(403).send({
                message: "Usuário e/ou senha inválidos!"
            });
        }

        // Hash senha -> colecionador.senha
        if ( colecionador.senha !== senha ) {
            return response.status(403).send({
                message: "Usuário e/ou senha inválidos!"
            });
        }

        // JWT - Token
        const data = {
            email: colecionador.email,
            loginDate: Date()
        };

        const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: '1h', algorithm: 'HS256'});

        response.send({
            email,
            token,
            header: process.env.JWT_HEADER_KEY
        });

    }


}