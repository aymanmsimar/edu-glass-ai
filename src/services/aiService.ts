
// Simulated AI service that mimics the backend functionality
export interface AIResponse {
  type: 'markdown' | 'json';
  content: any;
  error?: string;
}

export interface TopicMatch {
  topic: string;
  session_order: string;
}

export interface SessionData {
  session_title: string;
  session_order: number;
  session_description: string;
  markdown_content: string;
}

// Mock data that would come from your MongoDB
const mockTopics = ['HTML/CSS', 'JavaScript', 'React', 'Node.js'];

const mockSessions: SessionData[] = [
  {
    session_title: 'Bases d\'HTML et CSS, Structure d\'une page web, Introduction à CSS',
    session_order: 1,
    session_description: 'Introduction aux fondamentaux du développement web',
    markdown_content: `
### HTML Basics
- Structure de base avec DOCTYPE, html, head, body
- Balises essentielles: h1-h6, p, div, span, a, img

### CSS Introduction
- Sélecteurs: éléments, classes, IDs
- Propriétés: color, background-color, font-size, margin, padding

### Structure d'une page web
- Métadonnées: title, meta charset, meta viewport
- Contenu: header, nav, main, footer
    `
  }
];

class AIService {
  private async simulateAICall(prompt: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // This would be replaced with actual API calls in a real implementation
    console.log('Simulated AI prompt:', prompt);
    
    return "Simulated AI response";
  }

  private buildActionPrompt(action: string, title: string, content: string): string {
    switch (action) {
      case 'summarize':
        return `
          Tu es un assistant pédagogique. Je vais te fournir le contenu brut d'une séance intitulée : "${title}".
          
          Le texte peut contenir des lignes vides ou inutiles. Voici ce que tu dois faire :
          1. Ignore les lignes vides ou non informatives.
          2. Organise le contenu par titres (déjà marqués avec ###).
          3. Résume le contenu de façon claire et structurée, en français.
          4. Le résumé doit être utile pour un étudiant souhaitant réviser rapidement cette séance.
          5. Gardez la réponse sous 2500 caractères
          
          Retourne uniquement le Markdown. Aucun autre texte.
          Voici le contenu :
          ${content}
        `;

      case 'quiz':
        return `
          Tu es un assistant pédagogique. Je vais te fournir le contenu brut d'une séance intitulée : "${title}".
          
          Je veux que tu crées un quiz avec solutions basé sur ce contenu.
          
          Format de sortie: JSON uniquement, bien structuré.
          Structure demandée:
          {
            "title": "Titre de la séance",
            "questions": [
              {
                "question": "Quel est le rôle du DNS dans Internet ?",
                "options": [
                  "Il stocke les fichiers HTML.",
                  "Il convertit les noms de domaine en adresses IP.",
                  "Il crypte les communications HTTPS.",
                  "Il héberge les bases de données."
                ],
                "answer": "Il convertit les noms de domaine en adresses IP.",
                "explanation": "Le DNS fait correspondre les noms de domaine avec leurs adresses IP respectives."
              }
            ]
          }
          
          Consignes:
          - Génère entre 5 à 10 questions maximum.
          - Chaque question doit avoir 4 propositions.
          - Une seule réponse correcte par question.
          - Ajoute une explication claire et concise pour chaque réponse.
          - Le JSON ne doit pas être entouré de texte ni de commentaire.
          - Gardez la réponse sous 2500 caractères
          
          Voici le contenu:
          ${content}
        `;

      case 'mindmap':
        return `
          Tu es un assistant pédagogique. Je vais te fournir le contenu brut d'une séance intitulée : "${title}".
          
          Je veux que tu génères une carte mentale (mind map) à partir de ce contenu.
          Format de sortie : JSON
          Structure demandée :
          {
            "title": "Titre de la séance",
            "nodes": [
              {
                "title": "Titre principal",
                "children": [
                  {
                    "title": "Sous-concept 1"
                  },
                  {
                    "title": "Sous-concept 2"
                  }
                ]
              }
            ]
          }
          
          Consignes :
          - Résume de manière hiérarchique et claire.
          - Utilise les titres marqués avec ### comme racines principales.
          - Évite les détails inutiles.
          - Utilise un JSON bien formé, sans texte ou explication autour.
          - Gardez la réponse sous 2500 caractères
          
          Voici le contenu :
          ${content}
        `;

      default:
        throw new Error('Action non supportée.');
    }
  }

