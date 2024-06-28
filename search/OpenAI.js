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
                  content: `You are a helpful assistant designed to output JSON. Given a message from user, come up with a list of movies to recommend to the user and create a JSON object with a user-friendly message including movie titles(Please write beautifully , use double quote to quote movie title) and also an array of movie titles corresponding to the movies recommended to user in the message. 
                  Format the response as follows:{"message":"<User friendly message that gives a list of titles and descriptions>","movieTitles":["Movie Title 1", "Movie Title 2", "Movie Title 3"]}`
              },
              { role: "user", content: movieQuery },
          ],
          response_format: { type: "json_object" },
      });

      // console.log('Full completion object:', completion);


      const responseContent = completion.choices[0].message.content;

      const parsedResponse = JSON.parse(responseContent);

      // console.log('Parsed response:', parsedResponse);

      return parsedResponse;
  } catch (error) {
      console.error('Error in feed function:', error);
      throw error;
  }
}
