export class Validator {
    async validate(goal, result) {
        console.log('Validator: Checking if goal met:', goal);
        return new Promise(resolve => setTimeout(() => resolve({ success: true, summary: "Task completed successfully" }), 500));
    }
}
