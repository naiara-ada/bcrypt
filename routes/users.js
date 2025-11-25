const express = require('express');
const routes = express.Router();
const {generateToken, verifyToken} = require('../middlewares/authMiddleware');
const {users} = require('../data/users');

routes.get('/', (req, res)=>{
    const token = req.session.token;
    let template;
    if(!token){
        template = `
        <form action="/login" method="post">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" required></br>
    
            <label for="password">Constraseña: </label>
            <input type="password" id="password" name="password" required></br></br>
    
            <button type="submit">Iniciar sesión</button>    
        </form>               
        `;
    } else{
        template= `
            <h1>Home</h1>
            <a href="/dashboard">Dashboard</a>
            <form action="/logout" method="post">
                <button type="submit">Logout</button>
            </form>
            `;
    }   
    res.send(template);
})

routes.post('/login', (req, res)=>{
    const {username, password} = req.body;
    const user = users.find((user)=> user.username === username && user.password === password);
    if (user){
        const token = generateToken(user);
        req.session.token = token;
        res.redirect('/dashboard');
    } else{
        res.status(401).json({mensaje: 'Credenciales incorrectas'});
    }
})

routes.get('/dashboard', verifyToken, (req, res)=>{
    const userId = req.user;
    const user = users.find((user)=> user.id === userId);
    if (user){
        res.send(`
            <h1>Bienvenido, ${user.name}</h1>
            <p>ID: ${user.id}</p>
            <p>UserName: ${user.username}</p>
            <a href="/">HOME</a>
            <form action="/logout" method="post">
                <button type="submit">Cerrar Sesión</button>
            </form>        
        `)
    }else{
        res.status(401).json({mensaje: 'usuario no encontrado'});
    }
})

routes.post('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
})

module.exports = routes;