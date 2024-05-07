import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"
import { CreateCustomerController } from "./controllers/CreateCustomerController"

export const routes = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { msg: "Hello World" }
    })

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })
}
