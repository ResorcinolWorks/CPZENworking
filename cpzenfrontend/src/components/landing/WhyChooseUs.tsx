import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BookOpen, BarChart, NotebookText, Gem } from "lucide-react";
import { motion } from "framer-motion";

const features = [
	{
		icon: <BookOpen className="h-6 w-6 text-primary" />,
		title: "Dedicated Roadmap",
		description:
			"A clear, structured path from beginner to expert, curated by professionals.",
	},
	{
		icon: <BarChart className="h-6 w-6 text-primary" />,
		title: "Track Your Progress",
		description:
			"Visualize your growth and stay motivated with our intuitive tracking tools.",
	},
	{
		icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
		title: "Authentic Content",
		description:
			"Access high-quality, verified content that's effective and easy to understand.",
	},
	{
		icon: <NotebookText className="h-6 w-6 text-primary" />,
		title: "Flashcards",
		description:
			"Create and revise with powerful flashcards to retain complex concepts.",
	},
];

const WhyChooseUs = () => {
	return (
		<section id="why-choose-us" className="py-20 md:py-32">
			<div className="container">
				<div className="text-center mb-16 max-w-3xl mx-auto">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3 text-foreground">
						<Gem className="h-8 w-8" strokeWidth={2.5} />
						An All-In-One <span className="text-primary">Learning Platform</span>
					</h2>
					<p className="text-lg text-foreground tracking-tight">
						We have everything you need to excel in your competitive programming
						journey, from curated roadmaps to advanced progress tracking.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{features.map((feature) => (
						<Card
							key={feature.title}
							className="bg-secondary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							<CardContent className="p-6 h-full flex flex-col gap-2">
								<div className="flex items-center gap-4 mb-2">
									<div className="p-3 bg-background rounded-lg text-foreground shadow-md">
										{feature.icon}
									</div>
									<h3 className="mb-0 text-xl font-bold tracking-tight text-foreground">
										{feature.title}
									</h3>
								</div>
								<p className="text-foreground tracking-tight">
									{feature.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
