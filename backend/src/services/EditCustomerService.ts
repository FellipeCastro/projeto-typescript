import prismaClient from "../prisma"

interface EditCustomerProps{
    id: string
    name?: string
    email?: string
}

class EditCustomerService{
    async execute({ id, name, email }: EditCustomerProps) {
        if (!id) {
            throw new Error("Solicitação inválida")
        }

        const findCustomer = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        })

        if (!findCustomer) {
            throw new Error("Cliente inexistente")
        }

        const updateCustomer = await prismaClient.customer.update({
            where: { id: findCustomer.id },
            data: {
                name: name || findCustomer.name,
                email: email || findCustomer.email,
            }
        })

        return updateCustomer
    }
}

export { EditCustomerService }
