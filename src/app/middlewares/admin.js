
// Middleware para verificar se o token está presente na requisição
const adminMiddleware = (request, response, next) => {
    // Verifica se o token está presente na requisição
    const isUserAdmin = request.userIsAdmin;

    if (!isUserAdmin) {
        return response.status(401).json();
    }


    return next();

};

export default adminMiddleware;