import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './component/nav';
import Hero from './component/hero';
import Menu from './component/menu';
import Cart from './component/cart';
import Notification from './component/notification';
import GlobalLoading from './component/globalLoading';
import ReservationPage from './component/reservation/reservation';
import About from './component/aboutSection/about';
import Testimonials from './component/testimonial section/testimonial';
import Location from './component/location/location';
import Footer from './component/footer/footer';
import AdminDashboard from './component/admindashboard/admin';
 
function HomePage() {
  return (
    <>
      <Hero />
      <Menu />
      <About />
      <Testimonials />
      <Location />
      <Footer />
   
    </>
  );
}

function App() {
  return (
    <Router>
      <GlobalLoading />
      <Nav />
      <Notification />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reserve" element={<ReservationPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/location" element={<Location />} />
        
      </Routes>
    </Router>
  );
}

export default App;