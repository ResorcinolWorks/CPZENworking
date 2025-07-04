import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, ThumbsUp } from "lucide-react";
import Marquee from "@/components/magicui/marquee";

const reviews = [
	{
		name: "Priya Sharma",
		avatar: "PS",
		title: "Game-Changer!",
		description:
			"CpZen's roadmap is a game-changer. I finally feel like I have a clear path to follow for my DSA prep.",
	},
	{
		name: "Rohan Patel",
		avatar: "RP",
		title: "Top-Notch Content",
		description:
			"The content quality is amazing. It's concise, accurate, and exactly what I needed to crack FAANG interviews.",
	},
	{
		name: "Ananya Singh",
		avatar: "AS",
		title: "Love the Flashcards!",
		description:
			"I love the flashcards feature! It's perfect for quick revisions before a coding contest. Super helpful!",
	},
	{
		name: "Vikram Reddy",
		avatar: "VR",
		title: "So Motivating",
		description:
			"Tracking my progress has kept me motivated. Seeing how far I've come is incredibly rewarding.",
	},
	{
		name: "Aisha Khan",
		avatar: "AK",
		title: "Highly Recommend",
		description:
			"The platform is intuitive and the problems are very well selected. Highly recommend for any aspiring coder.",
	},
	{
		name: "Arjun Mehta",
		avatar: "AM",
		title: "Best Learning Tool",
		description:
			"This is hands-down the best tool I've used for competitive programming. The level-wise breakdown is perfect.",
	},
];

const Reviews = () => {
	return (
		<section className="py-24 sm:py-32">
			<div className="container">
				<div className="text-center mb-16 max-w-3xl mx-auto">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3 text-foreground">
						<ThumbsUp className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} />
						Loved by <span className="text-primary">Coders</span> Everywhere
					</h2>
					<p className="text-lg text-foreground tracking-tight">
						Here's what our users have to say about their experience with CpZen.
					</p>
				</div>

				<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
					<Marquee pauseOnHover className="[--duration:20s]">
						{reviews.map((review) => (
							<ReviewCard key={review.name} {...review} />
						))}
					</Marquee>
					<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
					<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
				</div>
			</div>
		</section>
	);
};

const ReviewCard = ({
	name,
	avatar,
	title,
	description,
}: {
	name: string;
	avatar: string;
	title: string;
	description: string;
}) => {
	return (
		<Card className="h-full shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] mx-4 w-80">
			<CardContent className="flex flex-col items-start p-6 text-left gap-2">
				<div className="flex items-center gap-2 mb-2">
					<Quote className="h-5 w-5 text-primary" />
					<p className="font-bold text-lg tracking-tight">"{title}"</p>
				</div>
				<p className="text-foreground text-sm mb-6 tracking-tight flex-1">
					{description}
				</p>
				<div className="flex items-center gap-4 mt-auto">
					<Avatar className="border-2 border-primary/20">
						<AvatarImage
							src={`https://i.pravatar.cc/150?u=${name}`}
							alt={name}
						/>
						<AvatarFallback>{avatar}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold tracking-tight">{name}</p>
						<p className="text-xs text-foreground tracking-tight">
							Verified User
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Reviews;
