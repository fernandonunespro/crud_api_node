const express = require("express");
const server = express();

server.use(express.json());

//Query params = ?nome=NodeJS
// Route params = /curso/2
// Request body = { nome: 'NodeKs', tipo: '/Backend'}

const cursos = ['Node Js', 'JavaScript', 'ReactNative'];

//MIDDLEWARE GLOBAL
server.use((req, res, next)=>{
    console.log(`URL CHAMADA: ${req.url}`);

    return next()
})

function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: "Nome do curso é obrigatório"});
    }

    return next();
}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];

    if(!curso){
        return res.status(400).json({ error: "O usuário nao existe"});
    }

    return next();
}

//Listando Cursos(READ)
server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

//Listando um curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;

    return res.json(cursos[index]);

});

//Criando um novo curso(CREATE)
server.post('/cursos', checkCurso, (req, res)=> {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

//Atualizando um curso(UPDATE)
server.put('/cursos/:index', checkCurso, (req, res)=> {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);

})

//Deletando curso(DELETE)
server.delete('/cursos/:index', checkIndexCurso, (req, res)=>{
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.json(cursos);
})


server.listen(8000)