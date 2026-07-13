import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import CreateJob from './pages/CreateJob';
import MyJobs from './pages/MyJobs';
import EditJob from './pages/EditJob';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;