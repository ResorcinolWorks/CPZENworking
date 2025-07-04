import {
  Accordion,
} from "@/components/ui/accordion";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TopicAccordion } from "@/components/progress/TopicAccordion";
import { useProgress } from "@/context/ProgressContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ListChecks } from "lucide-react";
import { motion } from "framer-motion";

const Progress = () => {
  const { completedCount, topics, isLoading, error, refetch } = useProgress();
  const totalTopics = topics.length;

  return (
    <TooltipProvider>
      <div className="container mx-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/dashboard" className="flex items-center gap-1 text-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <ListChecks className="h-8 w-8" />
              Your Roadmap
            </h1>
            <p className="mt-2 text-foreground tracking-tight">
              Here are all the topics to master your skills. Checked topics are saved.
            </p>
            <div className="mt-4 text-lg tracking-tight">
              <span className="font-bold text-primary">{completedCount}</span> / {totalTopics} topics completed
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Failed to load progress</AlertTitle>
            <AlertDescription>
              {error} 
              <Button 
                onClick={refetch}
                variant="link"
                className="p-0 h-auto ml-2 text-destructive-foreground"
              >
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {topics.map((topic, index) => (
                <TopicAccordion topic={topic} index={index} key={topic.id} />
              ))}
            </Accordion>
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Progress;
