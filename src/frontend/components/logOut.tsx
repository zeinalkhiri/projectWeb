import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LogOut() {
  sessionStorage.removeItem('username');
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { state: { isLoggedOut: true } });
  }, []);
  return null;
}
