import { Router } from "express";
import { CountExempColController } from "../controllers/Tela_Adm_Colecoes/CountExempColController.js";
import { UpdateNomeColController } from "../controllers/Tela_Adm_Colecoes/UpdateNomeColController.js";
import { DeleteColecaoController } from "../controllers/Tela_Adm_Colecoes/DeleteColecaoController.js";
import { CreateColecaoController } from "../controllers/Tela_Adm_Colecoes/CreateColecaoController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";


const telaAdmColecoesRouter = Router();

const countExempColController = new CountExempColController();
const updateNomeColController = new UpdateNomeColController();
const deleteColecaoController = new DeleteColecaoController();
const createColecaoController = new CreateColecaoController();

const authMiddleware = new AuthMiddleware()

telaAdmColecoesRouter.get('/admCol/countExempColecao/:email', authMiddleware.handle, countExempColController.handle);
telaAdmColecoesRouter.post('/admCol/updNomeColecao', updateNomeColController.handle);
telaAdmColecoesRouter.post('/admCol/deleteColecao', deleteColecaoController.handle);
telaAdmColecoesRouter.post('/admCol/createColecao', createColecaoController.handle);

export { telaAdmColecoesRouter };