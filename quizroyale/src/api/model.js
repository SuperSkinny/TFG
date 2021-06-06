const Parse = require('parse/node')

Parse.initialize("jYfUKHooKJNkiyp5PHGaAt51sllxeXunkDRHZhod", "kLitBW8uEHibwENbhwiw3Pcuf9SVIGjDK9AmwCJ1");
Parse.serverURL = 'https://parseapi.back4app.com/';

/**
 * Crea un nuevo registro en la tabla Users con los datos introducidos por el usuario registrado
 * @param {String} email 
 * @param {String} password 
 * @param {String} nickname 
 */
export const newUser = ( email, password, nickname ) => {
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
export const getUserByEmailAndPassword = async (email, password) => {
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
export const checkIfEmailExists = async (email) => {
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
export const changeUserEmail = (userId, newEmail) => {
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
export const changeUserNickname = (userId, newNickname) => {
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
export const changeUserPassword = (userId, oldPassword, newPassword) => {
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
export const changeUserPicture = (userId, newPicture) => {
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
export const newContact = (name, email, issue, text) =>  {
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
export const getBestThreeScoresOfACategory = async (category) => {
    let scores = []
    
    const Score = Parse.Object.extend('Scores')
    const queryGetAllScoresOfACategory = new Parse.Query(Score)

    queryGetAllScoresOfACategory.equalTo('category', category)
    queryGetAllScoresOfACategory.descending('score')

    try {
        const response = await queryGetAllScoresOfACategory.find()

        if (response.length !== 0) {
            var contador = 1
            response.forEach(score => {
                if (contador <= 3) {
                    scores.push(score.toJSON())
                    contador++
                }
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
 * Dado un id de usuario y una categoria obtiene todas su puntuacion y posicion de dicha categoria
 * @param {String} UID 
 * @param {String} category
 * @returns {Array}
 */
 export const getScoreAndPositionOfUserByIdAndCategory = async (UID, category) => {
    let scores = []

    const Score = Parse.Object.extend('Scores')
    const queryGetAllScoresOfCategory = new Parse.Query(Score)

    queryGetAllScoresOfCategory.equalTo('category', category)
    queryGetAllScoresOfCategory.descending('score')
    
    var position = 1

    try {
        const response = await queryGetAllScoresOfCategory.find()

        if (response.length !== 0) {
            response.forEach(score => {
                if (score.toJSON().UID != UID) {
                    position++
                } else {
                    scores.push(score.toJSON())
                    scores[0]['position'] = position
                }
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
 * Sobreescribe o añade una puntuacion y nombre dado un id de usuario y categoria
 * @param {String} UID 
 * @param {Number} score
 * @param {String} name
 * @param {String} category 
 */
export const setNewScore = (UID, score, name, category) => {
    const Score = Parse.Object.extend('Scores')
    const querySetNewScore = new Parse.Query(Score)

    querySetNewScore.equalTo('UID', UID)
    querySetNewScore.equalTo('category', category)

    querySetNewScore.first().then(function(userFound) {
        if (userFound) {
            userFound.set('score', score)
            userFound.set('name', name)
            userFound.save()
        } else {
            const newScore = new Score()
            newScore.set('category', category)
            newScore.set('score', score)
            newScore.set('name', name)
            newScore.set('UID', UID)
            newScore.save()
        }
    }).catch(function(error) {
        console.log("Error: " + error.code + " " + error.message)  
    })
}

/**
 * Devuelve todas las categorias existentes
 * @returns {Array}
 */
export const getCategories = async () => {
    const Category = Parse.Object.extend('Categories')
    const getCategories = new Parse.Query(Category)

    let categories = []

    try {
        const response = await getCategories.findAll()

        if (response.length !== 0) {
            response.forEach(category => {
                categories.push(category.toJSON())
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
export const getAllQuestionsByCategory = async (categoryId) => {
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
export const getAllAnswersByQuestion = async (questionId) => {
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
 * @param {String} category 
 * @returns {Array}
 */
export const getAllQuestionsAndAnswersByCategory = async (category) => {
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
        var questionAndAnswers = {
            question: questions[j],
            answer1: answers[j][0],
            answer2: answers[j][1],
            answer3: answers[j][2],
        }
        questionsAndAnswers.push(questionAndAnswers)
    }

    return questionsAndAnswers
}