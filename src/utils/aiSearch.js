// Free AI Movie Search - Using Groq API (Fast & Free)
// Get your free API key from: https://console.groq.com/keys
// No credit card required, generous free tier

// Fallback: If Groq fails, we'll use a simple pattern-based recommendation
import { GROQ_API_KEY } from "./constant";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Fallback movie recommendations based on keywords
const getFallbackMovies = (query) => {
  const lowerQuery = query.toLowerCase();
  const fallbacks = {
    action: [
      "The Dark Knight",
      "Mad Max: Fury Road",
      "John Wick",
      "Mission: Impossible",
      "Fast & Furious",
      "The Matrix",
      "Gladiator",
      "300",
      "Die Hard",
      "Terminator 2",
      "The Bourne Identity",
      "Kill Bill",
      "The Raid",
      "Dredd",
      "Edge of Tomorrow",
    ],
    comedy: [
      "The Hangover",
      "Superbad",
      "Step Brothers",
      "Anchorman",
      "Borat",
      "Dumb and Dumber",
      "Wedding Crashers",
      "Zoolander",
      "Tropic Thunder",
      "The 40-Year-Old Virgin",
      "Knocked Up",
      "Pineapple Express",
      "This Is The End",
      "The Other Guys",
      "Hot Fuzz",
    ],
    horror: [
      "The Exorcist",
      "The Shining",
      "Get Out",
      "Hereditary",
      "The Conjuring",
      "The Ring",
      "It",
      "A Quiet Place",
      "The Babadook",
      "Sinister",
      "Insidious",
      "The Witch",
      "Midsommar",
      "Paranormal Activity",
      "Scream",
    ],
    romance: [
      "The Notebook",
      "Titanic",
      "Pride and Prejudice",
      "La La Land",
      "Before Sunrise",
      "Casablanca",
      "The Fault in Our Stars",
      "500 Days of Summer",
      "Eternal Sunshine of the Spotless Mind",
      "The Proposal",
      "Crazy Rich Asians",
      "The Holiday",
      "You've Got Mail",
      "When Harry Met Sally",
      "Pretty Woman",
    ],
    thriller: [
      "Inception",
      "The Prestige",
      "Shutter Island",
      "Gone Girl",
      "Se7en",
      "The Silence of the Lambs",
      "Memento",
      "The Usual Suspects",
      "Fight Club",
      "Zodiac",
      "No Country for Old Men",
      "The Departed",
      "Oldboy",
      "Nightcrawler",
      "Prisoners",
    ],
    sci: [
      "Interstellar",
      "The Matrix",
      "Blade Runner",
      "Arrival",
      "Ex Machina",
      "2001: A Space Odyssey",
      "The Martian",
      "Gravity",
      "District 9",
      "Children of Men",
      "Her",
      "Moon",
      "Annihilation",
      "The Terminator",
      "Alien",
    ],
    drama: [
      "The Shawshank Redemption",
      "Forrest Gump",
      "The Godfather",
      "Schindler's List",
      "Pulp Fiction",
      "The Godfather Part II",
      "Goodfellas",
      "The Green Mile",
      "12 Angry Men",
      "The Departed",
      "American History X",
      "Fight Club",
      "The Pianist",
      "Gladiator",
      "Saving Private Ryan",
    ],
  };

  for (const [genre, movies] of Object.entries(fallbacks)) {
    if (lowerQuery.includes(genre)) {
      return movies;
    }
  }

  // Default recommendations (15 movies)
  return [
    "The Dark Knight",
    "Inception",
    "The Shawshank Redemption",
    "Pulp Fiction",
    "The Godfather",
    "Interstellar",
    "The Matrix",
    "Forrest Gump",
    "Goodfellas",
    "The Departed",
    "Gladiator",
    "The Prestige",
    "Se7en",
    "Fight Club",
    "The Green Mile",
  ];
};

export const searchMovies = async (query) => {
  // If no API key, use fallback
  if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") {
    console.log("Using fallback recommendations (no API key configured)");
    return getFallbackMovies(query);
  }

  try {
    const prompt = `Act as a movie recommendation system. Suggest exactly 15 movies for the query: "${query}". 
Only return the movie names, comma separated. 
Example format: Gadar, Sholay, Don, Money Heist, Golmaal.
Do not include any explanations, just the movie names separated by commas.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", // Fast and free model
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again."
        );
      }
      throw new Error(
        errorData.error?.message || `API Error: ${response.status}`
      );
    }

    const data = await response.json();

    // Extract text from Groq response
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No response from AI model");
    }

    // Parse comma-separated movie names
    const movieNames = text
      .split(",")
      .map((name) =>
        name
          .trim()
          .replace(/^[-•*]\s*/, "")
          .trim()
      ) // Remove bullet points
      .map((name) => name.split("\n")[0].trim()) // Take first line only
      .map((name) => name.replace(/^["']|["']$/g, "").trim()) // Remove quotes
      .filter((name) => name.length > 0 && name.length < 100) // Filter valid names
      .slice(0, 15); // Take only first 15

    if (movieNames.length === 0) {
      // Fallback if parsing fails
      return getFallbackMovies(query);
    }

    return movieNames;
  } catch (error) {
    console.error("AI Search Error:", error);
    // Use fallback on error
    console.log("Falling back to pattern-based recommendations");
    return getFallbackMovies(query);
  }
};

export default { searchMovies };
