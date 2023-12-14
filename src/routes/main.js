import { response, Router } from "express";

const mainRouter = Router();

mainRouter.get('/', ( response) => {
    response.json({
        message: "Server is running."
    })
});

export {mainRouter}