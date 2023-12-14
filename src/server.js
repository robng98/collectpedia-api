import express from "express";
import cors from "cors";
import * as dotenv from "dotenv"
import { mainRouter } from "./routes/main.js";
import { telaInicialRouter } from "./routes/tela_inicial.js";
import { telaSerieRouter } from "./routes/tela_serie.js";
import { userRouter } from "./routes/users.js";
import { telaUsuarioRouter } from "./routes/Tela_Usuario.js";
import { telaAdmColecoesRouter } from "./routes/Tela_Adm_Colecoes.js";
import { telaColecaoRouter } from "./routes/tela_Colecao.js";
import { telaAddExempColecaoRouter } from "./routes/Tela_Add_Exemp_Colecao.js";


dotenv.config()

// const PORT = process.env.PORT || 4444;


const app = express();

app.use(express.json());
app.use(cors());

app.use(mainRouter);
app.use(telaInicialRouter);
app.use(telaSerieRouter);
app.use(userRouter);
app.use(telaUsuarioRouter);
app.use(telaAdmColecoesRouter);
app.use(telaColecaoRouter);
app.use(telaAddExempColecaoRouter);

app.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`);
})
