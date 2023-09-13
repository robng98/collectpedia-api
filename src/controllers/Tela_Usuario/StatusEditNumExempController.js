import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class StatusEditNumExempController {
    async handle(request, response) {
        let { nomeCol, email } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        const query = await prismaClient.$queryRaw`
            SELECT		A.fk_colecao_nome_colecao as nome, COUNT(DISTINCT P.fk_editora_nome) as Num_Ed_Col, COUNT(A.*) as Num_Ex_Col
            FROM		agrega A, exemplar E, edicao ED, serie S, publica P
            WHERE		A.fk_exemplar_id = E.id AND
                        (E.fk_edicao_numero, E.fk_edicao_data_lanc, E.fk_edicao_nome_intern, E.fk_edicao_ciclo_de_num) =
                        (ED.numero, ED.data_lanc, ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) AND
                        (ED.fk_serie_nome_intern, ED.fk_serie_ciclo_de_num) = (S.nome_intern, S.ciclo_de_num) AND
                        (P.fk_serie_ciclo_de_num, P.fk_serie_nome_intern) = (S.ciclo_de_num, S.nome_intern) AND
                        A.fk_colecao_nome_colecao like ${nomeColConc} AND
                        A.fk_colecao_email like ${emailConc}
            GROUP BY 	nome
        `;


        return response.json(query);
    }
}