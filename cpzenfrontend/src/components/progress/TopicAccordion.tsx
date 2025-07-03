import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Topic, useProgress } from "@/context/ProgressContext";
import { Edit, Trash2, Youtube, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Flashcard from "@/components/Flashcard";

export const TopicAccordion = ({
  topic,
  index,
}: {
  topic: Topic;
  index: number;
}) => {
  const { toggleTopic, completedTopics } = useProgress();
  const isCompleted = completedTopics.has(topic.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800";
      case "medium":
        return "text-yellow-700 bg-yellow-100 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800";
      case "hard":
        return "text-red-700 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <AccordionItem
        value={`item-${topic.id}`}
        className="border rounded-lg transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
      >
        <AccordionTrigger className="p-4 hover:no-underline">
          <div className="flex items-center gap-4 flex-1">
            <Checkbox
              checked={isCompleted}
              onClick={(e) => {
                e.stopPropagation();
                toggleTopic(topic.id);
              }}
              className="h-5 w-5 rounded-full"
            />
            <span className="font-semibold tracking-tight text-left flex-1">{topic.name}</span>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`font-mono text-xs transition-colors ${getDifficultyColor(
                  topic.difficulty
                )}`}
              >
                {topic.difficulty}
              </Badge>
              <Badge variant="secondary" className="font-mono text-xs">
                {topic.rating}
              </Badge>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0 border-t">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground tracking-tight pt-2 max-w-xl">
              {topic.description}
            </p>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                    <a href={topic.link} target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-5 w-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Watch Tutorial</p></TooltipContent>
              </Tooltip>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <FileText className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{topic.name} - Flashcard</DialogTitle>
                  </DialogHeader>
                  <Flashcard topicId={topic.id} topicName={topic.name} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {topic.additional_links && topic.additional_links.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold tracking-tight mb-2">Additional Resources:</h4>
              <div className="flex flex-wrap gap-2">
                {topic.additional_links.map((link, i) => (
                  <Button asChild size="sm" variant="outline" key={i}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Resource {i+1} <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};