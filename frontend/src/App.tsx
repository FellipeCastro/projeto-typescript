import { useState, useEffect, useRef, FormEvent } from "react"
import { customerProps } from "./Types"
import { api } from "./services/api"
import Form from "./components/Form"
import Loading from "./components/Loading"
import Card from "./components/Card"

interface CustomerResponse {
  data: customerProps;
}

export default function App() {
  const [customers, setCustomers] = useState<customerProps[]>([])
  const [customerId, setCustomerId] = useState("")
  const [loading, setLoading] = useState(true)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // Função para o loading aparecer por 0.5s
    setTimeout(() => {
      loadCustomers()
    }, 500)

  }, [])

  const loadCustomers = async () => {
    const response = await api.get("/customers")
    setCustomers(response.data)
    setLoading(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!nameRef.current?.value || !emailRef.current?.value) return 

    let response: CustomerResponse

    if (customerId !== "") {      
      response = await api.put(`/customer?id=${customerId}`, {
        name: nameRef.current?.value,
        email: emailRef.current?.value
      })

      // Se customer.id for igual a customerId, isso significa que este é o cliente que acabamos de editar, então response.data (os dados atualizados do cliente) será usado.
      // Se customer.id não for igual a customerId, o customer original (sem mudanças) será mantido.
      setCustomers(allCustomers => allCustomers.map(customer => customer.id === customerId ? response.data : customer))
    } else {
      response = await api.post("/customer", {
        name: nameRef.current?.value,
        email: emailRef.current?.value
      })
      
      setCustomers(allCustomers => [...allCustomers, response.data])
    }

    setCustomerId("")

    nameRef.current.value = ""
    emailRef.current.value = ""
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/customer?id=${id}`)

    const allCustomers = customers.filter((customer) => customer.id !== id)
    setCustomers(allCustomers)
  }

  const handleEdit = async (id: string) => {
    const customer = customers.find(customer => customer.id === id)

    if (customer) {
      setCustomerId(id)

      if (nameRef.current) nameRef.current.value = customer.name
      if (emailRef.current) emailRef.current.value = customer.email
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-6">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <Form 
          handleSubmit={handleSubmit}
          nameRef={nameRef}
          emailRef={emailRef}
          customerId={customerId}
        />

        <div className="flex flex-col gap-4">

          {loading ? (
            <Loading />
          ) : (
            customers.map((customer) => {
              return (
                <Card 
                  customer={customer}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )
            })            
          )}
        </div>
      </main>
    </div>
  )
}
