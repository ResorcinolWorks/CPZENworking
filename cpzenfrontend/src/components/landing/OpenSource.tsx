import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const OpenSource = () => {
	return (
		<section className="py-24 sm:py-32">
			<div className="container">
				<Card className="relative overflow-hidden border-primary/20 shadow-lg shadow-primary/10 transition-transform duration-300 hover:scale-105">
					<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
					<CardContent className="relative p-12">
						<div className="max-w-3xl mx-auto text-center">
							<h2 className="text-4xl md:text-5xl font-bold mb-4">
								Proudly <span className="text-primary">Open Source</span>
							</h2>
							<p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
								Our platform is open source and community-driven. Help us improve
								by contributing and make competitive programming accessible for
								everyone!
							</p>
							<a
								href="https://github.com/ResorcinolWorks/CPZENworking"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button size="lg">
									<Github className="mr-2 h-5 w-5" />
									View on GitHub
								</Button>
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default OpenSource;
