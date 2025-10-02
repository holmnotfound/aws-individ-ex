export async function fetchMessages() {
  try {
    const response = await fetch("https://9t1p2ykl2h.execute-api.eu-north-1.amazonaws.com/messages");
    if (!response.ok) {
      throw new Error("Något gick fel med hämtningen");
    }
    const data = await response.json();
    return data.map(msg => ({
    id: msg.id || msg.sk,
    username: msg.username,
    text: msg.text,
    createdAt: msg.createdAt,
  }));
  } catch (error) {
    console.error("Fel vid API-anrop:", error);
    throw error;
  }
}

export async function postMessage(username, text) {
  const response = await fetch("https://9t1p2ykl2h.execute-api.eu-north-1.amazonaws.com/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, text }),
  });

  if (!response.ok) {
    throw new Error("Något gick fel vid API-anropet");
  }

  return response.json(); 
}

export async function updateMessage(id, newText) {
  const response = await fetch("https://9t1p2ykl2h.execute-api.eu-north-1.amazonaws.com/messages", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, newText }), 
  });

  if (!response.ok) {
    const error = await response.text(); 
    console.error("API-fel:", error);
    throw new Error("Något gick fel vid uppdatering");
  }

  return await response.json();
}

export async function fetchUsername(username) {
  const response = await fetch(
    `https://9t1p2ykl2h.execute-api.eu-north-1.amazonaws.com/messages/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("API-fel:", error);
    throw new Error("Något gick fel vid hämtning");
  }

  return await response.json();
}