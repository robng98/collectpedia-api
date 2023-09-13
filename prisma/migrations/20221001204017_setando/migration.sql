-- CreateTable
CREATE TABLE "agrega" (
    "fk_colecao_nome_colecao" VARCHAR NOT NULL,
    "fk_colecao_email" VARCHAR NOT NULL,
    "fk_exemplar_id" INTEGER NOT NULL,

    CONSTRAINT "agrega_pkey" PRIMARY KEY ("fk_colecao_nome_colecao","fk_colecao_email","fk_exemplar_id")
);

-- CreateTable
CREATE TABLE "capitulo" (
    "fk_tankobon_numero" VARCHAR NOT NULL,
    "fk_tankobon_data_lanc" DATE NOT NULL,
    "fk_tankobon_nome_intern" VARCHAR NOT NULL,
    "fk_tankobon_ciclo_de_num" SMALLINT NOT NULL,
    "num_cap" INTEGER NOT NULL,

    CONSTRAINT "capitulo_pkey" PRIMARY KEY ("fk_tankobon_numero","fk_tankobon_data_lanc","fk_tankobon_ciclo_de_num","fk_tankobon_nome_intern","num_cap")
);

-- CreateTable
CREATE TABLE "colecao" (
    "nome_colecao" VARCHAR NOT NULL,
    "fk_colecionador_email" VARCHAR NOT NULL,

    CONSTRAINT "colecao_pkey" PRIMARY KEY ("nome_colecao","fk_colecionador_email")
);

-- CreateTable
CREATE TABLE "colecionador" (
    "username" VARCHAR,
    "email" VARCHAR NOT NULL,
    "senha" VARCHAR,

    CONSTRAINT "colecionador_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "contribui" (
    "fk_contribuidor_nome" VARCHAR NOT NULL,
    "fk_contribuidor_data_nasc" DATE NOT NULL,
    "fk_serie_nome_intern" VARCHAR NOT NULL,
    "fk_serie_ciclo_de_num" SMALLINT NOT NULL,
    "funcao" VARCHAR,

    CONSTRAINT "contribui_pkey" PRIMARY KEY ("fk_contribuidor_nome","fk_contribuidor_data_nasc","fk_serie_ciclo_de_num","fk_serie_nome_intern")
);

-- CreateTable
CREATE TABLE "contribuidor" (
    "genero" CHAR(1),
    "nome" VARCHAR NOT NULL,
    "data_nasc" DATE NOT NULL,

    CONSTRAINT "contribuidor_pkey" PRIMARY KEY ("nome","data_nasc")
);

-- CreateTable
CREATE TABLE "edicao" (
    "foto_de_capa" VARCHAR,
    "numero" VARCHAR NOT NULL,
    "un_monetaria" CHAR(3),
    "preco" DOUBLE PRECISION,
    "data_lanc" DATE NOT NULL,
    "fk_serie_nome_intern" VARCHAR NOT NULL,
    "fk_serie_ciclo_de_num" SMALLINT NOT NULL,

    CONSTRAINT "edicao_pkey" PRIMARY KEY ("numero","data_lanc","fk_serie_nome_intern","fk_serie_ciclo_de_num")
);

-- CreateTable
CREATE TABLE "editora" (
    "logo" VARCHAR,
    "nome" VARCHAR NOT NULL,
    "ano_criacao" DATE NOT NULL,

    CONSTRAINT "editora_pkey" PRIMARY KEY ("nome","ano_criacao")
);

