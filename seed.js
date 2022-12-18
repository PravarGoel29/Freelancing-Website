const dbConnection = require('./config/mongoConnection');
const users = require("./data/user");

async function main() {
    const db = await dbConnection.connectToDb();
    await db.dropDatabase();

    try {
        //users
        let thiru = await users.createUser('thiru123', 'thiru', 'naa', 'thiru@gmail.com', 'Password@123', '4235687123', 'male',
            '1995-12-12', 'cs')
        let jesh = await users.createUser('jesh123', 'jesh', 'wanth', 'ts@stevens.edu', 'Password@123', '5513581851', 'male',
            '1999-01-12', 'python')
        let aravindth = await users.createUser('aravindth1', 'aravindth', 'shiva', 'thaaranis13@gmail.com', 'Password@123', '2891999999', 'male',
            '1996-01-11', 'java')
        let koushal = await users.createUser('koushal', 'koushal', 'raja', 'test@gmail.com', 'Password@123', '5514351872', 'male',
            '1995-02-02', 'java, javascript')
        let swathy = await users.createUser('swathy', 'swathy', 'purush', 'test1@gmail.com', 'Password@123', '7689543256', 'female',
            '1998-12-12', 'react,javascript')
        let pravar = await users.createUser('praver1', 'pravar', 'goel', 'test2@gmail.com', 'Password@123', '9826512367', 'male',
            '1992-03-03', 'c,c++')
        let ruchir = await users.createUser('ruchir', 'ruchir', 'shri', 'test3@gmail.com', 'Password@123', '6543789213', 'male',
            '1997-01-04', 'java')
        let rakesh = await users.createUser('rakesh1', 'rakesh', 'balaji', 'test4@gmail.com', 'Password@123', '8765341230', 'male',
            '1995-01-02', 'c++')
        let keerthana = await users.createUser('keerthana1', 'keer', 'thana', 'test5@gmail.com', 'Password@123', '5528791265', 'female',
            '1995-07-03', 'python')
        let thaarani = await users.createUser('thaarani123', 'thiru', 'naa', 'thaar17@gmail.com', 'Password@123', '5513581851', 'female',
            '1997-07-12', 'c,c++,python')

    } catch (error) {
        console.log(error)

    }
    console.log('Done seeding database');

    await dbConnection.closeConnection();
}
main();

// module.exports = {
//     seedUsers: main
// }



