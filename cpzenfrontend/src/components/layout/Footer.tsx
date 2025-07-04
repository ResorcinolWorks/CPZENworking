import { Github, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => {
	return (
		<footer className="border-t py-6">
			<div className="container flex items-center justify-between">
				<Logo />
				<p className="text-sm text-foreground">
					Made with ❤️ by Reso
				</p>
				<div className="flex items-center gap-4">
					<a
						href="https://twitter.com/your-twitter"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Twitter"
					>
						<Twitter className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
					</a>
					<a
						href="https://github.com/ResorcinolWorks"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
