/* 

METODOS DE UM CONTROLLER - PADRÃO MVC
    store -> cria qualquer coisa (usuario, entre outros)
    index -> lista todos os dados
    show -> listar um dado especifico
    update -> atualiza dados
    delete -> remover dados

    Esses metodos não podem se repertir !!
*/

// Importando as dependências necessárias
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from "../models/User.js";



// Classe UserController que contém os métodos para manipulação de usuários
class UserController {
    async store(request, response) {
        // Validação dos dados recebidos na requisição usando Yup
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });

        // Tratando erros de validação e retornando uma resposta adequada
        try {
            schema.validateSync(request.body, { abortEarly: false, strict: true });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }


        // Extraindo os dados do corpo da requisição
        const { name, email, password, admin } = request.body;
        // Tratando erro de e-mail duplicado, fazendo não da erro !
        const existingUser = await User.findOne({
            where: {
                email,
            },
        });

        if (existingUser) {
            return response.status(400).json({ message: 'Email already taken!' });
        };



        const password_hash = await bcrypt.hash(password, 10);


        // Criando o usuário
        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin,

        });
        // Retornando o usuário criado
        return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,

        });
    }
}
// Exportando a classe UserController como uma instância para ser utilizada em outros arquivos
export default new UserController();