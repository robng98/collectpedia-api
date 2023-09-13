import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class DirComicController {
    async handle(request, response) {
        let { nome, vol, num } = request.params;
        const nome_Conc = '%' + nome + '%';

        vol = parseInt(vol);

        const query = await prismaClient.$queryRaw`
            SELECT		S.nome_intern as nome, E.numero as num, S.ciclo_de_num as vol,
			E.un_monetaria as mon, E.preco as preco, E.data_lanc, C.fk_contribuidor_nome C_nome,
			C.funcao as func, S.estado_pub_atual, E.foto_de_capa as capa
            FROM		contribui C, edicao E, serie S
            WHERE		(E.fk_serie_nome_intern, E.fk_serie_ciclo_de_num) = (S.nome_intern,S.ciclo_de_Num) AND 
                        (S.nome_intern,S.ciclo_de_Num) = (C.fk_serie_nome_intern, C.fk_serie_ciclo_de_num) AND 
                        E.fk_serie_nome_intern iLIKE ${nome_Conc} AND S.ciclo_de_num = ${vol} AND E.numero = ${num}
            ORDER BY	nome, num
        `;


        return response.json(query);
    }
}