const home = require('./home')
const login = require('./login')
const logout = require('./logout')
const user = require('./user')
const employee = require('./employee')
const employer = require('./employer')

const constructorMethod = (app) => {
    //middleware function
    app.use('/', home);
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/signup', signup)
    app.use('/user', foodLog)
    app.use('/employee', progress);
    app.use('/employer', exerciseLog);
    app.use('*', (req, res) => {
        res.status(404).render('errors/404');
    });
};

module.exports = constructorMethod;