import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"
import { CreateCustomerController } from "./controllers/CreateCustomerController"
import { ListCustomersController } from "./controllers/ListCustomersController"
import { DeleteCustomerController } from "./controllers/DeleteCustomerController"
import { EditCustomerController } from "./controllers/EditCustomerController"

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Create
    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })

    // Read
    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request, reply)
    })

    // Update
    fastify.put("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new EditCustomerController().handle(request, reply)
    })

    // Delete
    fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })
}
