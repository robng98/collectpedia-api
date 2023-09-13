import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class NomeUserController {
    async handle(request, response) {
        let { email } = request.params;
        const emailConc = `%${email}%`

        const query = await prismaClient.$queryRaw`
            SELECT		colecionador.username
            FROM    colecionador
            WHERE   colecionador.email like ${emailConc}
        `;


        return response.json(query);
    }
}