const dbConnection = require('./config/mongoConnection');
const posts = require("./data/post");

async function mainTwo() {
    const db = await dbConnection.connectToDb();
    try {
        let post1 = await posts.createPost('New York', 'This position is available for the CS grad Students', 'Software Engineer',
            'Programming and Tech', '#software engineer', 'Remote', '1000000', 'thiru123')
        let post2 = await posts.createPost('New York', 'Need of web scraping and data mininig expert', 'Web Scraper',
            'Sales', '#scrapig', 'Remote', '900000', 'thiru123')
        let post3 = await posts.createPost('New York', 'Prior knowledge in Java is required', 'Java Developer',
            'Programming and Tech', '#software engineer, #java', 'Remote', '800000', 'thiru123')
        let post4 = await posts.createPost('New York', 'Logo designer is required', 'Designer',
            'Sales', '#design #logo', 'Remote', '5000', 'thiru123')
        let post5 = await posts.createPost('New York', 'Atleast Bachelors degree is required to apply for this position',
            'Software Engineer', 'Programming and Tech', '#software engineer', 'Remote', '200000', 'thiru123')
        let post6 = await posts.createPost('New Jersey', 'Basic knowledge in programming is required for this position', 'Software Engineer',
            'Programming and Tech', '#software engineer, #nj', 'Remote', '900000', 'thaarani123')
        let post7 = await posts.createPost('New Jersey', 'senior developer is required', 'Software Developer',
            'Programming and Tech', '#sde, #nj', 'Remote', '1200000', 'thaarani123')
        let post8 = await posts.createPost('New Jersey', 'Applicants must hold a bachelors degree', 'Software Developer',
            'Programming and Tech', '#software engineer, #nj', 'Hybrid', '900000', 'thaarani123')
        let post9 = await posts.createPost('New Jersey', 'Content writer is required', 'Content Writer',
            'Writing', '#software engineer, #writer', 'Remote', '20000', 'thaarani123')
        let post10 = await posts.createPost('New Jersey', 'This position is available for analysts', 'Data Analyst',
            'Sales', '#analyst, #data', 'Hybrid', '900000', 'thaarani123')
        let post11 = await posts.createPost('Texas', 'This position is available for undergrad Students', 'SQL Developer',
            'Programming and Tech', '#dev', 'Hybrid', '800000', 'jesh123')
        let post12 = await posts.createPost('Texas', 'Experience in java is required', 'Java Developer',
            'Programming and Tech', '#dev', 'Hybrid', '850000', 'jesh123')
        let post13 = await posts.createPost('Texas', 'Application Developer is required for this position', 'Application Developer',
            'Programming and Tech', '#app, #dev', 'Hybrid', '1000000', 'jesh123')
        let post14 = await posts.createPost('Texas', 'The person with good coding skills is needed', 'Software Engineer',
            'Programming and Tech', '#dev', 'Hybrid', '800000', 'jesh123')
        let post15 = await posts.createPost('Texas', 'Sales manager is required', 'Sales Manager',
            'Sales', '#sales', 'In-Person', '600000', 'jesh123')
        let post16 = await posts.createPost('California', '2+ years of programming knowledge is required for this position', 'python developer',
            'Programming and Tech', '#python, #dev', 'Remote', '900000', 'swathy')
        let post17 = await posts.createPost('California', 'Prior Knowledge in security is required', 'cyber Securiy Analyst',
            'Programming and Tech', '#security', 'In-Person', '950000', 'swathy')
        let post18 = await posts.createPost('California', 'Database Specialist is needed', 'Database Developer',
            'Programming and Tech', '#database, #dev', 'Hybrid', '900000', 'swathy')
        let post19 = await posts.createPost('California', 'Web developer is required for this position', 'web development',
            'Programming and Tech', '#web, #dev', 'Hybrid', '900000', 'swathy')
        let post20 = await posts.createPost('California', 'Database Engineer is required', 'Database Engineer',
            'Programming and Tech', '#dev,#db', 'Remote', '900000', 'swathy')
        let post21 = await posts.createPost('Virginia', 'Web developer is required for this position, prior work experience in developing websites is required',
            'web developer', 'Programming and Tech', '#web ,#javascript, #react', 'Remote', '1100000', 'aravindth1')
        let post22 = await posts.createPost('Virginia', 'Prior knowledge in creating visualization dashboard is required',
            'PowerBI developer', 'Programming and Tech', '#powerBI ,#dashboard', 'Hybrid', '800000', 'aravindth1')
        let post23 = await posts.createPost('Virginia', 'Graduate level degree in Computer Science is required to apply for this position',
            'Software developer', 'Programming and Tech', '#software ,#dev', 'Hybrid', '700000', 'aravindth1')
        let post24 = await posts.createPost('Virginia', 'People with good analytics skills are required',
            'Business Intellegence Data Engineer', 'Sales', '#data ,#engineering', 'Hybrid', '850000', 'aravindth1')
        let post25 = await posts.createPost('Virginia', 'People with basic Computer Knowledge is required',
            'Data Entry', 'Sales', '#data', 'In-Person', '200000', 'aravindth1')
    } catch (e) {
        console.log(e);
    }

    await dbConnection.closeConnection();
}

mainTwo();


// module.exports = {
//     seedPosts: mainTwo
// }