-- CreateTable
CREATE TABLE "exemplar" (
    "data_aquis" DATE NOT NULL DEFAULT CURRENT_DATE,
    "estado_conserv" VARCHAR,
    "id" SERIAL NOT NULL,
    "fk_edicao_numero" VARCHAR,
    "fk_edicao_data_lanc" DATE,
    "fk_edicao_nome_intern" VARCHAR,
    "fk_edicao_ciclo_de_num" SMALLINT,

    CONSTRAINT "exemplar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genero" (
    "fk_serie_nome_intern" VARCHAR NOT NULL,
    "fk_serie_ciclo_de_num" SMALLINT NOT NULL,
    "genero" VARCHAR NOT NULL,

    CONSTRAINT "genero_pkey" PRIMARY KEY ("fk_serie_nome_intern","fk_serie_ciclo_de_num","genero")
);

-- CreateTable
CREATE TABLE "manga" (
    "nome_jap" VARCHAR,
    "demografia" VARCHAR,
    "fk_serie_nome_intern" VARCHAR NOT NULL,
    "fk_serie_ciclo_de_num" SMALLINT NOT NULL,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("fk_serie_ciclo_de_num","fk_serie_nome_intern")
);

-- CreateTable
CREATE TABLE "publica" (
    "fk_editora_nome" VARCHAR NOT NULL,
    "fk_editora_ano_criacao" DATE NOT NULL,
    "fk_serie_nome_intern" VARCHAR NOT NULL,
    "fk_serie_ciclo_de_num" SMALLINT NOT NULL,

    CONSTRAINT "publica_pkey" PRIMARY KEY ("fk_editora_nome","fk_editora_ano_criacao","fk_serie_ciclo_de_num","fk_serie_nome_intern")
);

-- CreateTable
CREATE TABLE "serie" (
    "estado_pub_atual" VARCHAR,
    "nome_intern" VARCHAR NOT NULL,
    "ciclo_de_num" SMALLINT NOT NULL,

    CONSTRAINT "serie_pkey" PRIMARY KEY ("nome_intern","ciclo_de_num")
);

-- CreateTable
CREATE TABLE "tankobon" (
    "fk_edicao_numero" VARCHAR NOT NULL,
    "fk_edicao_data_lanc" DATE NOT NULL,
    "fk_edicao_nome_intern" VARCHAR NOT NULL,
    "fk_edicao_ciclo_de_num" SMALLINT NOT NULL,

    CONSTRAINT "tankobon_pkey" PRIMARY KEY ("fk_edicao_numero","fk_edicao_data_lanc","fk_edicao_nome_intern","fk_edicao_ciclo_de_num")
);

-- CreateIndex
CREATE UNIQUE INDEX "manga_fk_serie_nome_intern_fk_serie_ciclo_de_num_key" ON "manga"("fk_serie_nome_intern", "fk_serie_ciclo_de_num");

-- AddForeignKey
ALTER TABLE "agrega" ADD CONSTRAINT "fk_agrega_1" FOREIGN KEY ("fk_colecao_nome_colecao", "fk_colecao_email") REFERENCES "colecao"("nome_colecao", "fk_colecionador_email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agrega" ADD CONSTRAINT "fk_agrega_2" FOREIGN KEY ("fk_exemplar_id") REFERENCES "exemplar"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "capitulo" ADD CONSTRAINT "fk_capitulo_2" FOREIGN KEY ("fk_tankobon_numero", "fk_tankobon_data_lanc", "fk_tankobon_nome_intern", "fk_tankobon_ciclo_de_num") REFERENCES "tankobon"("fk_edicao_numero", "fk_edicao_data_lanc", "fk_edicao_nome_intern", "fk_edicao_ciclo_de_num") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "colecao" ADD CONSTRAINT "fk_colecao_2" FOREIGN KEY ("fk_colecionador_email") REFERENCES "colecionador"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribui" ADD CONSTRAINT "fk_contribui_1" FOREIGN KEY ("fk_contribuidor_nome", "fk_contribuidor_data_nasc") REFERENCES "contribuidor"("nome", "data_nasc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribui" ADD CONSTRAINT "fk_contribui_2" FOREIGN KEY ("fk_serie_nome_intern", "fk_serie_ciclo_de_num") REFERENCES "serie"("nome_intern", "ciclo_de_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edicao" ADD CONSTRAINT "fk_edicao_2" FOREIGN KEY ("fk_serie_nome_intern", "fk_serie_ciclo_de_num") REFERENCES "serie"("nome_intern", "ciclo_de_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exemplar" ADD CONSTRAINT "fk_exemplar_2" FOREIGN KEY ("fk_edicao_numero", "fk_edicao_data_lanc", "fk_edicao_nome_intern", "fk_edicao_ciclo_de_num") REFERENCES "edicao"("numero", "data_lanc", "fk_serie_nome_intern", "fk_serie_ciclo_de_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genero" ADD CONSTRAINT "fk_genero_2" FOREIGN KEY ("fk_serie_nome_intern", "fk_serie_ciclo_de_num") REFERENCES "serie"("nome_intern", "ciclo_de_num") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "manga" ADD CONSTRAINT "fk_manga_2" FOREIGN KEY ("fk_serie_nome_intern", "fk_serie_ciclo_de_num") REFERENCES "serie"("nome_intern", "ciclo_de_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publica" ADD CONSTRAINT "fk_publica_1" FOREIGN KEY ("fk_editora_nome", "fk_editora_ano_criacao") REFERENCES "editora"("nome", "ano_criacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publica" ADD CONSTRAINT "fk_publica_2" FOREIGN KEY ("fk_serie_nome_intern", "fk_serie_ciclo_de_num") REFERENCES "serie"("nome_intern", "ciclo_de_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tankobon" ADD CONSTRAINT "fk_tankobon_2" FOREIGN KEY ("fk_edicao_numero", "fk_edicao_data_lanc", "fk_edicao_nome_intern", "fk_edicao_ciclo_de_num") REFERENCES "edicao"("numero", "data_lanc", "fk_serie_nome_intern", "fk_serie_ciclo_de_num") ON DELETE CASCADE ON UPDATE CASCADE;
