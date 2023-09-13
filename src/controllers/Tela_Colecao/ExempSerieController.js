import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class ExempSerieController {
    async handle(request, response) {
        let { email, nomeCol, nomeSerie, vol } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`
        const nomeSerieConc = `%${nomeSerie}%`
        const volInt = parseInt(vol)


        const query = await prismaClient.$queryRaw`
            SELECT		E.fk_edicao_nome_intern as nome, E.fk_edicao_ciclo_de_num as vol, 
            E.fk_edicao_numero as num, E.data_aquis as dt, E.estado_conserv as e_c, E.id as id
            FROM		agrega A, exemplar E, edicao ED
            WHERE		fk_exemplar_id = id AND 
                        ( ED.numero, ED.data_lanc, ED.fk_serie_nome_intern,ED.fk_serie_ciclo_de_num ) =
                        (E.fk_edicao_numero, E.fk_edicao_data_lanc, E.fk_edicao_nome_intern, E.fk_edicao_ciclo_de_num) AND
                        A.fk_colecao_nome_colecao like ${nomeColConc} AND
                        A.fk_colecao_email like ${emailConc} AND
                        E.fk_edicao_nome_intern like ${nomeSerieConc} AND
                        E.fk_edicao_ciclo_de_num = ${volInt}

            ORDER BY	nome ASC, vol ASC, num ASC , dt ASC , e_c DESC, id ASC
                
        `;

        console.log(query)


        return response.json(query);
    }
}