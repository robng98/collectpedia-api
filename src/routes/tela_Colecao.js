import { Router } from "express";
import { CountEdicoesColController } from "../controllers/Tela_Colecao/CountEdicoesColController.js";
import { CountEdFaltColController } from "../controllers/Tela_Colecao/CountEdFaltColController.js";
import { ExempSerieController } from "../controllers/Tela_Colecao/ExempSerieController.js";
import { DeleteExempColController } from "../controllers/Tela_Colecao/DeleteExempColController.js";


const telaColecaoRouter = Router();

const countEdicoesColController = new CountEdicoesColController();
const countEdFaltColController = new CountEdFaltColController();
const exempSerieController = new ExempSerieController();
const deleteExempColController = new DeleteExempColController();


telaColecaoRouter.post('/colecao/edicoesColecao', countEdicoesColController.handle);
telaColecaoRouter.post('/colecao/countEdFaltColecao', countEdFaltColController.handle);
telaColecaoRouter.post('/colecao/exempSerie', exempSerieController.handle);
telaColecaoRouter.post('/colecao/deleteExemplar', deleteExempColController.handle);


export { telaColecaoRouter };