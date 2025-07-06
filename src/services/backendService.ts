
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
  private baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';

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
      
      // Return mock data for development/demo purposes
      return {
        type: 'markdown',
        content: this.getMockContent(request.action, request.user_prompt),
        error: undefined
      };
    }
  }

  private getMockContent(action: string, prompt: string): string {
    switch (action) {
      case 'summarize':
        return `# Résumé généré\n\nVoici un résumé basé sur votre demande: "${prompt}"\n\n## Points clés\n- Concept principal identifié\n- Éléments importants extraits\n- Structure logique organisée`;
      
      case 'quiz':
        return `# Quiz généré\n\n**Question 1:** Quel est le concept principal abordé ?\n- A) Option A\n- B) Option B\n- C) Option C\n\n**Réponse:** C\n\n**Question 2:** Comment appliquer ce concept ?\n- A) Méthode 1\n- B) Méthode 2\n- C) Méthode 3\n\n**Réponse:** A`;
      
      case 'mindmap':
        return `# Mindmap généré\n\n## ${prompt}\n\n### Branche 1: Concepts de base\n- Élément 1\n- Élément 2\n\n### Branche 2: Applications\n- Utilisation pratique\n- Exemples concrets\n\n### Branche 3: Approfondissement\n- Concepts avancés\n- Liens avec d'autres sujets`;
      
      default:
        return `# Contenu généré\n\nRéponse basée sur votre demande: "${prompt}"\n\nCeci est un exemple de contenu généré par l'IA.`;
    }
  }
}

export const backendService = new BackendService();
