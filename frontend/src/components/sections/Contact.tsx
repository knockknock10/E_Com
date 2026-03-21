const Contact = () => {
  return (
    <section id="contact" className="py-24 lg:py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Decorative Background Element */}
        <div className="absolute inset-0 bg-primary rounded-3xl -z-10 transform -rotate-1 scale-105 border border-black/5 opacity-50 block md:hidden lg:block hidden"></div>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl shadow-black/5 border border-black/5 flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10 w-full">
          
          {/* Contact Info */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight mb-6">
              Let's Talk Spaces.
            </h2>
            <p className="text-secondary text-lg font-light leading-relaxed mb-10">
              Ready to find your next architectural masterpiece? Our elite agents are available 24/7 to provide discreet, professional consultation tailored for your real estate needs.
            </p>
            
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Global Headquarters</p>
                <p className="text-dark font-semibold text-lg">100 Luxury Avenue, Suite 400<br/>Beverly Hills, CA 90210</p>
              </div>
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Direct Line</p>
                <p className="text-dark font-semibold text-lg">+1 (800) 555-0199</p>
              </div>
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Email</p>
                <p className="text-dark font-semibold text-lg">concierge@novanest.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="w-full lg:w-7/12 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-dark">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  className="w-full px-5 py-4 bg-primary border border-black/5 rounded-xl focus:outline-none focus:border-accent focus:bg-white transition-all text-dark shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-dark">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full px-5 py-4 bg-primary border border-black/5 rounded-xl focus:outline-none focus:border-accent focus:bg-white transition-all text-dark shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-dark">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full px-5 py-4 bg-primary border border-black/5 rounded-xl focus:outline-none focus:border-accent focus:bg-white transition-all text-dark shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-dark">Message</label>
              <textarea 
                rows={5} 
                placeholder="Tell us about the property you are looking for..." 
                className="w-full px-5 py-4 bg-primary border border-black/5 rounded-xl focus:outline-none focus:border-accent focus:bg-white transition-all text-dark resize-none hide-scrollbar shadow-sm"
              />
            </div>

            <button 
              type="submit" 
              className="mt-2 px-8 py-4 bg-dark text-white font-bold rounded-xl hover:bg-accent hover:shadow-xl hover:shadow-accent/20 transition-all active:scale-[0.98] w-full sm:w-auto self-start"
            >
              Send Inquiry
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
