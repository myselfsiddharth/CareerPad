import axios from "axios";

/**
 * This function takes in user input and an API key,
 * sends a prompt to OpenRouter, and returns a JSON-parsed career tree.
 */
export default async function generateCareerTree(userInput, apiKey) {
  console.log("🎯 generateCareerTree called with:", { userInput, apiKey: apiKey ? "***" : "undefined" });
  
  const prompt = `
You are an expert career advisor. Do not give any options that seem unrealistic. Make sure there is an actual way to achieve the goal. For example you cannot suggest a engineering major to consider becoming a doctor. But feel free to suggest something like biotechnology based on if it is possible for them get into it based on their current stage in college/career. Truly act like a career advising expert. 

Create a detailed career path tree in JSON format.

Based on this user profile:
- Degree: ${userInput.degree}
- Interests: ${userInput.interests}
- Goals: ${userInput.goals}

Generate a JSON tree with this structure:
{
  "title": "Main Career Path",
  "description": "Brief description",
  "children": [
    {
      "title": "Sub-career path",
      "description": "Description",
      "children": []
    }
  ]
}

Each node should have:
- "title": The career path name
- "description": Brief explanation (optional)
- "children": Array of sub-paths (optional)

Create as many paths as you seem necessary for the user to achieve their goals. The output MUST be valid JSON only. Make sure the user reaches the goal by following the path. Add as many chilrend or nodes you think are possible for the user to achieve their goals.
`;

  console.log("📝 Generated prompt:", prompt);

  try {
    // Clean and validate the API key
    const cleanApiKey = apiKey.trim();
    console.log("🔑 API Key length:", cleanApiKey.length);
    console.log("🔑 API Key starts with:", cleanApiKey.substring(0, 10));
    
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${cleanApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://careerpad-09.web.app",
          "X-Title": "CareerPad"
        },
      }
    );

    const raw = response.data.choices?.[0]?.message?.content;
    console.log("🧠 OpenRouter raw:", raw);

    if (!raw) {
      console.error("❌ No content returned from OpenRouter");
      throw new Error("OpenRouter returned nothing.");
    }

    let parsed;
    try {
      const cleaned = raw.trim().replace(/^```json|```$/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON from LLM response:", parseError);
      console.log("🪵 Raw response for debugging:", raw);
      throw new Error("OpenRouter returned invalid JSON.");
    }

    return parsed;
  } catch (err) {
    console.error("🔥 Full LLM error:", err.response?.data || err.message);
    throw new Error("OpenRouter call failed");
  }
}