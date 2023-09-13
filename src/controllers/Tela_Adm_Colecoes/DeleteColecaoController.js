import { prismaClient } from "../../database/client.js"


export class DeleteColecaoController {
    async handle(request, response) {
        let { email, nomeCol } = request.body;
        const emailConc = `%${email}%`
        const nomeColConc = `%${nomeCol}%`

        try {

            const deleteAllExempCol = await prismaClient.$executeRaw`
                DELETE FROM exemplar where id in (
                                                    SELECT		A.fk_exemplar_id AS IDS
                                                    FROM		agrega A JOIN exemplar E on (fk_exemplar_id = id)
                                                    WHERE		A.fk_colecao_email like ${emailConc}
                                                                AND A.fk_colecao_nome_colecao like ${nomeColConc}
                                                    GROUP BY	ids)
            `;


            const deleteColecao = await prismaClient.$executeRaw`

                DELETE FROM colecao where fk_colecionador_email 
                like ${emailConc} and nome_colecao like ${nomeColConc}
            `;

            return response.json({
                ExempDeletados: deleteAllExempCol, 
                ColecaoDeletada: deleteColecao});

        } catch (error) {
            console.error("Erro ao excluir a coleção!");
            return response.status(400).json({
                message: "Erro ao excluir a coleção",
                error: error.message
            })
        }

        
    }
}