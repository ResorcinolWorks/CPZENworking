import { useState, useEffect } from "react";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/clerk-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@/lib/api";
import GlowCard from "@/components/magicui/glow-card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FlashcardProps {
  topicId: string;
  topicName?: string;
}

const Flashcard = ({ topicId, topicName }: FlashcardProps) => {
  const { isSignedIn, getToken } = useAuth();
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const maxLength = 100;

  // Load existing notes when component mounts
  useEffect(() => {
    const loadNotes = async () => {
      if (!isSignedIn) return;

      setIsLoading(true);
      try {
        const token = await getToken();
        if (token) {
          const existingNote = await api.getUserNote(topicId, token);
          if (existingNote) {
            setNotes(existingNote);
          }
        }
      } catch (err) {
        console.error('Failed to load notes:', err);
        // Don't show error for loading, just log it
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, [isSignedIn, topicId, getToken]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      setNotes(event.target.value);
      setError(null);
    }
  };

  const handleSave = async () => {
    if (!isSignedIn) {
      setError("Please sign in to save notes");
      return;
    }

    if (notes.length > maxLength) {
      setError(`Notes must be ${maxLength} characters or less`);
      return;
    }

    setIsSaving(true);
    setError(null);
    
    try {
      const token = await getToken();
      if (token) {
        if (notes.trim().length === 0) {
          // Delete note if empty
          await api.deleteUserNote(topicId, token);
        } else {
          // Save note
          await api.saveUserNote(topicId, notes.trim(), token);
        }
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err) {
      setError("Failed to save notes. Please try again.");
      console.error('Failed to save notes:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isSignedIn) return;

    setIsSaving(true);
    setError(null);
    
    try {
      const token = await getToken();
      if (token) {
        await api.deleteUserNote(topicId, token);
        setNotes("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err) {
      setError("Failed to delete note. Please try again.");
      console.error('Failed to delete note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlowCard
        glowColor="rgba(168, 85, 247, 0.4)"
        borderColors={["rgba(168, 85, 247, 0.7)", "rgba(216, 27, 96, 0.7)"]}
        hoverEffect={false}
        className="w-full"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold font-heading">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Flashcard Notes
            </CardTitle>
            <CardDescription className="text-xs">
              {notes.length}/{maxLength} characters
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive" className="text-sm py-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm py-2">
                <AlertDescription>
                  {notes.trim().length === 0 ? "Note deleted successfully!" : "Note saved successfully!"}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor={`notes-${topicId}`} className="text-sm font-medium">
                Your notes for <span className="font-semibold">{topicName}</span>
              </Label>
              <Textarea
                id={`notes-${topicId}`}
                value={notes}
                onChange={handleChange}
                disabled={isSaving || isLoading}
                placeholder={isLoading ? "Loading..." : "Add your notes here..."}
                className="min-h-[120px] resize-none font-sans text-sm"
                maxLength={maxLength}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex justify-end gap-2 w-full">
            <Button
              onClick={handleDelete}
              variant="outline"
              size="sm"
              disabled={isSaving || isLoading || notes.trim().length === 0}
              className="font-sans text-xs"
            >
              Delete
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 font-sans text-xs"
            >
              {isSaving ? "Saving..." : "Save Note"}
            </Button>
          </div>
        </CardFooter>
      </GlowCard>
    </motion.div>
  );
};

export default Flashcard;
