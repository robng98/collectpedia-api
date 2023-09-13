import { prismaClient } from "../../database/client.js"

BigInt.prototype.toJSON = function () { return this.toString() }


export class DeleteExempColController {
    async handle(request, response) {
        let { id } = request.body;
        const id_int = parseInt(id)

            const query = await prismaClient.$executeRaw`
                DELETE FROM exemplar where id = ${id_int}
            `;

        return response.json(query);
    }
}