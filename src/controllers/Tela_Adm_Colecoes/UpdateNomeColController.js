import { prismaClient } from "../../database/client.js"


export class UpdateNomeColController {
    async handle(request, response) {
        let { email, nomeCol,  novoNomeCol } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        const query = await prismaClient.$executeRaw`
           UPDATE colecao set nome_colecao = ${novoNomeCol} 
           WHERE fk_colecionador_email like ${emailConc} and nome_colecao like ${nomeColConc}
        `;


        return response.json(query);
    }
}