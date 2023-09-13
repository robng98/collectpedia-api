import { prismaClient } from "../../database/client.js"


export class CountExempColController {
    async handle(request, response) {
        let { email } = request.params;
        const emailConc = `%${email}%`

        const query = await prismaClient.$queryRaw`
            SELECT *
            FROM	(SELECT		A.fk_colecao_nome_colecao as nome_c, COUNT(A.fk_exemplar_id)
            FROM		agrega A JOIN exemplar E on (fk_exemplar_id = id)
            WHERE		A.fk_colecao_email like ${emailConc}
            GROUP BY	nome_c) as TAB1 RIGHT JOIN 
            
            (SELECT		C.nome_colecao as nome_c
            FROM		colecao C
            WHERE		C.fk_colecionador_email like ${emailConc}
            GROUP BY	nome_c) as TAB2 using (nome_c)
        `;


        return response.json(query);
    }
}