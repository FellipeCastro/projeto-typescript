import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"
import { CreateCustomerController } from "./controllers/CreateCustomerController"
import { ListCustomersController } from "./controllers/ListCustomersController"

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Read
    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request, reply)
    })

    // Create
    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })
}
