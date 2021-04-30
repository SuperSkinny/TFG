const Parse = require('parse/node')

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
async function getUserByEmailAndPassword(email, password) {
    const User = Parse.Object.extend('Users')
    const queryGetUserByEmailAndPassword = new Parse.Query(User)

    queryGetUserByEmailAndPassword.equalTo('email', email)
    queryGetUserByEmailAndPassword.equalTo('password', password)

    try {
        const response = await queryGetUserByEmailAndPassword.first()
        
        if (response !== undefined) {
            return response.toJSON()
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }
}

/**
 * Devuelve true si encuentra el email dado y en caso contrario false
 * @param {String} email 
 */
async function checkIfEmailExists(email) {
    const User = Parse.Object.extend('Users')
    const queryCheckIfEmailExists = new Parse.Query(User)

    queryCheckIfEmailExists.equalTo('email', email)

    try {
        const response = await queryCheckIfEmailExists.first()

        if (response !== undefined) {
        // if (!!response) {
            return true
        } else {
            return false
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }
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
async function getAllScoresOfACategory(category) {
    let scores = []
    
    const Score = Parse.Object.extend('Scores')
    const queryGetAllScoresOfACategory = new Parse.Query(Score)

    queryGetAllScoresOfACategory.equalTo('category', category)
    queryGetAllScoresOfACategory.descending('updatedAt')
    queryGetAllScoresOfACategory.addDescending('average_time')

    try {
        const response = await queryGetAllScoresOfACategory.find()

        // Chequear que si pones mal la categoria devuelve []
        if (response !== undefined) {
            response.forEach(score => {
                scores.push(score.toJSON())
            })
            return scores
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }
}

/**
 * Dado un id de usuario obtiene todas sus puntuaciones
 * @param {String} userId 
 */
async function getAllScoresOfUser(userId) {
    let scores = []

    const User = Parse.Object.extend('Users')
    const userWithId = new User()
    userWithId.id = userId

    const Score = Parse.Object.extend('Scores')
    const queryGetAllScoresOfUser = new Parse.Query(Score)

    queryGetAllScoresOfUser.equalTo('user_id', userWithId)

    try {
        const response = await queryGetAllScoresOfUser.findAll()
        
        if (response !== undefined) {
            response.forEach(score => {
                scores.push(score.toJSON())
            })
            return scores
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }
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
    // const Category = Parse.Object.extend('Categories')
    // const categoryWithCategory = new Category()
    // categoryWithCategory.category = category

    // const queryGetCategoryIDByCategory = new Parse.Query(Category)
    // queryGetCategoryIDByCategory.equalTo('category', categoryWithCategory)

    // queryGetAllQuestionsOfACategory.findAll().then(function)

    // const Question = Parse.Object.extend('Questions')
    // const queryGetAllQuestionsOfACategory = new Parse.Query(Question)

    // queryGetAllQuestionsOfACategory.equalTo('category', categoryWithCategory)

    // queryGetAllQuestionsOfACategory.findAll().then(function(response) {
    //     if (response)
    //         console.log(response)
    // }).catch(function(error) {
    //     console.log("Error: " + error.code + " " + error.message)  
    // })

    // const QuestionsAnswers = Parse.Object.extend('Questions_Answers')
    // const queryGetAllQuestionsAndAnswersByCategory = new Parse.Query(QuestionsAnswers)
    
    // queryGetAllQuestionsAndAnswersByCategory.equalTo('question_id', )

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
exports.getAllQuestionsAndAnswersByCategory = getAllQuestionsAndAnswersByCategory