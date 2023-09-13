import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class EsqComicController {
    async handle(request, response) {
        let { nome, vol } = request.params;
        const nome_Conc = '%' + nome + '%';

        vol = parseInt(vol);

        const query = await prismaClient.$queryRaw`
            SELECT	infos.fk_serie_nome_intern as nome, infos.numero as num,  infos.un_monetaria as un_mon, infos.preco as preco
            FROM	edicao infos
            WHERE	infos.fk_serie_nome_intern iLIKE ${nome_Conc} AND infos.fk_serie_ciclo_de_num = ${vol}
            ORDER BY nome, num
        `;


        return response.json(query);
    }
}