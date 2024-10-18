import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });


export const getDescription = async (
    text: string,
): Promise<string | null> => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "give the description that be used to describe the text without mention it , in one sentence" },
                {
                    role: "user",
                    content: `${text}`,
                },
            ],
        });
        const result = completion.choices[0].message.content?.trim()
        console.log(result);
        return result ?? null
    } catch (error) {
        console.error('Error during translation:', error);
        return null;
    }
};

export const getImage = async (
    text: string,
): Promise<string | null> => {
    try {
        const imageResult = await openai.images.generate({
            model: "dall-e-2",
            prompt: `${text}`,
            n: 1,
            size: '512x512',
            response_format: 'b64_json'
        });
        const result = imageResult.data[0].b64_json
        console.log(result);
        return result ?? null
    } catch (error) {
        console.error('Error during translation:', error);
        return null;
    }
};