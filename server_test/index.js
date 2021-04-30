const Model = require('./models/model')

// Area de pruebas

console.log('Area pruebas')
// Model.checkIfEmailExists('pedrin@quizroyale.com')
Model.getAllScoresOfUser('hl8iyxzgRi')
.then(response => {
    console.log(response)
})