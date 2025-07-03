import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, ListChecks, LogOut, ChevronDown } from "lucide-react";

const landingNavLinks = [
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();
  const isAppPage = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/progress');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
          {!isAppPage && landingNavLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          {isAppPage ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  Welcome, {user?.firstName}!
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/progress')}>
                  <ListChecks className="mr-2 h-4 w-4" />
                  <span>Progress</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut(() => navigate('/'))}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <SignedIn>
                 <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost">Log in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Get Started</Button>
                </SignUpButton>
              </SignedOut>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
