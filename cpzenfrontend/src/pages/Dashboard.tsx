import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, ProgressStats, UserNote } from "@/lib/api";
import { useProgress } from "@/context/ProgressContext";
import { Skeleton } from "@/components/ui/skeleton";
import { User, CheckCircle, BarChart, FileText, LayoutDashboard, Rocket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth, useUser } from "@clerk/clerk-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { topics, completedCount, isLoading: progressLoading } = useProgress();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setStatsLoading(true);
      setNotesLoading(true);
      try {
        const token = await getToken();
        if (token) {
          const [statsData, notesData] = await Promise.all([
            api.getUserStats(token),
            api.getAllUserNotes(token)
          ]);
          setStats(statsData);
          setNotes(notesData);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setStatsLoading(false);
        setNotesLoading(false);
      }
    };
    if (getToken) {
      fetchData();
    }
  }, [getToken, completedCount]);

  const FADE_UP_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const pieData = [
    { name: 'Completed', value: stats?.completedCount || 0 },
    { name: 'Remaining', value: (stats?.totalTopics || 0) - (stats?.completedCount || 0) },
  ];
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <div className="container mx-auto py-8 md:py-12">
      <motion.div
        initial="hidden"
        animate="show"
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8" />
              Dashboard
            </h1>
            <p className="text-foreground mt-1 tracking-tight">
              Welcome back, {user?.firstName || "Coder"}! Let's get learning.
            </p>
          </div>
          <Button asChild>
            <Link to="/progress">
              <Rocket className="mr-2 h-4 w-4" /> Go to Progress
            </Link>
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="grid gap-6 lg:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="lg:col-span-1">
          <Card className="h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-primary/20 shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/50">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <div className="w-0 flex-1">
                <CardTitle className="tracking-tight truncate">{user?.fullName || "Guest User"}</CardTitle>
                <p className="text-sm text-foreground tracking-tight truncate">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-foreground tracking-tight">Overall Progress</span>
                    <span className="text-sm font-bold text-primary tracking-tight">{stats?.completedCount} / {stats?.totalTopics}</span>
                  </div>
                  <Progress value={stats?.completionPercentage || 0} className="h-3" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="lg:col-span-2">
          <Card className="h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 tracking-tight">
                <BarChart size={20} />
                <span>Difficulty Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {statsLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium tracking-tight">Easy</span>
                      <span className="text-foreground tracking-tight">{stats?.completedByDifficulty.Easy}/{stats?.totalByDifficulty.Easy}</span>
                    </div>
                    <Progress value={stats ? (stats.completedByDifficulty.Easy / stats.totalByDifficulty.Easy) * 100 : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium tracking-tight">Medium</span>
                      <span className="text-foreground tracking-tight">{stats?.completedByDifficulty.Medium}/{stats?.totalByDifficulty.Medium}</span>
                    </div>
                    <Progress value={stats ? (stats.completedByDifficulty.Medium / stats.totalByDifficulty.Medium) * 100 : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium tracking-tight">Hard</span>
                      <span className="text-foreground tracking-tight">{stats?.completedByDifficulty.Hard}/{stats?.totalByDifficulty.Hard}</span>
                    </div>
                    <Progress value={stats ? (stats.completedByDifficulty.Hard / stats.totalByDifficulty.Hard) * 100 : 0} className="h-2" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="lg:col-span-1">
           <Card className="h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 tracking-tight">
                <CheckCircle size={20} />
                <span>Completion</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-40">
                {statsLoading ? <Skeleton className="h-full w-full" /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} fill="#8884d8" paddingAngle={5}>
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="lg:col-span-4">
          <Card className="transition-transform duration-300 hover:scale-[1.01] hover:shadow-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 tracking-tight">
                <FileText size={20} />
                <span>Flashcard Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {notesLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                  ))
                ) : notes.length > 0 ? (
                  notes.map((note) => (
                    <Card key={note.topicId} className="h-32 p-4 bg-secondary/50 transition-transform duration-300 hover:scale-105 flex flex-col">
                      <p className="font-bold text-sm mb-2 truncate" title={note.topicName}>{note.topicName}</p>
                      <p className="text-xs text-foreground line-clamp-3 flex-grow">{note.content}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-foreground col-span-full text-center tracking-tight py-8">
                    You haven't created any notes yet. Start learning and jot down some thoughts!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Dashboard;
