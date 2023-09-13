import { Router } from "express";
import { ColecoesInfoController } from "../controllers/Tela_Usuario/ColecoesInfoController.js";
import { StatusEditNumExempController } from "../controllers/Tela_Usuario/StatusEditNumExempController.js";
import { CountStatusPubController } from "../controllers/Tela_Usuario/CountStatusPubController.js";
import { CountColGeneroController } from "../controllers/Tela_Usuario/CountColGeneroController.js";
import { CountRoteiristaController } from "../controllers/Tela_Usuario/CountRoteiristaController.js";
import { CountMangakaController } from "../controllers/Tela_Usuario/CountMangakaController.js";
import { CountDesenhistaController } from "../controllers/Tela_Usuario/CountDesenhistaController.js";
import { CountDemografiaController } from "../controllers/Tela_Usuario/CountDemografiaController.js";
import { NomeUserController } from "../controllers/Tela_Usuario/NomeUserController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"


const telaUsuarioRouter = Router();
const authMiddleware = new AuthMiddleware();


const colecoesInfoController = new ColecoesInfoController();
const statusEditNumExempController = new StatusEditNumExempController();
const countStatusPubCController = new CountStatusPubController();
const countColGeneroController = new CountColGeneroController();
const countRoteiristaController = new CountRoteiristaController();
const countMangakaController = new CountMangakaController();
const countDesenhistaController = new CountDesenhistaController();
const countDemografiaController = new CountDemografiaController();
const nomeUserController = new NomeUserController();


telaUsuarioRouter.get('/colecoes/:email', authMiddleware.handle, colecoesInfoController.handle);
telaUsuarioRouter.post('/editExemp/', statusEditNumExempController.handle);
telaUsuarioRouter.post('/countStatusPub/', countStatusPubCController.handle);
telaUsuarioRouter.post('/countGeneros/', countColGeneroController.handle);
telaUsuarioRouter.post('/countRoteirista/', countRoteiristaController.handle);
telaUsuarioRouter.post('/countMangaka/', countMangakaController.handle);
telaUsuarioRouter.post('/countDesenhista/', countDesenhistaController.handle);
telaUsuarioRouter.post('/countDemografia/', countDemografiaController.handle);
telaUsuarioRouter.get('/nomeUser/:email', nomeUserController.handle);


export { telaUsuarioRouter };