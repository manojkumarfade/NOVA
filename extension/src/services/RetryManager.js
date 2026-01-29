export class RetryManager {
    static async withRetry(operation, options = {}) {
        const { maxAttempts = 3, delay = 1000, context = 'Operation' } = options;
        let lastError;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                console.warn(`[${context}] Attempt ${attempt}/${maxAttempts} failed:`, error);

                if (attempt === maxAttempts) {
                    console.error(`[${context}] All ${maxAttempts} attempts failed.`);
                    throw new Error(`Failed to complete ${context} after ${maxAttempts} attempts: ${error.message}`);
                }

                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}
