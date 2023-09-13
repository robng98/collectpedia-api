import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class CountColGeneroController {
    async handle(request, response) {
        let { nomeCol, email } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        const query = await prismaClient.$queryRaw`
            SELECT		G.genero, count(*) as top_3
            FROM		genero G
            WHERE 		(G.fk_serie_nome_intern, G.fk_serie_ciclo_de_num,G.genero)IN 	
                        (SELECT		G.fk_serie_nome_intern, G.fk_serie_ciclo_de_num, G.genero
                        FROM		agrega A, exemplar E, edicao ED, serie S, genero G
                        WHERE		A.fk_exemplar_id = E.id AND
                                    (E.fk_edicao_numero, E.fk_edicao_data_lanc, E.fk_edicao_nome_intern, E.fk_edicao_ciclo_de_num) =
                                    (ED.numero, ED.data_lanc, ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) AND
                                    (ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) = (S.nome_intern, S.ciclo_de_num) AND
                                    (G.fk_serie_ciclo_de_num, G.fk_serie_nome_intern) = (S.ciclo_de_num, S.nome_intern) AND
                                    A.fk_colecao_nome_colecao like ${nomeColConc} AND
                                    A.fk_colecao_email like ${emailConc}
                        GROUP BY 	G.fk_serie_nome_intern, G.fk_serie_ciclo_de_num, G.genero)
            GROUP BY 	G.genero
            ORDER BY	top_3 DESC, G.genero
        `;


        return response.json(query);
    }
}