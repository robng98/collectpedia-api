import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }


export class CreateAgregaExempController {
    async handle(request, response) {

        let { nomeSerie, email, nomeCol, vol } = request.body;
        const volInt = parseInt(vol)

        console.log(`Insert nomeSerie, email, nomeCol, vol = ${nomeSerie}, ${email},${nomeCol},${volInt}`)



        const maxId = await prismaClient.$queryRaw`
        SELECT	MAX(E.id)
        FROM	exemplar E
        WHERE	E.fk_edicao_nome_intern like ${nomeSerie} AND E.fk_edicao_ciclo_de_num = ${volInt}
        `;

        
        console.log(`maxId[0].max = ${parseInt(maxId[0].max)}`)

        const insertAgrega = await prismaClient.agrega.create({
            data: {
                fk_colecao_nome_colecao: nomeCol,
                fk_colecao_email: email,
                fk_exemplar_id: maxId[0].max
            }
        })

        

        return response.json(insertAgrega)
    }
}