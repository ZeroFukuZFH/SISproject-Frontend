export const sisterService = {
    help: async (content: string) => {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + import.meta.env.VITE_APP_AI_API_KEY,
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'Set in Stone',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'openai/gpt-4o',
            messages: [
            {
                role: 'user',
                content: content,
            },
            ],
        }),
        });

        if(!response.ok) throw new Error('Something went wrong')
        
        const data = await response.json()
        console.log(data)
        return data
    }
}