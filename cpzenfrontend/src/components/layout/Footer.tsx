import { Logo } from "./Logo";
import { Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="border-t py-12">
			<div className="container grid grid-cols-2 md:grid-cols-5 gap-8">
				<div className="col-span-2 md:col-span-1">
					<Logo />
				</div>
				<div>
					<h3 className="font-semibold mb-4">Product</h3>
					<ul className="space-y-2">
						<li>
							<a href="#features" className="text-muted-foreground hover:text-foreground">
								Features
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="font-semibold mb-4">Company</h3>
					<ul className="space-y-2">
						<li>
							<a href="https://github.com/ResorcinolWorks" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
								About
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="font-semibold mb-4">Legal</h3>
					<ul className="space-y-2">
						<li>
							<a href="#" className="text-muted-foreground hover:text-foreground">
								Privacy
							</a>
						</li>
						<li>
							<a href="#" className="text-muted-foreground hover:text-foreground">
								Terms
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="container mt-12 pt-8 border-t flex justify-between items-center">
				<p className="text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} CpZen, Inc.
				</p>
				<div className="flex items-center gap-4">
					<a
						href="https://x.com/Resorcinolworks"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Twitter"
					>
						<Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
					</a>
					<a
						href="https://github.com/ResorcinolWorks/CPZENworking"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
