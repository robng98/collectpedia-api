import { Router } from "express";
import { CreateExempColController } from "../controllers/Tela_Add_Exemp_Colecao/CreateExempColController.js";
import { CreateAgregaExempController } from "../controllers/Tela_Add_Exemp_Colecao/CreateAgregaExempController.js";


const telaAddExempColecaoRouter = Router();

const createExempColController = new CreateExempColController();
const createAgregaExempController = new CreateAgregaExempController();


telaAddExempColecaoRouter.post('/addExempColecao', createExempColController.handle);
telaAddExempColecaoRouter.post('/agregaExempColecao', createAgregaExempController.handle);

export { telaAddExempColecaoRouter };