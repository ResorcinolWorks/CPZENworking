import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, ThumbsUp } from "lucide-react";

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
					<h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3 text-muted-foreground">
						<ThumbsUp className="h-8 w-8" />
						Loved by <span className="text-foreground">Coders</span> Everywhere
					</h2>
					<p className="text-lg text-muted-foreground tracking-tight">
						Here's what our users have to say about their experience with CpZen.
					</p>
				</div>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full max-w-4xl mx-auto"
				>
					<CarouselContent>
						{reviews.map((review, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-1 h-full">
									<Card className="h-full shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02]">
										<CardContent className="flex flex-col items-start p-6 text-left gap-2">
											<div className="flex items-center gap-2 mb-2">
												<Quote className="h-5 w-5 text-primary" />
												<p className="font-bold text-lg tracking-tight">"{review.title}"</p>
											</div>
											<p className="text-muted-foreground text-sm mb-6 tracking-tight flex-1">
												{review.description}
											</p>
											<div className="flex items-center gap-4 mt-auto">
												<Avatar className="border-2 border-primary/20">
													<AvatarImage
														src={`https://i.pravatar.cc/150?u=${review.name}`}
														alt={review.name}
													/>
													<AvatarFallback>{review.avatar}</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-semibold tracking-tight">{review.name}</p>
													<p className="text-xs text-muted-foreground tracking-tight">
														Verified User
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
};

export default Reviews;
