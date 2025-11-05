import React, { useEffect, useMemo } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useStreak } from "../hooks/useStreak";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tag,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Circle,
  Award,
  BarChart4,
  Flame,
  Clock,
  Trophy,
} from "lucide-react";

const ProblemSolvedByUser = () => {
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const { currentStreak, longestStreak } = useStreak(submissions);

  useEffect(() => {
    getSolvedProblemByUser();
    getAllSubmissions();
  }, [getSolvedProblemByUser, getAllSubmissions]);

  // Calculate last active date only (removed redundant streak calculations)
  const lastActive = useMemo(() => {
    if (!submissions.length) return null;

    const submissionDates = submissions
      .map((s) => new Date(s.createdAt))
      .sort((a, b) => b - a); // Sort descending to get latest first

    return submissionDates[0];
  }, [submissions]);

  // Format date in a readable way
  const formatDate = (date) => {
    if (!date) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Function to get difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    const badges = {
      EASY: (
        <div className="profile-pill pill-success flex items-center gap-1">
          <CheckCircle size={12} />
          Easy
        </div>
      ),
      MEDIUM: (
        <div className="profile-pill pill-warning flex items-center gap-1">
          <Circle size={12} />
          Medium
        </div>
      ),
      HARD: (
        <div className="profile-pill pill-danger flex items-center gap-1">
          <AlertTriangle size={12} />
          Hard
        </div>
      ),
    };
    return badges[difficulty] || <div className="profile-pill">Unknown</div>;
  };

  // Memoized difficulty counts
  const difficultyCounts = useMemo(() => {
    return {
      easy: solvedProblems.filter((p) => p.difficulty === "EASY").length,
      medium: solvedProblems.filter((p) => p.difficulty === "MEDIUM").length,
      hard: solvedProblems.filter((p) => p.difficulty === "HARD").length,
    };
  }, [solvedProblems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="profile-component-card p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="profile-component-header flex items-center gap-2">
          <Award className="w-5 h-5 text-red-500" /> Problems Solved
        </h2>
        <Link
          to="/dashboard"
          className="profile-btn profile-btn-primary flex items-center gap-1"
        >
          <ExternalLink size={16} /> Browse Problems
        </Link>
      </div>

      {/* Streak Card */}
      <div className="dark:bg-black/30 bg-white/30 border border-red-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-orange-500 w-5 h-5" />
          <h3 className="text-xl font-medium dark:text-white text-black">
            Your Coding Streak
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Streak */}
          <div className="flex items-center gap-4 bg-gradient-to-r dark:from-black/30 from-white/30 to-transparent p-4 rounded-lg border border-white/5">
            <div className="p-3 rounded-full bg-orange-500/20">
              <Flame className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <div className="dark:text-white/60 text-black/60 text-xs font-medium">
                CURRENT STREAK
              </div>
              <div className="text-3xl font-bold dark:text-white text-black flex items-center gap-1">
                {currentStreak}
                <span className="text-xs font-normal dark:text-white/50 text-black/50">
                  days
                </span>
              </div>
            </div>
          </div>

          {/* Longest Streak */}
          <div className="flex items-center gap-4 bg-gradient-to-r dark:from-black/30 from-white/30 to-transparent p-4 rounded-lg border border-white/5">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Trophy className="w-7 h-7 text-purple-500" />
            </div>
            <div>
              <div className="dark:text-white/60 text-black/50 text-xs font-medium">
                LONGEST STREAK
              </div>
              <div className="text-3xl font-bold dark:text-white text-black flex items-center gap-1">
                {longestStreak}
                <span className="text-xs font-normal dakr:text-white/50 text-black/50">
                  days
                </span>
              </div>
            </div>
          </div>

          {/* Last Activity */}
          <div className="flex items-center gap-4 bg-gradient-to-r dark:from-black/30 from-white/30 to-transparent p-4 rounded-lg border border-white/5">
            <div className="p-3 rounded-full bg-blue-500/20">
              <Clock className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <div className="dark:text-white/60 text-black/60 text-xs font-medium">
                LAST ACTIVITY
              </div>
              <div className="text-lg font-medium dark:text-white text-black">
                {formatDate(lastActive)}
              </div>
            </div>
          </div>
        </div>

        {/* Streak Tips */}
        {currentStreak > 0 ? (
          <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="pt-0.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-green-300">
                You're on a {currentStreak}-day streak! Keep solving problems
                daily to maintain your momentum!
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="pt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-amber-300">
                Your streak is currently at 0. Solve a problem today to start
                building your streak!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Easy",
            count: difficultyCounts.easy,
            color: "emerald",
            icon: CheckCircle,
          },
          {
            label: "Medium",
            count: difficultyCounts.medium,
            color: "amber",
            icon: Circle,
          },
          {
            label: "Hard",
            count: difficultyCounts.hard,
            color: "red",
            icon: AlertTriangle,
          },
        ].map(({ label, count, color, icon: Icon }) => (
          <div
            key={label}
            className="stat-card bg-black/20 border border-white/10 rounded-md p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-sm dark:text-white/60 text-black/60">
                {label}
              </div>
              <div className={`text-3xl font-medium text-${color}-500`}>
                {count}
              </div>
            </div>
            <div className={`rounded-full bg-${color}-500/20 p-3`}>
              <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
          </div>
        ))}
      </div>

      {solvedProblems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <h3 className="text-xl font-medium dark:text-white text-black mb-2">
            No problems solved yet
          </h3>
          <p className="dark:text-white/70 text-black/70 mb-4">
            Start solving problems to see them listed here!
          </p>
          <Link
            to="/dashboard"
            className="profile-btn profile-btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink size={16} /> View Problems
          </Link>
        </div>
      ) : (
        <div className="profile-table-card">
          <table className="profile-table w-full">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th>Companies</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {solvedProblems.map((problem) => (
                <tr key={problem.id}>
                  <td className="font-medium dark:text-white text-black">
                    {problem.title}
                  </td>
                  <td>{getDifficultyBadge(problem.difficulty)}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {problem.tags?.map((tag, index) => (
                        <div
                          key={index}
                          className="profile-pill pill-primary flex items-center gap-1"
                        >
                          <Tag size={10} /> {tag}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {problem.companyTags?.length > 0 ? (
                        problem.companyTags.map((company, index) => (
                          <div
                            key={index}
                            className="profile-pill pill-primary flex items-center gap-1"
                          >
                            <span className="text-xs">{company || "N/A"}</span>
                          </div>
                        ))
                      ) : (
                        <div className="profile-pill pill-primary flex items-center gap-1">
                          <span className="text-xs">N/A</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-right">
                    <Link
                      to={`/problem/${problem.id}`}
                      className="profile-btn profile-btn-outline inline-flex items-center gap-1 py-1 px-2 text-xs"
                    >
                      <ExternalLink size={14} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {solvedProblems.length > 5 && (
            <div className="flex justify-center p-3 border-t border-white/10">
              <button className="profile-btn flex items-center gap-2 dark:bg-black/30 bg-white/30 dark:text-white/70 text-black hover:text-white border border-white/10">
                <BarChart4 size={16} /> View All {solvedProblems.length} Solved
                Problems
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProblemSolvedByUser;
