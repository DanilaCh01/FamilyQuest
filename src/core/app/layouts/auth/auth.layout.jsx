import { Link, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <Outlet /> 
      </div>
      <Link to="/" style={{ marginTop: '1.5rem', color: '#4b5563' }}>На головну</Link>
    </div>
  );
};