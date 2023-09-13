import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class ColecoesInfoController {
    async handle(request, response) {
        let { email } = request.params;
        const emailConc = `%${email}%`

        const query = await prismaClient.$queryRaw`
            SELECT		A.fk_colecao_nome_colecao as nome_c, COUNT(A.fk_exemplar_id), MAX(E.data_aquis)
            FROM		agrega A JOIN exemplar E on (fk_exemplar_id = id)
            WHERE		A.fk_colecao_email like ${emailConc}
            GROUP BY	nome_c
            ORDER BY    nome_c
        `;


        return response.json(query);
    }
}