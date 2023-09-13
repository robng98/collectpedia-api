import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class EsqMangaController {
    async handle(request, response) {
        let { nome, vol } = request.params;
        const nome_Conc = '%' + nome + '%';

        vol = parseInt(vol);

        const query = await prismaClient.$queryRaw`
            SELECT	infos.fk_serie_nome_intern as nome, infos.numero as num, infos.un_monetaria as un_mon, infos.preco as preco
            FROM	(tankobon JOIN edicao on (fk_edicao_nome_intern, fk_edicao_numero, fk_edicao_data_lanc, fk_edicao_ciclo_de_num) = 
                    (fk_serie_nome_intern, numero, data_lanc, fk_serie_ciclo_de_num)) as infos
            WHERE	infos.fk_serie_nome_intern iLIKE ${nome_Conc} AND infos.fk_serie_ciclo_de_num = ${vol}
            ORDER BY nome, num
        `;


        return response.json(query);
    }
}