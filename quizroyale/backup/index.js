const mysql = require('mysql2')

const connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    database: 'quizroyale'
})

connection.query(
    'SELECT * FROM categorias',
    function(err, results, fields) {
        console.log(results);
    }
)

const insertNewUser = ({nickname, email, contraseña, imagen}) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO usuarios (nickname, email, contraseña, imagen) VALUES (?, ?, ?, ?)', [nickname, email, contraseña, imagen], (err, result) => {
            if (err) reject(err)
            if (result) {
                resolve(result)
            }
        })
    })
}

const getByEmailAndPassword = (email, contraseña) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuarios WHERE email = ? AND contraseña = ?', [email, contraseña], (err, rows) => {
            if (err) reject(err)
            resolve(rows[0])
        })
    })
}

const getEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuarios WHERE email = ?', [email, contraseña], (err, rows) => {
            if (err) reject(err)
            resolve(rows[0])
        })
    })
}

const newNickname = (nickname) => {
    
}