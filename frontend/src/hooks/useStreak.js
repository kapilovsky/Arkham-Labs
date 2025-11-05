import { useMemo } from "react";

export const useStreak = (submissions) => {
  return useMemo(() => {
    if (!submissions.length) return { currentStreak: 0, longestStreak: 0 };

    // Parse all submission dates and sort them
    const submissionDates = submissions
      .map((s) => {
        const date = new Date(s.createdAt);
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ).getTime();
      })
      .sort();

    // Create a map of active days
    const activeDaysMap = {};
    submissionDates.forEach((timestamp) => {
      activeDaysMap[timestamp] = true;
    });

    // Get unique days
    const uniqueDays = [...new Set(submissionDates)].sort();

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    const yesterdayTimestamp = todayTimestamp - 86400000;

    let checkDate;
    if (activeDaysMap[todayTimestamp]) {
      currentStreak = 1;
      checkDate = todayTimestamp;
    } else if (activeDaysMap[yesterdayTimestamp]) {
      currentStreak = 1;
      checkDate = yesterdayTimestamp;
    } else {
      checkDate = null;
    }

    if (checkDate) {
      let prevDay = checkDate;
      while (true) {
        prevDay = prevDay - 86400000;
        if (activeDaysMap[prevDay]) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let currentRun = 0;
    for (let i = 1; i < uniqueDays.length; i++) {
      if (uniqueDays[i] - uniqueDays[i - 1] === 86400000) {
        currentRun++;
      } else {
        longestStreak = Math.max(longestStreak, currentRun + 1);
        currentRun = 0;
      }
    }
    longestStreak = Math.max(longestStreak, currentRun + 1);

    return { currentStreak, longestStreak };
  }, [submissions]);
};
