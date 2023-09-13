import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class CountDemografiaController {
    async handle(request, response) {
        let { nomeCol, email } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        const query = await prismaClient.$queryRaw`
            SELECT	M.demografia, count(*) as count_demo
            FROM	manga M, serie S
            WHERE 	(S.nome_intern, M.demografia) in
            (SELECT		S.nome_intern, M.demografia
            FROM		agrega A, exemplar E, edicao ED, serie S, manga M
            WHERE		A.fk_exemplar_id = E.id AND
					(E.fk_edicao_numero, E.fk_edicao_data_lanc, E.fk_edicao_nome_intern, E.fk_edicao_ciclo_de_num) =
					(ED.numero, ED.data_lanc, ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) AND
					(ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) = (S.nome_intern, S.ciclo_de_num) AND
					(M.fk_serie_nome_intern, M.fk_serie_ciclo_de_num) = (S.nome_intern, S.ciclo_de_num) AND
					A.fk_colecao_nome_colecao ilike ${nomeColConc} AND
		 			A.fk_colecao_email like ${emailConc}
		    GROUP BY	S.nome_intern, M.demografia)
            GROUP BY M.demografia
            ORDER BY	count_demo desc, M.demografia
        `;


        return response.json(query);
    }
}