import { Outlet, Link } from "react-router-dom"; 

export const App = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ 
        padding: '1rem 2rem', 
        backgroundColor: '#1f2937', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between' 
      }}>
        <strong>FamilyQuest</strong>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: 'white' }}>Головна</Link>
          <Link to="/auth/sign-in" style={{ color: 'white' }}>Увійти</Link>
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        <Outlet /> 
      </main>
    </div>
  );
};