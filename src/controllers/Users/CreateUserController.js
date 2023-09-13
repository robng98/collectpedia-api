import { prismaClient } from "../../database/client.js";

export class CreateUserController {

    async handle(request, response) {

        const { username, email, senha } = request.body;

        try {
            const colecionador = await prismaClient.colecionador.create({
                data : {
                    username, 
                    email,
                    senha

                }
            });

            return response.json({
                email: colecionador.email,
                username
            });

        } catch (error) {
            console.error("Erro ao incluir o usuário!");
            return response.status(400).json({
                message: "Erro na inclusão do usuário",
                error: error.message
            })
        }


    }

}