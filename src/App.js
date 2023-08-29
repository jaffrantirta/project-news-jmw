import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Category, CreateNews, Dashboard, Home, Login, News, NewsList, NewsRead, Register } from './pages';
import AuthProvider from './context/AuthContext';
import AuthRoute from './auth/AuthRoute';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path='/dashboard' element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path='/categories' element={<AdminLayout><Category /></AdminLayout>} />
            <Route path='/news' element={<AdminLayout><News /></AdminLayout>} />
            <Route path='/news/create' element={<AdminLayout><CreateNews /></AdminLayout>} />
            <Route path='/news/update' element={<AdminLayout><CreateNews /></AdminLayout>} />
          </Route>
          <Route path='/' element={<Home />} />
          <Route path='/read' element={<NewsRead />} />
          <Route path='/search' element={<NewsList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
