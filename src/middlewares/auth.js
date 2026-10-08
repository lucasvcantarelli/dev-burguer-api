import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

// Middleware para verificar se o token está presente na requisição
const authMiddleware = (request, response, next) => {
    // Verifica se o token está presente na requisição
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const token = authToken.split(' ')[1];

    try {
        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if (error) {
                throw Error();
            }

            request.userId = decoded.id;
        });
    } catch (_error) {
        return response.status(401).json({ error: 'Token is invalid' });
    }

    return next();

};

export default authMiddleware;