# Abhishek Coaching Classes Website

A comprehensive MERN stack website for Abhishek Coaching Classes, featuring course management, admission enquiries, events, resources, and an admin dashboard.

## Features

### Public Features
- **Home Page**: Welcome section with course highlights and features
- **Courses**: Detailed information about all available courses
- **Admission Form**: Online enquiry form with consent and validation
- **Events**: Upcoming workshops and competitions
- **Resources**: Study materials, sample papers, and announcements
- **Contact**: Contact information and FAQ section
- **Chatbot**: AI-powered assistant for common queries

### Admin Features
- **Dashboard**: Overview of admissions, courses, events, and resources
- **Admission Management**: View and update admission enquiry status
- **Course Management**: Add, edit, and manage courses
- **Event Management**: Create and manage events/workshops
- **Resource Management**: Upload and manage study materials

## Course Information

### Available Courses
1. **Lakshya 90** (CBSE Class 10 Special Batch)
   - Fee: ₹6,000 (1-year, one-time)
   - Timing: 4 PM – 9 PM

2. **Sankalp** (Navodaya Vidyalaya Preparation)
   - Class 3 Entry: ₹15,000 (3-year, one-time)
   - Class 4 Entry: ₹13,000 (2-year, one-time)
   - Class 5 Entry: ₹8,000 (1-year, one-time)
   - Timing: 4 PM – 9 PM

3. **MIT30** (Spoken English Mastery)
   - Fee: ₹1,499 (3 months, one-time)
   - Timing: 4 PM – 9 PM

4. **MIB 1.0** (Biology NCERT Mastery)
   - Monthly Option: ₹499/month
   - Complete Course: ₹4,000 (one-time)
   - Timing: 4 PM – 9 PM

5. **Mock Test** (Optional)
   - Fee: ₹300/month
   - Mode: Offline at coaching

## Technology Stack

- **Frontend**: React.js with React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS with responsive design
- **Authentication**: JWT for admin login
- **Form Handling**: React Hook Form with validation
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd abhishek-coaching-classes
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, and client)
npm run install-all
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/abhishek-coaching
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 4. Database Setup

Make sure MongoDB is running on your system. The application will automatically create the database and collections.

### 5. Create Admin Account

Run the following command to create an admin account:
```bash
cd server
node -e "
const Admin = require('./models/Admin');
const admin = new Admin({
  username: 'admin',
  password: 'admin123',
  email: 'admin@abhishekcoaching.com'
});
admin.save().then(() => {
  console.log('Admin created successfully');
  process.exit();
}).catch(err => {
  console.error('Error creating admin:', err);
  process.exit();
});
"
```

### 6. Seed Initial Data (Optional)

You can add initial course data by running:
```bash
cd server
node -e "
const Course = require('./models/Course');
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
Course.insertMany(courses).then(() => {
  console.log('Courses seeded successfully');
  process.exit();
}).catch(err => {
  console.error('Error seeding courses:', err);
  process.exit();
});
"
```

## Running the Application

### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev
```

### Individual Services
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

### Production Build
```bash
# Build the React app
npm run build

# Start production server
cd server
npm start
```

## Access Points

- **Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **API**: http://localhost:5000/api

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`

## Project Structure

```
abhishek-coaching-classes/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json
├── assests/                # Static assets
│   └── logo.jpg
└── package.json            # Root package.json
```

## API Endpoints

### Admissions
- `POST /api/admissions` - Submit admission enquiry
- `GET /api/admissions` - Get all admissions (admin)
- `PUT /api/admissions/:id` - Update admission status (admin)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/category/:category` - Get resources by category
- `POST /api/resources` - Create resource (admin)
- `PUT /api/resources/:id` - Update resource (admin)
- `DELETE /api/resources/:id` - Delete resource (admin)

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/create` - Create admin account

## Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect GitHub repository
4. Deploy

### Vercel/Netlify (Frontend)
1. Build the React app: `npm run build`
2. Deploy the `client/build` folder

### MongoDB Atlas (Database)
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## Terms & Conditions

- Fees must be paid between 1st–5th of every month (for monthly batches)
- If a student leaves within 15 days, half-month fee will be charged
- If a student leaves after 15 days, full-month fee will be charged
- Mock test fee: ₹300/month (optional)
- One-time fees are non-refundable

## Support

For technical support or questions about the website, please contact:
- Email: info@abhishekcoaching.com
- Phone: +91 9876543210

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Developed for Abhishek Coaching Classes**
*Empowering students with quality education and personalized guidance*
