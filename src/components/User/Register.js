import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../api/api"

function Register() {
    const navigate = useNavigate()
    const [img, setImg] = useState("")
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setImg(e.target.files[0])
    }

    // faz a requisição da imagem (/upload-image) e retornar o path (caminho)
    const handleUpload = async () => {
        try {
            const uploadData = new FormData()
            uploadData.append("picture", img)

            // subindo a img para o cloudinary
            const response = await api.post('/upload-image', uploadData)

            // retorna o caminho (path) da imagem dentro do cloudinary
            return response.data.url
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const imgURL = await handleUpload()
            // criar a requisição para enviar este novo usuário
                // requisição método POST
            await api.post("/user/register", { ...form, profileImg: imgURL })
    
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container style={{ height: '100vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <Form className="w-50" onSubmit={ handleSubmit }>
                <Form.Group className="mb-3">
                    <Form.Label>Nome completo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira um nome para identificação"
                        name="name"
                        value={ form.name }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Endereço de e-mail</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Insira o seu melhor endereço de e-mail"
                        name="email"
                        value={ form.email }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagem de perfil</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={ handleImage }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Insira uma senha válida"
                        name="password"
                        value={ form.password }
                        onChange={ handleChange }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirmar senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirme a senha válida criada anteriormente"
                        name="confirmPassword"
                        value={ form.confirmPassword }
                        onChange={ handleChange }
                    />
                </Form.Group>
                
                <Button  className="my-3" variant="dark" type="submit">
                    Cadastrar usuário
                </Button>
            </Form>
            <Form.Text>Já possui cadastro? Faça já o
                <Link
                    className="text-warning fw-bold text-decoration-none"
                    to="/login"
                > login</Link>.</Form.Text>
        </Container>
    )
}

export default Register