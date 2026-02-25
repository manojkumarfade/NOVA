/**
 * @file rateLimiter.js
 * @description Manages rate limits for the Vision Reference feature.
 * Limits Vision requests to < 5 per minute and < 100 per day.
 * 
 * @context Core Service (Background/Vision)
 */

import { StorageService } from '../StorageService';

export const VisionRateLimiter = {
    async checkLimits() {
        const data = await StorageService.get('vision_rate_limits') || {
            visionRequestsThisMinute: 0,
            visionRequestsToday: 0,
            lastMinuteTimestamp: Date.now(),
            lastDayTimestamp: Date.now(),
        };

        const now = Date.now();

        // Reset daily at UTC midnight or after 24h
        // Simple 24h check for now:
        const DAY_MS = 24 * 60 * 60 * 1000;
        if (now - data.lastDayTimestamp > DAY_MS) {
            data.visionRequestsToday = 0;
            data.lastDayTimestamp = now;
        }

        // Reset minute limits
        const MINUTE_MS = 60 * 1000;
        if (now - data.lastMinuteTimestamp > MINUTE_MS) {
            data.visionRequestsThisMinute = 0;
            data.lastMinuteTimestamp = now;
        }

        if (data.visionRequestsThisMinute >= 5) {
            console.warn("Vision Reference RPM limit reached (< 5/min)");
            return false;
        }

        if (data.visionRequestsToday >= 100) {
            console.warn("Vision Reference daily limit reached (< 100/day)");
            return false;
        }

        // Increment
        data.visionRequestsThisMinute += 1;
        data.visionRequestsToday += 1;

        await StorageService.set('vision_rate_limits', data);
        return true;
    }
};
