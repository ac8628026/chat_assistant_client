
import axios from "axios";

export interface ChatResponse {
  response: string;
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await axios.post("https://chat-assistant-backend.kgpian.site/chat-assistant", {
      question: message,  
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; 
  }
};
