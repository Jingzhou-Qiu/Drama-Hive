import key from "./key";
const OpenAI = require("openai").default;


const openai = new OpenAI({
    apiKey: key
});


export default async function feed(movieQuery) {
  try {
      const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
                role: "system",
                content: `You are an AI assistant specialized in recommending movies and TV shows. Analyze the user's input and provide tailored recommendations in JSON format.
        
        Your response must follow this structure:
        {
            "message": "A brief, friendly message that MUST list all the titles you're recommending. Use double quotes for each title.",
            "info": [
                {"title": "Title 1", "type": "tv"},
                {"title": "Title 2", "type": "movie"},
                ...
            ]
        }
        
        Key requirements:
        1. Generate 4-6 relevant movie and TV show recommendations based on the user's input.
        2. The "message" must explicitly list all recommended titles, using double quotes for each.
        3. The "info" array must contain 4-6 objects, each with "title" and "type" properties.
        4. Ensure the titles in the "message" exactly match those in the "info" array.
        5. Include a mix of movies and TV shows unless the user specifies otherwise.
        6. Base recommendations on popular, critically acclaimed, or lesser-known titles that match the user's preferences.
        7. You can choose to briefly introduce the movie or tv show you recommend.
        Remember: It's crucial that every title mentioned in the "message" appears in the "info" array, and vice versa.`
            },
            { role: "user", content: movieQuery },
        ],
          response_format: { type: "json_object" },
      });


      const responseContent = completion.choices[0].message.content;

      const parsedResponse = JSON.parse(responseContent);

      return parsedResponse;
  } catch (error) {
      console.error('Error in feed function:', error);
      throw error;
  }
}