  private matchUserPrompt(userPrompt: string): TopicMatch {
    // Simulate topic matching logic
    console.log('Matching user prompt:', userPrompt);
    
    // Simple keyword matching for demo
    if (userPrompt.toLowerCase().includes('html') || userPrompt.toLowerCase().includes('css')) {
      return { topic: 'HTML/CSS', session_order: '1' };
    }
    
    // Default to first session
    return { topic: 'HTML/CSS', session_order: '1' };
  }

  private generateMockSummary(): string {
    return `
# Résumé - Séance 1: Bases d'HTML et CSS

## Points clés

### HTML Basics
- **Structure de base** : Tout document HTML commence par \`<!DOCTYPE html>\` suivi des balises \`<html>\`, \`<head>\` et \`<body>\`
- **Balises essentielles** : Les titres (\`<h1>\` à \`<h6>\`), paragraphes (\`<p>\`), divisions (\`<div>\`), liens (\`<a>\`) et images (\`<img>\`)

### CSS Introduction
- **Sélecteurs** : Cibler les éléments par nom (h1), classe (.class) ou ID (#id)
- **Propriétés fondamentales** : color, background-color, font-size, margin, padding

### Structure d'une page web
- **Métadonnées** : title, meta charset, meta viewport pour l'optimisation mobile
- **Éléments sémantiques** : header, nav, main, footer pour une structure claire

## À retenir
Cette séance pose les bases essentielles du développement web front-end avec HTML pour la structure et CSS pour la présentation.
    `;
  }

  private generateMockQuiz(): any {
    return {
      title: "Quiz - Séance 1: Bases d'HTML et CSS",
      questions: [
        {
          question: "Quelle balise HTML est utilisée pour définir le titre principal d'une page ?",
          options: [
            "<title>",
            "<h1>",
            "<header>",
            "<main>"
          ],
          answer: "<h1>",
          explanation: "La balise <h1> est utilisée pour le titre principal du contenu visible sur la page."
        },
        {
          question: "Comment sélectionne-t-on un élément avec la classe 'exemple' en CSS ?",
          options: [
            "#exemple",
            ".exemple",
            "exemple",
            "*exemple"
          ],
          answer: ".exemple",
          explanation: "Le point (.) est utilisé pour sélectionner les éléments par leur classe en CSS."
        }
      ]
    };
  }

  private generateMockMindmap(): any {
    return {
      title: "Séance 1: Bases d'HTML et CSS",
      nodes: [
        {
          title: "HTML Basics",
          children: [
            {
              title: "Structure de base",
              children: [
                { title: "<!DOCTYPE html>" },
                { title: "<html>" },
                { title: "<head>" },
                { title: "<body>" }
              ]
            },
            {
              title: "Balises essentielles",
              children: [
                { title: "<h1> à <h6>" },
                { title: "<p>" },
                { title: "<div>" },
                { title: "<a>" }
              ]
            }
          ]
        },
        {
          title: "CSS Introduction",
          children: [
            {
              title: "Sélecteurs",
              children: [
                { title: "Élément (h1)" },
                { title: "Classe (.class)" },
                { title: "ID (#id)" }
              ]
            }
          ]
        }
      ]
    };
  }

  async processUserAction(action: string, userPrompt: string): Promise<AIResponse> {
    try {
      // Match user prompt to find relevant session
      const matched = this.matchUserPrompt(userPrompt);
      console.log('Matched topic and session:', matched);

      // Find session data (in real app, this would query your database)
      const session = mockSessions.find(s => s.session_order.toString() === matched.session_order);
      
      if (!session) {
        return { type: 'markdown', content: '', error: 'Session non trouvée.' };
      }

      // Build prompt for AI generation
      const prompt = this.buildActionPrompt(action, session.session_title, session.markdown_content);
      
      // Simulate AI call
      await this.simulateAICall(prompt);

      // Generate mock responses based on action type
      switch (action) {
        case 'summarize':
          return {
            type: 'markdown',
            content: this.generateMockSummary()
          };
        case 'quiz':
          return {
            type: 'json',
            content: this.generateMockQuiz()
          };
        case 'mindmap':
          return {
            type: 'json',
            content: this.generateMockMindmap()
          };
        default:
          return { type: 'markdown', content: '', error: 'Action non supportée.' };
      }
    } catch (error) {
      console.error('Error processing user action:', error);
      return { 
        type: 'markdown', 
        content: '', 
        error: `Erreur lors du traitement: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
      };
    }
  }
}

export const aiService = new AIService();
