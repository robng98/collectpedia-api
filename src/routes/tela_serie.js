import { Router } from "express";
import { EsqMangaController } from "../controllers/Tela_Serie/EsqMangaController.js";
import { EsqComicController } from "../controllers/Tela_Serie/EsqComicController.js";
import { DirComicController } from "../controllers/Tela_Serie/DirComicController.js";
import { DirMangaController } from "../controllers/Tela_Serie/DirMangaController.js";


const telaSerieRouter = Router();

const esqComicController = new EsqComicController();
const esqMangaController = new EsqMangaController();
const dirComicController = new DirComicController();
const dirMangaController = new DirMangaController();

telaSerieRouter.get('/c/:nome/:vol', esqComicController.handle);
telaSerieRouter.get('/m/:nome/:vol', esqMangaController.handle);
telaSerieRouter.get('/single/:nome/:vol/:num', dirComicController.handle);
telaSerieRouter.get('/tanko/:nome/:vol/:num', dirMangaController.handle);

export { telaSerieRouter };