import { prismaClient } from "../../database/client.js"


export class CreateColecaoController {
    async handle(request, response) {
        let { email, nomeCol } = request.body;
        
        const query = await prismaClient.$executeRaw`
        INSERT INTO Colecao
        VALUES
        (${nomeCol}, ${email})
        `;


        return response.json(query);
    }
}