const Parse = require('parse')

Parse.initialize("iUK8d7l3m0kCeFWjQsijVwTy0SRV8nYNlB2P7b2S", "7yOd2JKg8xXZVGZnPOyrUdHyXTJDE7zIhGc77OOB");
Parse.serverURL = 'https://parseapi.back4app.com/';

/**
 * Crea un nuevo registro en la tabla Users con los datos introducidos por el usuario registrado
 * @param {String} email 
 * @param {String} password 
 * @param {String} nickname 
 */
function newUser( email, password, nickname ) {
    const User = Parse.Object.extend('Users')
    const NewUser = new User()

    NewUser.set('email', email)
    NewUser.set('password', password)
    NewUser.set('nickname', nickname)

    NewUser.save()
}

/**
 * Devuelve el usuario dado su email y contraseña. En caso de no encontrarlo no devuelve nada
 * @param {String} email 
 * @param {String} password 
 */
function getUserByEmailAndPassword(email, password) {
    const User = Parse.Object.extend('Users')
    const queryGetUserByEmailAndPassword = new Parse.Query(User)

    queryGetUserByEmailAndPassword.equalTo('email', email)
    queryGetUserByEmailAndPassword.equalTo('password', password)

    queryGetUserByEmailAndPassword.first().then(function(userFound) {
        if (userFound) {
            console.log('Usuario encontrado ' + userFound.get('email') + ' ' + userFound.get('password') + ' ' + userFound.get('nickname'))
        } else {
            console.log('No se ha encontrado ningun usuario')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)  
    })
}

/**
 * Devuelve true si encuentra el email dado y en caso contrario false
 * @param {String} email 
 */
function checkIfEmailExists(email) {
    const User = Parse.Object.extend('Users')
    const queryCheckIfEmailExists = new Parse.Query(User)

    queryCheckIfEmailExists.equalTo('email', email)

    //TODO: comprobar si hay algo (usuarios) en el array o no, YA ESTA HECHO JIJI
    queryCheckIfEmailExists.first().then(function(response) {
        if (response) {
            console.log('Email encontrado')
        } else {
            console.log('No se ha encontrado ningun email')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)  
    })
}

/**
 * Dado un id de usuario cambia su nickname actual por el nuevo pasado
 * @param {String} userId 
 * @param {String} newNickname 
 */
function changeUserNickname(userId, newNickname) {
    const User = Parse.Object.extend('Users')
    const queryChangeUserNickname = new Parse.Query(User)

    queryChangeUserNickname.equalTo('objectId', userId)

    queryChangeUserNickname.first().then(function(userFound) {
        if (userFound) {
            userFound.set('nickname', newNickname)
            userFound.save()
        } else {
            console.log('No se ha encontrado ningun usuario')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)  
    })
}

/**
 * Dado un id de usuario y su contraseña actual, la cambia por la nueva pasada
 * @param {String} userId 
 * @param {String} oldPassword 
 * @param {String} newPassword 
 */
function changeUserPassword(userId, oldPassword, newPassword) {
    const User = Parse.Object.extend('Users')
    const queryChangeUserPassword = new Parse.Query(User)

    queryChangeUserPassword.equalTo('objectId', userId)
    queryChangeUserPassword.equalTo('password', oldPassword)

    queryChangeUserPassword.first().then(function(userFound) {
        if (userFound) {
            userFound.set('password', newPassword)
            userFound.save()
        } else {
            console.log('Contraseña incorrecta')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)
    })
}

/**
 * Dado un id de usuario cambia su imagen actual por la nueva pasada
 * @param {String} userId 
 * @param {File} newPicture 
 */
function changeUserPicture(userId, newPicture) {
    const User = Parse.Object.extend('Users')
    const queryChangeUserPicture = new Parse.Query(User)

    queryChangeUserPicture.equalTo('objectId', userId)

    queryChangeUserPicture.first().then(function(userFound) {
        if (userFound) {
            userFound.set('picture', newPicture)
            userFound.save()
        } else {
            console.log('No se ha encontrado ningun usuario')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)
    })
}

