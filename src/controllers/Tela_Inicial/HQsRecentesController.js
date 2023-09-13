import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class HQsRecentesController {

    async handle(request, response) {

        const query = await prismaClient.$queryRaw`
            SELECT E.foto_de_capa as capa, E.fk_serie_nome_intern as nome, E.fk_serie_ciclo_de_num as vol, E.numero as num, MAX(E.data_lanc) as top_recentes,
                        E.un_monetaria as mon, PB.fk_editora_nome as ed_nome
            FROM EDICAO E, SERIE S, PUBLICA PB
            WHERE E.fk_serie_nome_intern = S.nome_intern AND PB.fk_serie_nome_intern = S.nome_intern
            GROUP BY	nome, vol, num, capa, mon, ed_nome
            ORDER BY 	top_recentes DESC, nome ASC, vol ASC, num ASC
            `;

        return response.json(query);
    }
}