export const sendAudioToAPI = async (audioBlob: Blob): Promise<any> => {
    const apiEndpoint = "http://127.0.0.1:8000/recognize-bytes"; // Remplacez par votre endpoint API
    const formData = new FormData();
    formData.append("audio", audioBlob);
  
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API:", error);
      throw error;
    }
  };
  