/**
 * Crea un nuevo registro en la tabla Contact con los datos introducidos por el formulario
 * @param {String} name 
 * @param {String} email 
 * @param {String} issue 
 * @param {String} text 
 */
function newContact(name, email, issue, text) {
    const Contact = Parse.Object.extend('Contact')
    const newContact = new Contact()

    newContact.set('name', name)
    newContact.set('email', email)
    newContact.set('issue', issue)
    newContact.set('text', text)

    newContact.save()
}

/**
 * Obtiene todas las puntuaciones de una categoria dada
 * @param {String} category 
 */
function getAllScoresOfACategory(category) {
    const Score = Parse.Object.extend('Scores')
    const queryGetAllScoresOfACategory = new Parse.Query(Score)

    queryGetAllScoresOfACategory.equalTo('category', category)
    queryGetAllScoresOfACategory.descending('updatedAt')
    queryGetAllScoresOfACategory.addDescending('average_time')

    queryGetAllScoresOfACategory.find().then(function(categoryFound) {
        if (categoryFound) {
            categoryFound.forEach(score => {
                console.log(score.get('score') + ' ' + score.get('average_time'))
            })
        } else {
            console.log('No se ha encontrado ninguna categoria')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)
    })
}

/**
 * Dado un id de usuario obtiene todas sus puntuaciones
 * @param {String} userId 
 */
function getAllScoresOfUser(userId) {
    const User = Parse.Object.extend('Users')
    const userWithId = new User()
    userWithId.id = userId

    const Score = Parse.Object.extend('Scores')
    const queryGetAllScoresOfUser = new Parse.Query(Score)

    queryGetAllScoresOfUser.equalTo('user_id', userWithId)

    queryGetAllScoresOfUser.findAll().then(function(userFound) {
        if (userFound) {
            userFound.forEach(score => {
                console.log(score.get('score') + ' ' + score.get('average_time') + ' ' + score.get('category'))
            })
        } else {
            console.log('No se ha encontrado ningun usuario')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)
    })
}

/**
 * Dado un id de usuario y su nueva puntuacion y tiempo medio, sobrescribe las actuales en la categoria dada
 * @param {String} userId 
 * @param {Number} score 
 * @param {Number} averageTime 
 * @param {String} category 
 */
function setNewScore(userId, score, averageTime, category) {
    const User = Parse.Object.extend('Users')
    const userWithId = new User()
    userWithId.id = userId

    const Score = Parse.Object.extend('Scores')
    const querySetNewScore = new Parse.Query(Score)

    querySetNewScore.equalTo('category', category)
    querySetNewScore.equalTo('user_id', userWithId)

    querySetNewScore.first().then(function(userFound) {
        if (userFound) {
            userFound.set('score', score)
            userFound.set('average_time', averageTime)
            userFound.save()
        } else {
            console.log('No se ha encontrado ningun usuario')
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)  
    })
}

function getAllQuestionsAndAnswersByCategory(category) {
    const QuestionsAnswers = Parse.Object.extend('Questions_Answers')
    const queryGetAllQuestionsAndAnswersByCategory = new Parse.Query(QuestionsAnswers)
    
    queryGetAllQuestionsAndAnswersByCategory.equalTo('question_id', )

    // queryGetAllQuestionsAndAnswersByCategory.findAll().then(function(question) {
    //     if (question) {
            
    //     } else {

    //     }
    // }).catch(function(error) {
    //     console.log("Error: " + error.code + " " + error.message)  
    // })
}

exports.newUser = newUser
exports.getUserByEmailAndPassword = getUserByEmailAndPassword
exports.checkIfEmailExists = checkIfEmailExists
exports.changeUserNickname = changeUserNickname
exports.changeUserPassword = changeUserPassword
exports.changeUserPicture = changeUserPicture
exports.newContact = newContact
exports.getAllScoresOfACategory = getAllScoresOfACategory
exports.getAllScoresOfUser = getAllScoresOfUser
exports.setNewScore = setNewScore