import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('✅ Registration successful! You can now sign in.');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setMessage('❌ ' + (data.detail || 'Registration error'));
      }
    } catch (error) {
      setMessage('❌ Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative mx-auto max-w-md px-6 py-16">
      <section className="mb-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">Account</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[0.12em] text-gold-100">Register</h1>
        <p className="mt-2 text-sm text-gold-100/75">Create an account to save favorites and follow events.</p>
      </section>

      <div className="mx-auto rounded-2xl border border-gold-500/40 bg-black/40 px-6 py-8">
        {message && (
          <div className={`mb-4 rounded-lg px-4 py-2 text-center ${message.includes('✅') ? 'bg-green-900/30 text-green-200' : 'bg-red-900/30 text-red-300'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm text-gold-200/80">Username</label>
          <input name="username" value={formData.username} onChange={handleChange} required className="w-full rounded-md border border-gold-500/30 bg-black/30 px-3 py-2 text-gold-100" />

          <label className="text-sm text-gold-200/80">Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full rounded-md border border-gold-500/30 bg-black/30 px-3 py-2 text-gold-100" />

          <label className="text-sm text-gold-200/80">Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full rounded-md border border-gold-500/30 bg-black/30 px-3 py-2 text-gold-100" />

          <label className="text-sm text-gold-200/80">Confirm password</label>
          <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="w-full rounded-md border border-gold-500/30 bg-black/30 px-3 py-2 text-gold-100" />

          <button type="submit" disabled={loading} className={`mt-2 rounded-md px-4 py-2 text-white ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-cosmic-400 to-cosmic-600'}`}>
            {loading ? '⏳ Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gold-100/70">Already have an account? <a href="/login" className="text-cosmic-400">Sign in</a></p>
      </div>
    </main>
  );
};

export default Register;