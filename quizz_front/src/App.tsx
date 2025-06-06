
import './App.css'
// template
import './assets/template/assets/css/nucleo-icons.css';
import './assets/template/assets/css/nucleo-svg.css';
import './assets/template/assets/css/font-awesome.css';
import './assets/template/assets/css/argon-design-system.css';
import './assets/template/assets/css/argon-design-system.min.css';
import './assets/template/assets/scss/argon-design-system/kit-free.css'
//template
import Navbar from './component/navbar/navbar'
import Aroutres from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext/AuthContext'
import { ToastContainer} from 'react-toastify';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      
    <Navbar/> 
    <Aroutres/>
    <ToastContainer />
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
