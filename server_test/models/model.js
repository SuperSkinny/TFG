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
 * @returns {JSON}
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
 * @returns {boolean}
 */
async function checkIfEmailExists(email) {
    const User = Parse.Object.extend('Users')
    const queryCheckIfEmailExists = new Parse.Query(User)

    queryCheckIfEmailExists.equalTo('email', email)

    try {
        const response = await queryCheckIfEmailExists.first()

        if (response !== undefined) {
            return true
        } else {
            return false
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }
}

/**
 * Dado un id de usuario cambia su email actual por el nuevo pasado
 * @param {String} userId 
 * @param {String} newEmail 
 */
function changeUserEmail(userId, newEmail) {
    const User = Parse.Object.extend('Users')
    const queryChangeUserEmail = new Parse.Query(User)

    queryChangeUserEmail.equalTo('objectId', userId)

    queryChangeUserEmail.first().then(function(userFound) {
        if (userFound) {
            userFound.set('email', newEmail)
            userFound.save()
        } else {
            console.log('No se ha encontrado ningun usuario')
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
 * @returns {Array}
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

        if (response.length !== 0) {
            response.forEach(score => {
                scores.push(score.toJSON())
            })
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }

    return scores
}

/**
 * Dado un id de usuario obtiene todas sus puntuaciones
 * @param {String} userId 
 * @returns {Array}
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
        
        if (response.length !== 0) {
            response.forEach(score => {
                scores.push(score.toJSON())
            })
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }

    return scores
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

/**
 * Devuelve todas las categorias existentes
 * @returns {Array}
 */
async function getCategories() {
    const Category = Parse.Object.extend('Categories')
    const getCategories = new Parse.Query(Category)

    let categories = []

    try {
        const response = await getCategories.findAll()

        if (response.length !== 0) {
            response.forEach(category => {
                categories.push(category)
            })
        } else {
            return null
        } 
    } catch {
        console.log('No se ha podido completar la petición')
    }

    return categories
}

/**
 * Dado un id de categoria devuelve un array con todas las preguntas de esa categoria
 * @param {String} categoryId 
 * @returns {Array}
 */
async function getAllQuestionsByCategory(categoryId) {
    const Question = Parse.Object.extend('Questions')
    const getAllQuestionsByCategory = new Parse.Query(Question)

    const Category = Parse.Object.extend('Categories')
    const categoryWithId = new Category()
    categoryWithId.id = categoryId

    getAllQuestionsByCategory.equalTo('category', categoryWithId)

    let questions = []

    try {
        const response = await getAllQuestionsByCategory.findAll()

        if (response.length !== 0) {
            response.forEach(question => {
                questions.push(question.toJSON())
            })
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }

    return questions
}

/**
 * Dado un id de pregunta devuelve un array con todas las respuestas de esa pregunta
 * @param {String} questionId 
 * @returns {Array}
 */
async function getAllAnswersByQuestion(questionId) {
    const Answer = Parse.Object.extend('Answers')
    const getAllAnswersByQuestion = new Parse.Query(Answer)

    const Question = Parse.Object.extend('Questions')
    const questionWithId = new Question()
    questionWithId.id = questionId

    getAllAnswersByQuestion.equalTo('question', questionWithId)

    let answers = []

    try {
        const response = await getAllAnswersByQuestion.findAll()

        if (response.length !== 0) {
            response.forEach(answer => {
                answers.push(answer.toJSON())
            })
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }

    return answers
}

/**
 * Dado una categoria devuelve un array con todas las preguntas y sus respuestas de esa categoria
 * @param {*} category 
 * @returns {Array}
 */
async function getAllQuestionsAndAnswersByCategory(category) {
    const Category = Parse.Object.extend('Categories')
    const getCategoryId = new Parse.Query(Category)

    getCategoryId.equalTo('category', category)
    
    let categoryId

    try {
        const response = await getCategoryId.first()

        if (response !== undefined) {
            categoryId = response.id
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }

    let questionsId = []
    let questions = []

    try {
        const response = await getAllQuestionsByCategory(categoryId)

        if (response.length !== 0) {
            response.forEach(question => {
                questionsId.push(question.objectId)
                questions.push(question.question)
            })
        } else {
            return null
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }

    let answersArray = []
    let answers = []
    var i

    try {
        for (i = 0; i < questionsId.length; i++) {
            const response = await getAllAnswersByQuestion(questionsId[i])

            if (response.length !== 0) {
                response.forEach(answer => {
                    answersArray.push(answer)
                })
                answers.push(answersArray)
                answersArray = [] 
            } else {
                return null
            }
        }
    } catch {
        console.log('No se ha podido completar la petición')
    }

    let questionsAndAnswers = []
    var j

    for (j = 0; j < questionsId.length; j++) {
        var questionAndAnswers = {}
        questionAndAnswers[questions[j]] = answers[j]
        questionsAndAnswers.push(questionAndAnswers)
    }

    return questionsAndAnswers
}

exports.newUser = newUser
exports.getUserByEmailAndPassword = getUserByEmailAndPassword
exports.checkIfEmailExists = checkIfEmailExists
exports.changeUserEmail = changeUserEmail
exports.changeUserNickname = changeUserNickname
exports.changeUserPassword = changeUserPassword
exports.changeUserPicture = changeUserPicture
exports.newContact = newContact
exports.getAllScoresOfACategory = getAllScoresOfACategory
exports.getAllScoresOfUser = getAllScoresOfUser
exports.setNewScore = setNewScore
exports.getCategories = getCategories
exports.getAllQuestionsByCategory = getAllQuestionsByCategory
exports.getAllAnswersByQuestion = getAllAnswersByQuestion
exports.getAllQuestionsAndAnswersByCategory = getAllQuestionsAndAnswersByCategory