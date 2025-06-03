
export interface BackendRequest {
  action: string;
  user_prompt: string;
}

export interface BackendResponse {
  type: 'markdown' | 'json';
  content: any;
  error?: string;
}

class BackendService {
  private baseUrl = 'http://localhost:3001/api'; // Change this to your backend URL

  async sendToBackend(request: BackendRequest): Promise<BackendResponse> {
    try {
      console.log('Sending to backend:', request);
      
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);
      
      return data;
    } catch (error) {
      console.error('Backend error:', error);
      throw new Error(`Failed to communicate with backend: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const backendService = new BackendService();
