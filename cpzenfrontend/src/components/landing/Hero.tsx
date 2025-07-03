// import { SignUpButton } from "@clerk/clerk-react";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Rocket, Github } from "lucide-react";
import { companyLogos } from "@/lib/company-logos";

const Hero = () => {
  const navigate = useNavigate();

  const FADE_DOWN_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-left">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            className="inline-flex items-center rounded-lg bg-secondary px-3 py-1 text-sm font-medium mb-4 tracking-tight"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Rocket className="mr-2 h-4 w-4 text-secondary-foreground" />
            🚀 Backed by the CP Community
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-muted-foreground"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Your Journey to
            <br />
            <span className="text-foreground inline-block tracking-tight">Expert Coder</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground md:w-10/12 mb-8 tracking-tight"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Quickly master data structures, organize your learning, and solve
            well-curated problems.
          </motion.p>

          <motion.div
            className="flex gap-4 items-center"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <SignedIn>
              <Button
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="font-bold transition-transform duration-300 hover:scale-105"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="font-bold transition-transform duration-300 hover:scale-105"
                >
                  Get Started Free
                </Button>
              </SignUpButton>
            </SignedOut>
            <Button asChild variant="link" className="text-muted-foreground">
              <a href="https://github.com/ResorcinolWorks/CPZENworking" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 tracking-tight">
                <Github className="w-5 h-5" />
                GitHub Repo
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <div className="relative rounded-xl overflow-hidden bg-card border shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300">
          <img
            src="/Images/ImageforLight.png"
            alt="App Preview - Light Mode"
            className="w-full h-auto block dark:hidden"
          />
          <img
            src="/Images/ImageforDark.png"
            alt="App Preview - Dark Mode"
            className="w-full h-auto hidden dark:block"
          />
        </div>
      </motion.div>

      {/* Trusted by section */}
      <div className="lg:col-span-2 w-full mt-12">
        <motion.div 
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="text-center"
        >
          <h3 className="text-muted-foreground font-semibold tracking-tight">Trusted by over 10,000+ programmers</h3>
          <div className="flex justify-center items-center gap-8 mt-4 flex-wrap">
            {companyLogos.map((logo, index) => (
              <img 
                key={index} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 w-auto filter dark:invert"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
