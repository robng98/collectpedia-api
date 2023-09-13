import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class CountMangakaController {
    async handle(request, response) {
        let { nomeCol, email } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        const query = await prismaClient.$queryRaw`
            SELECT	C.fk_contribuidor_nome as nome_mangaka , count(*) as count_mangaka
            FROM	contribui C
            WHERE 	(C.fk_serie_nome_intern, C.fk_serie_ciclo_de_num, C.fk_contribuidor_nome) in
            (SELECT		S.nome_intern, S.ciclo_de_num, C.fk_contribuidor_nome
            FROM		agrega A, exemplar E, edicao ED, serie S, contribui C
            WHERE		A.fk_exemplar_id = E.id AND
                        (E.fk_edicao_numero, E.fk_edicao_data_lanc, E.fk_edicao_nome_intern, E.fk_edicao_ciclo_de_num) =
                        (ED.numero, ED.data_lanc, ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) AND
                        (ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) = (S.nome_intern, S.ciclo_de_num) AND
                        (C.fk_serie_nome_intern, C.fk_serie_ciclo_de_num) = (S.nome_intern, S.ciclo_de_num) AND
                        A.fk_colecao_nome_colecao like ${nomeColConc} AND
                        A.fk_colecao_email like ${emailConc} AND
                        C.funcao ilike 'Mangaka'
            GROUP BY	S.nome_intern, S.ciclo_de_num, C.fk_contribuidor_nome)
            GROUP BY C.fk_contribuidor_nome
            ORDER BY	count_mangaka desc
        `;


        return response.json(query);
    }
}