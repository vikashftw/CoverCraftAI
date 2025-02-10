// src/components/OAuth.jsx
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function useGoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
    
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("Firebase user:", result.user);

    
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName || result.user.email.split('@')[0],
          email: result.user.email,
          photo: result.user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          uid: result.user.uid,
        }),
      });
      const data = await res.json();
      console.log("Registration response:", data);

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return { handleGoogleSignIn };
}
