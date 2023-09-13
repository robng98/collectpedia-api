import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }

export class DirMangaController {
    async handle(request, response) {
        let { nome, vol, num } = request.params;
        const nome_Conc = '%' + nome + '%';

        vol = parseInt(vol);

        const query = await prismaClient.$queryRaw`
            SELECT		S.nome_intern as nome, T.fk_edicao_numero as num, CP.num_cap as caps,
			E.un_monetaria as mon, E.preco as preco, E.data_lanc, C.fk_contribuidor_nome mangaka,
			C.funcao as func, S.estado_pub_atual, E.foto_de_capa as capa
            FROM		contribui C, edicao E, serie S, tankobon T, capitulo CP
            WHERE		(E.fk_serie_nome_intern, E.fk_serie_ciclo_de_num) = (S.nome_intern,S.ciclo_de_Num) AND 
                        (S.nome_intern,S.ciclo_de_Num) = (C.fk_serie_nome_intern, C.fk_serie_ciclo_de_num) AND 
                        (T.fk_edicao_numero, T.fk_edicao_data_lanc, T.fk_edicao_nome_intern, T.fk_edicao_ciclo_de_num) =
                        (E.numero, E.data_lanc, E.fk_serie_nome_intern, E.fk_serie_ciclo_de_num) AND
                        (T.fk_edicao_numero, T.fk_edicao_data_lanc, T.fk_edicao_nome_intern, T.fk_edicao_ciclo_de_num) =
                        (CP.fk_tankobon_numero, CP.fk_tankobon_data_lanc, CP.fk_tankobon_nome_intern,CP.fk_tankobon_ciclo_de_num) AND
                        E.fk_serie_nome_intern iLIKE ${nome_Conc} AND S.ciclo_de_num = ${vol} AND E.numero = ${num}
            ORDER BY	nome, num
        `;


        return response.json(query);
    }
}