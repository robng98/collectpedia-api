import { Router } from "express";
import { BuscaComicsController } from "../controllers/Tela_Inicial/BuscaComicsController.js";
import { BuscaMangaController } from "../controllers/Tela_Inicial/BuscaMangaController.js";
import { HQsRecentesController} from "../controllers/Tela_Inicial/HQsRecentesController.js";

import { AuthMiddleware } from "../middleware/AuthMiddleware.js"

const telaInicialRouter = Router();

const buscaComicsController = new BuscaComicsController();
const buscaMangaController = new BuscaMangaController();
const hqsRecentesController = new HQsRecentesController();

const authMiddleware = new AuthMiddleware();

telaInicialRouter.get('/b_comic/:busca', buscaComicsController.handle);
telaInicialRouter.get('/b_manga/:busca', buscaMangaController.handle);
telaInicialRouter.get('/recentes', hqsRecentesController.handle);

export { telaInicialRouter };