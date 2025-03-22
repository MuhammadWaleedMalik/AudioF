import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Privacy from   './pages/Privacy';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';
import PricingPro from './pages/PricingPro'
import PricngBasic from './pages/PricingBasic'
import PricingEnterprice from './pages/PricingEnterprice'

import DashboardC from './pages/DashboardC'




import ProtectedRoute from './components/ProtectedRoute';




import AIFeatures from './pages/AIFeatures';
import AudioToText from './pages/features/AudioToText';
import TextToAudio from './pages/features/TextToAudio';
import AudioEnhancer from './pages/features/AudioEnhancer';
import AudioGeneration from './pages/features/AudioGeneration';







function App() {
  return (  
    <Routes>
      <Route path ="/admin/*" element ={<DashboardC/>}></Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        
          <Route path="pricing" element={<Pricing />} />
          <Route element={<ProtectedRoute />}>
        
          <Route path="ai-features" element={<AIFeatures/>} />
          <Route path="pricing/pro" element={<PricingPro />} />
          <Route path="pricing/basic" element={<PricngBasic />} />
          <Route path="pricing/enterprise" element={<PricingEnterprice />} />
         
          
          <Route path="ai-features/AudioToText"  element={<AudioToText/>} />
          <Route path="ai-features/TextToAudio"  element={<TextToAudio/>} />
      
          <Route path="ai-features/AudioEnhancer"  element={<AudioEnhancer/>} />
          
          <Route path="ai-features/AudioGeneration"  element={<AudioGeneration/>} />
          
          


        
        
          
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;