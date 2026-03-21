import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email format is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!isLogin) {
      if (!name) newErrors.name = 'Full name is required';
      if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    // Mock network request
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-primary flex w-full">
      {/* Left Area - Branding / Image (Split Screen) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-dark">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Luxury Architecture" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer w-fit">
            <div className="w-10 h-10 rounded bg-white flex items-center justify-center text-dark font-bold text-xl transition-colors group-hover:bg-accent group-hover:text-white">
              N
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              NovaNest
            </span>
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Unlock the finest real estate portfolio.
            </h2>
            <div className="w-12 h-1 bg-accent mb-6"></div>
            <p className="text-primary/80 text-lg font-light leading-relaxed">
              Gain exclusive access to private listings, advanced market reports, and dedicated white-glove architectural consulting.
            </p>
          </div>
        </div>
      </div>

      {/* Right Area - Form */}
      <div className="w-full lg:w-1/2 flex flex-col pt-8 pb-12 px-6 sm:px-12 md:px-24 xl:px-32 justify-center relative bg-white">
        <Link to="/" className="lg:hidden flex items-center gap-2 group cursor-pointer w-fit mb-12">
          <div className="w-8 h-8 rounded bg-dark flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          <span className="font-bold text-xl tracking-tight text-dark">
            NovaNest
          </span>
        </Link>
        
        <Link to="/" className="hidden lg:flex items-center gap-2 text-secondary hover:text-dark font-semibold text-sm transition-colors absolute top-12 right-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-md xl:max-w-lg">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight mb-2">
              {isLogin ? 'Welcome Back.' : 'Create Account.'}
            </h1>
            <p className="text-secondary font-light text-lg mb-10">
              {isLogin ? 'Sign in to access your client portal.' : 'Register to access premium features.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-dark mb-1.5 ml-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {setName(e.target.value); if(errors.name) setErrors({...errors, name: ''});}}
                      className={`w-full px-5 py-4 bg-primary/50 border ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-accent'} rounded-xl focus:outline-none focus:bg-white transition-all text-dark shadow-sm`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.name}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value); if(errors.email) setErrors({...errors, email: ''});}}
                  className={`w-full px-5 py-4 bg-primary/50 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-accent'} rounded-xl focus:outline-none focus:bg-white transition-all text-dark shadow-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                  <label className="text-sm font-semibold text-dark">Password</label>
                  {isLogin && <a href="#" className="text-xs font-semibold text-accent hover:underline">Forgot password?</a>}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); if(errors.password) setErrors({...errors, password: ''});}}
                  className={`w-full px-5 py-4 bg-primary/50 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-accent'} rounded-xl focus:outline-none focus:bg-white transition-all text-dark shadow-sm`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
              </div>

              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-dark mb-1.5 ml-1">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {setConfirmPassword(e.target.value); if(errors.confirmPassword) setErrors({...errors, confirmPassword: ''});}}
                      className={`w-full px-5 py-4 bg-primary/50 border ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-accent'} rounded-xl focus:outline-none focus:bg-white transition-all text-dark shadow-sm`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.confirmPassword}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 bg-dark text-white font-bold flex items-center justify-center gap-2 rounded-xl hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-black/5 text-center text-sm text-secondary font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setLoading(false);
                }}
                className="text-dark font-bold hover:text-accent transition-colors underline underline-offset-4"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
