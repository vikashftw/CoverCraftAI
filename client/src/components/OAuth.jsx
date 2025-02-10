// client/src/components/useGoogleAuth.jsx
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function useGoogleAuth() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // Start the Google OAuth sign-in process
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Send user info to your backend for registration/sign-in
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
      console.log("User registered:", data);
      
      // Store the JWT token in localStorage for later use in protected routes
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard (or any protected route)
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return { handleGoogleSignIn };
}
