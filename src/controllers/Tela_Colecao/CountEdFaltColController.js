import { prismaClient } from "../../database/client.js"


export class CountEdFaltColController {
    async handle(request, response) {
        let { email, nomeCol } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        const query = await prismaClient.$queryRaw`
            SELECT	ED.fk_serie_nome_intern as nome,  ED.fk_serie_ciclo_de_num as vol, COUNT(*) as num
            FROM	edicao ED
            WHERE	(ED.fk_serie_nome_intern,ED.fk_serie_ciclo_de_num, ED.numero) in
            ((SELECT		ED.fk_serie_nome_intern as nome_s,  ED.fk_serie_ciclo_de_num as volume, ED.numero as num
            FROM		edicao ED
            GROUP BY 	nome_s, volume, num
            ORDER BY	nome_s, volume, num)
            except



            (SELECT		E.fk_edicao_nome_intern as nome_s, E.fk_edicao_ciclo_de_num as volume, ED.numero
            FROM		agrega A, exemplar E, edicao ED
            WHERE		A.fk_exemplar_id = E.id AND
            (E.fk_edicao_numero, E.fk_edicao_data_lanc, E.fk_edicao_nome_intern, E.fk_edicao_ciclo_de_num) =
            (ED.numero, ED.data_lanc, ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) AND
            A.fk_colecao_nome_colecao like ${nomeColConc} AND
            A.fk_colecao_email like ${emailConc}
            GROUP BY 	nome_s, volume, ED.numero))
            GROUP BY nome, vol
            ORDER BY nome, vol, num
        `;


        return response.json(query);
    }
}