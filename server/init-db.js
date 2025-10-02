const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Course = require('./models/Course');
const Event = require('./models/Event');
const Resource = require('./models/Resource');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/abhishek-coaching', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function initializeData() {
  try {
    console.log('Initializing database...');

    // Create admin account
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'admin',
        password: 'admin123',
        email: 'admin@abhishekcoaching.com'
      });
      await admin.save();
      console.log('✅ Admin account created');
    } else {
      console.log('✅ Admin account already exists');
    }

    // Create courses
    const courses = [
      {
        name: 'Lakshya 90',
        description: 'CBSE Class 10 Special Batch - Complete syllabus coverage with regular assessments',
        fee: 6000,
        duration: '1 Year',
        timing: '4 PM – 9 PM',
        features: ['Complete CBSE syllabus coverage', 'Regular assessments', 'Doubt clearing sessions', 'One-time payment']
      },
      {
        name: 'Sankalp',
        description: 'Navodaya Vidyalaya Preparation - Specialized coaching for entrance exams',
        fee: 15000,
        duration: '1-3 Years',
        timing: '4 PM – 9 PM',
        features: ['Class 3 Entry: ₹15,000 (3 years)', 'Class 4 Entry: ₹13,000 (2 years)', 'Class 5 Entry: ₹8,000 (1 year)', 'Specialized preparation']
      },
      {
        name: 'MIT30',
        description: 'Spoken English Mastery - Intensive 3-month course for English fluency',
        fee: 1499,
        duration: '3 Months',
        timing: '4 PM – 9 PM',
        features: ['3 months intensive course', 'Practical speaking sessions', 'Grammar fundamentals', 'One-time payment']
      },
      {
        name: 'MIB 1.0',
        description: 'Biology NCERT Mastery - Complete coverage of Class 11 & 12 Biology',
        fee: 4000,
        duration: 'Flexible',
        timing: '4 PM – 9 PM',
        features: ['Class 11 & 12 Biology', 'Complete NCERT coverage', 'Monthly or one-time payment', 'Conceptual clarity']
      }
    ];

    for (const courseData of courses) {
      const existingCourse = await Course.findOne({ name: courseData.name });
      if (!existingCourse) {
        const course = new Course(courseData);
        await course.save();
        console.log(`✅ Course "${courseData.name}" created`);
      } else {
        console.log(`✅ Course "${courseData.name}" already exists`);
      }
    }

    // Create sample events
    const events = [
      {
        title: 'Winter Olympiad 2024',
        description: 'Join our annual Winter Olympiad competition for students of all classes. Test your knowledge and win exciting prizes!',
        date: new Date('2024-12-15'),
        location: 'Abhishek Coaching Classes',
        fee: 200
      },
      {
        title: 'Parent-Teacher Meeting',
        description: 'Monthly parent-teacher meeting to discuss student progress and address any concerns.',
        date: new Date('2024-12-20'),
        location: 'Abhishek Coaching Classes',
        fee: 0
      },
      {
        title: 'Mock Test Series Launch',
        description: 'Introduction to our comprehensive mock test series for board exam preparation.',
        date: new Date('2024-12-25'),
        location: 'Abhishek Coaching Classes',
        fee: 300
      }
    ];

    for (const eventData of events) {
      const existingEvent = await Event.findOne({ title: eventData.title });
      if (!existingEvent) {
        const event = new Event(eventData);
        await event.save();
        console.log(`✅ Event "${eventData.title}" created`);
      } else {
        console.log(`✅ Event "${eventData.title}" already exists`);
      }
    }

    // Create sample resources
    const resources = [
      {
        title: 'CBSE Class 10 Mathematics Notes',
        description: 'Comprehensive notes covering all chapters of CBSE Class 10 Mathematics syllabus',
        fileType: 'pdf',
        category: 'notes',
        fileUrl: '#'
      },
      {
        title: 'Sample Paper - Mathematics Class 10',
        description: 'Latest CBSE sample paper for Mathematics Class 10 with marking scheme',
        fileType: 'pdf',
        category: 'sample-papers',
        fileUrl: '#'
      },
      {
        title: 'Navodaya Vidyalaya Syllabus',
        description: 'Complete syllabus for Navodaya Vidyalaya entrance examination',
        fileType: 'pdf',
        category: 'syllabus',
        fileUrl: '#'
      },
      {
        title: 'Important Announcement - Mock Tests',
        description: 'Schedule and guidelines for upcoming mock test series',
        fileType: 'pdf',
        category: 'announcements',
        fileUrl: '#'
      },
      {
        title: 'Biology NCERT Solutions',
        description: 'Detailed solutions for NCERT Biology textbook questions',
        fileType: 'pdf',
        category: 'notes',
        fileUrl: '#'
      }
    ];

    for (const resourceData of resources) {
      const existingResource = await Resource.findOne({ title: resourceData.title });
      if (!existingResource) {
        const resource = new Resource(resourceData);
        await resource.save();
        console.log(`✅ Resource "${resourceData.title}" created`);
      } else {
        console.log(`✅ Resource "${resourceData.title}" already exists`);
      }
    }

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\nAdmin Login Credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\nYou can now start the application with: npm run dev');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
}

initializeData();
