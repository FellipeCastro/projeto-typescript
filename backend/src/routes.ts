import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"

export const routes = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
}
