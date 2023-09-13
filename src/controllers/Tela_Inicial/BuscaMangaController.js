import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class BuscaMangaController {

    async handle(request, response) {
        const numero = '1';
        const { busca } = request.params;
        const busca_Conc = '%' + busca + '%';

        const query = await prismaClient.$queryRaw`
            SELECT 	M.fk_serie_nome_intern as NOME, M.nome_jap as NOME_JAP, COUNT(E.fk_serie_nome_intern) as NUM_TANKOS, 
            tab_ano.ano_pub AS ANO_PUB, P.fk_editora_nome AS EDITORA, M.demografia as DEMOGRAFIA, M.fk_serie_ciclo_de_num as vol
            FROM	serie S, publica P, manga M, (SELECT EXTRACT (YEAR FROM E.data_lanc) as ano_pub, E.fk_serie_nome_intern, E.fk_serie_ciclo_de_num
                                                    FROM 	edicao E
                                                    WHERE 	E.numero = ${numero} AND
                                                            E.fk_serie_nome_intern iLIKE ${busca_Conc}
                                                    ORDER BY E.fk_serie_nome_intern, E.fk_serie_ciclo_de_num) tab_ano NATURAL JOIN edicao E

            WHERE	(E.fk_serie_nome_intern, E.fk_serie_ciclo_de_Num) = (nome_intern, ciclo_de_num) AND
                    (P.fk_serie_nome_intern, P.fk_serie_ciclo_de_Num) = (nome_intern, ciclo_de_num) AND
                    (M.fk_serie_nome_intern, M.fk_serie_ciclo_de_Num) = (nome_intern, ciclo_de_num) 

            GROUP BY NOME, NOME_JAP, ANO_PUB, EDITORA, DEMOGRAFIA, vol
            ORDER BY NOME
            `;

        return response.json(query);
    }
}