const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');


app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});
app.use('/dogs', (req, res, next) => {
    console.log('I love Dogs!');
    next();
});
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();

    }
    throw new AppError('password required', 401);
    // res.status(401);
    // res.send('Sorry You Need A Password!!!');
    // throw new AppError(401,'Password required!');

}

// app.use((req, res, next) => {
//     console.log("This is my first middleware!!!");
//     return next();
//     console.log('This is my first middleware after next!!!');
// });
// app.use((req, res, next) => {
//     console.log("This is my second middleware!!!");
//     return next();

// });
// app.use((req, res, next) => {
//     console.log("This is my third middleware!!!");
//     return next();

// });

app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('HOME PAGE!');
});
app.get('/error', (req, res) => {
    chicken.fly();
})
app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('Woof! Woof!');
});
app.get('/secret', verifyPassword, (req, res) => {
    res.send('My Secret is: Sometimes I wear headphones in public so that I dont have to talk to anyone');
});
app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403);
})
app.use((req, res) => {
    res.status(404);
    res.send('Not Found');
});
// app.use((err, req, res, next) => {
//     console.log('******************************');
//     console.log('*************ERROR************');
//     console.log('******************************');
//     // res.status(500).send('Oh boy, we got an error!')
//     next(err);
// });
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;

    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
});