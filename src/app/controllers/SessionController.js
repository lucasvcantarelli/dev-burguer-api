import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';



// Classe SessionController que contém os métodos para manipulação de sessões 
class SessionController {
    async store(request, response) {

        // Validação dos dados recebidos na requisição usando Yup
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });


        // Validando os dados recebidos na requisição usando Yup
        const isValid = await schema.isValid(request.body, { strict: true });

        // Função para retornar uma resposta de erro caso o e-mail ou a senha estejam incorretos (Como estava sendo repetido várias vezes, criei uma função para evitar repetição de código)
        const emailOrPasswordIncorrect = () => {
            return response.status(400).json({ error: "Email or password incorrect" });

        }

        // Tratando erros de validação e retornando uma resposta adequada
        if (!isValid) {
            emailOrPasswordIncorrect();
        }

        // Verificando se o usuário já existe no banco de dados 
        const { email, password } = request.body;
        // Verificando se o usuário já existe no banco de dados 
        const existingUser = await User.findOne({
            where: {
                email,
            },
        });

        // Tratando o caso em que o usuário não existe e retornando uma resposta adequada
        if (!existingUser) {
            emailOrPasswordIncorrect();
        };
        // Verificando se a senha fornecida pelo usuário é correta
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password_hash,);
        // Tratando o caso em que a senha fornecida pelo usuário é incorreta e retornando uma resposta adequada
        if (!isPasswordCorrect) {
            emailOrPasswordIncorrect();
        };

        const token = jwt.sign({ id: existingUser.id, admin: existingUser.admin }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        }
        );

        // Retornando os dados do usuário autenticado de forma segura, sem expor a senha ou o hash da senha, Depois de logado
        return response.status(200).json({
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            admin: existingUser.admin,
            token,

        });
    }
}
// Exportando a instância da classe SessionController para ser utilizada em outras partes do aplicativo
export default new SessionController();