import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class CountStatusPubController {
    async handle(request, response) {
        let { nomeCol, email } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        const query = await prismaClient.$queryRaw`
            SELECT		S.estado_pub_atual as e_p, COUNT(*) as contagem
            FROM		serie S
            WHERE		(S.nome_intern, S.ciclo_de_num, S.estado_pub_atual) in
                        (SELECT		S.nome_intern, S.ciclo_de_num, S.estado_pub_atual
                        FROM		agrega A, exemplar E, edicao ED, serie S
                        WHERE		A.fk_exemplar_id = E.id AND
                                    (E.fk_edicao_numero, E.fk_edicao_data_lanc, E.fk_edicao_nome_intern, E.fk_edicao_ciclo_de_num) =
                                    (ED.numero, ED.data_lanc, ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) AND
                                    (ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) = (S.nome_intern, S.ciclo_de_num) AND
                                    A.fk_colecao_nome_colecao like ${nomeColConc} AND
                                    A.fk_colecao_email like ${emailConc}
                        GROUP BY 	S.estado_pub_atual, S.nome_intern, S.ciclo_de_num)
            GROUP BY	e_p
            ORDER BY	e_p, contagem
        `;


        return response.json(query);
    }
}