export async function fetchMessages() {
  try {
    const response = await fetch("https://9t1p2ykl2h.execute-api.eu-north-1.amazonaws.com/messages");
    if (!response.ok) {
      throw new Error("Något gick fel med hämtningen");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fel vid API-anrop:", error);
    throw error;
  }
}