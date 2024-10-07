import { useState } from 'react';
import { useRouter } from 'next/router';

const LockScreen = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const correctPassword = '1234'; // Set your own password

  const handleUnlock = () => {
    if (password === correctPassword) {
      localStorage.setItem('unlocked', 'true');
      router.push('/'); // Redirect to the homepage or any unlocked page
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{color: '#ffffff'}}>Enter Password to Unlock</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleUnlock} style={styles.button}>
        Unlock
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#ff1b1b',
    color: 'white'
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default LockScreen;
