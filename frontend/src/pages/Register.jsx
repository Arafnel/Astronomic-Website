import RegisterForm from '../components/Forms/RegisterForm';

const Register = () => {
  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16">
      <div className="hero-glow starfield pointer-events-none absolute inset-0 opacity-70" />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-gold-500/60 bg-black/50 px-8 py-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="pointer-events-none absolute inset-px rounded-[26px] border border-gold-500/30 opacity-70" />
        <RegisterForm />
      </section>
    </main>
  );
};

export default Register;