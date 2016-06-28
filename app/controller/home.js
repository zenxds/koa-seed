'use strict'

module.exports = {
    index: function *() {
        yield this.render('index', {
            token: this.csrf
        })
    }
}