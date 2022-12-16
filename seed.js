const dbConnection = require('./config/mongoConnection');
const users = require("./data/user.js");
const posts = require("./data/post.js");

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

        let post1 = await posts.createPost('New York', 'This position is available for the CS grad Students', 'Software Engineer',
            'Engineering', '#software engineer', 'Remote', '1000000', 'thiru123')
        let post2 = await posts.createPost('New York', 'Need of web scraping and data mininig expert', 'Web Scraper',
            'Analytics', '#scrapig', 'Remote', '900000', 'thiru123')
        let post3 = await posts.createPost('New York', 'Prior knowledge in Java is required', 'Java Developer',
            'Development', '#software engineer, #java', 'Remote', '800000', 'thiru123')
        let post4 = await posts.createPost('New York', 'Logo designer is required', 'Designer',
            'Designer', '#design #logo', 'Remote', '5000', 'thiru123')
        let post5 = await posts.createPost('New York', 'Atleast Bachelors degree is required to apply for this position',
            'Software Engineer', 'Engineering', '#software engineer', 'Remote', '200000', 'thiru123')



        let post6 = await posts.createPost('New Jersey', 'Basic knowledge in programming is required for this position', 'Software Engineer',
            'Engineering', '#software engineer, #nj', 'Remote', '900000', 'thaarani123')
        let post7 = await posts.createPost('New Jersey', 'senior developer is required', 'Software Developer',
            'Development', '#sde, #nj', 'Remote', '1200000', 'thaarani123')
        let post8 = await posts.createPost('New Jersey', 'Applicants must hold a bachelors degree', 'Software Developer',
            'Development', '#software engineer, #nj', 'Hybrid', '900000', 'thaarani123')
        let post9 = await posts.createPost('New Jersey', 'Content writer is required', 'Content Writer',
            'writer', '#software engineer, #writer', 'Remote', '20000', 'thaarani123')
        let post10 = await posts.createPost('New Jersey', 'This position is available for analysts', 'Data Analyst',
            'Analyst', '#analyst, #data', 'Hybrid', '900000', 'thaarani123')

        let post11 = await posts.createPost('Texas', 'This position is available for undergrad Students', 'SQL Developer',
            'Development', '#dev', 'Hybrid', '800000', 'jesh123')
        let post12 = await posts.createPost('Texas', 'Experience in java is required', 'Java Developer',
            'Development', '#dev', 'Hybrid', '850000', 'jesh123')
        let post13 = await posts.createPost('Texas', 'Application Developer is required for this position', 'Application Developer',
            'App Development', '#app, #dev', 'Hybrid', '1000000', 'jesh123')
        let post14 = await posts.createPost('Texas', 'The person with good coding skills is needed', 'Software Engineer',
            'Engineering', '#dev', 'Hybrid', '800000', 'jesh123')
        let post15 = await posts.createPost('Texas', 'Sales manager is required', 'Sales Manager',
            'Sales Team', '#sales', 'In-Person', '600000', 'jesh123')

        let post16 = await posts.createPost('California', '2+ years of programming knowledge is required for this position', 'python developer',
            'Development', '#python, #dev', 'Remote', '900000', 'swathy')
        let post17 = await posts.createPost('California', 'Prior Knowledge in security is required', 'cyber Securiy Analyst',
            'Security', '#security', 'In-Person', '950000', 'swathy')
        let post18 = await posts.createPost('California', 'Database Specialist is needed', 'Database Developer',
            'Development', '#database, #dev', 'Hybrid', '900000', 'swathy')
        let post19 = await posts.createPost('California', 'Web developer is required for this position', 'web development',
            'Development', '#web, #dev', 'Hybrid', '900000', 'swathy')
        let post20 = await posts.createPost('California', 'Database Engineer is required', 'Database Engineer',
            'Engineering', '#dev,#db', 'Remote', '900000', 'swathy')

        let post21 = await posts.createPost('Virginia', 'Web developer is required for this position, prior work experience in developing websites is required',
            'web developer', 'Development', '#web ,#javascript, #react', 'Remote', '1100000', 'aravindth1')
        let post22 = await posts.createPost('Virginia', 'Prior knowledge in creating visualization dashboard is required',
            'PowerBI developer', 'Development', '#powerBI ,#dashboard', 'Hybrid', '800000', 'aravindth1')
        let post23 = await posts.createPost('Virginia', 'Graduate level degree in Computer Science is required to apply for this position',
            'Software developer', 'Development', '#software ,#dev', 'Hybrid', '700000', 'aravindth1')
        let post24 = await posts.createPost('Virginia', 'People with good analytics skills are required',
            'Business Intellegence Data Engineer', 'Data Engineering', '#data ,#engineering', 'Hybrid', '850000', 'aravindth1')
        let post25 = await posts.createPost('Virginia', 'People with basic Computer Knowledge is required',
            'Data Entry', 'Clerk', '#data', 'In-Person', '200000', 'aravindth1')

    } catch (error) {
        console.log(error)

    }



    console.log('Done seeding database');

    await dbConnection.closeConnection();

}


main();


