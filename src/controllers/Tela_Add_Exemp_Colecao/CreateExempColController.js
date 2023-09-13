import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }


export class CreateExempColController {
    async handle(request, response) {
        let { vol, nomeSerie, est_conserv, edNum, data_aqui, data_lanc } = request.body;
        const volInt = parseInt(vol)
        const data_lanc_ = new Date(data_lanc).toISOString()
        const data_aqui_ = new Date(data_aqui).toISOString()

        

        let { email, nomeCol} = request.body;
        
        console.log(`Add volInt, nomeSerie, est_conserv, edNum, data_aqui, data_lanc = ${volInt}, ${nomeSerie},${est_conserv},${edNum},${data_aqui_},${data_lanc_}`)

        const addExemplar = await prismaClient.exemplar.create({
            data: {
                data_aquis: data_aqui_,
                estado_conserv: est_conserv,
                fk_edicao_numero: edNum,
                fk_edicao_data_lanc: data_lanc_,
                fk_edicao_nome_intern: nomeSerie,
                fk_edicao_ciclo_de_num: volInt,
            }
        })


        const maxId = await prismaClient.$queryRaw`
        SELECT	MAX(E.id)
        FROM	exemplar E
        WHERE	E.fk_edicao_nome_intern like ${nomeSerie} AND E.fk_edicao_ciclo_de_num = ${volInt}
        `;

        
        console.log(`maxId[0].max = ${parseInt(maxId[0].max)}`)
        console.log(`Insert nomeSerie, email, nomeCol, vol = ${nomeSerie}, ${email},${nomeCol},${volInt}`)


        const insertAgrega = await prismaClient.agrega.create({
            data: {
                fk_colecao_nome_colecao: nomeCol,
                fk_colecao_email: email,
                fk_exemplar_id: maxId[0].max
            }
        })
        


        return response.json({
            ExemplarAdicionado: addExemplar,
            ExemplarAgregado: insertAgrega
        })
    }
}