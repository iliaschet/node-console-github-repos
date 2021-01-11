const https = require('https')

const getRepos = (username, done) => {
    if(!username) return done(new Error('Необходимо указать имя пользователя'))

    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/repos`,
        headers: {
            'User-Agent': 'iliaschet'
        }
    }
    const req = https.get(options, res => {
        res.setEncoding('utf-8')

        if (res.statusCode === 200) {
            let body = ''
            res.on('data', (data) => body += data)
            res.on('end', () => {
                try {
                    done(null, JSON.parse(body))
                } catch (error) {
                    done(new Error('Ошибка в полученных данных'))
                }
            })            
        } else {
            done(new Error(`Не удалось получить данные от сервера (${res.statusCode}, ${res.statusMessage})`))
        }
    })

    req.on('error', error => done(new Error(`Не удалось отправить запрос ${error.message}`)))
}

module.exports = {
    getRepos
}