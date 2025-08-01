/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { parseISO, formatDistanceToNow } from 'date-fns';
import React from 'react';

type TimeAgoProps = {
  timestamp: string;
};

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  let timeAgo = '';

  if (timestamp) {
    try {
      const date = parseISO(timestamp);
      const timePeriod = formatDistanceToNow(date);
      timeAgo = `${timePeriod} ago`;
    } catch {
      timeAgo = 'Invalid date';
    }
  }

  return (
    <span title={timestamp}>
      &nbsp;<i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
