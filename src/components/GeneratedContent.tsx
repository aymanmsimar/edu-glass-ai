
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Brain } from 'lucide-react';
import { AIResponse } from '../services/aiService';

interface GeneratedContentProps {
  response: AIResponse;
  actionType: string;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ response, actionType }) => {
  if (response.error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 text-destructive">
          <XCircle className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Erreur</h3>
            <p className="text-sm">{response.error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const renderSummary = (content: string) => (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="gradient-text flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Résumé généré
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="prose prose-invert max-w-none text-text-light"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
        />
      </CardContent>
    </Card>
  );

  const renderQuiz = (quizData: any) => (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="gradient-text">{quizData.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quizData.questions.map((question: any, index: number) => (
          <div key={index} className="border border-white/10 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-3">{question.question}</h4>
            <div className="space-y-2">
              {question.options.map((option: string, optIndex: number) => (
                <div 
                  key={optIndex}
                  className={`p-2 rounded ${
                    option === question.answer 
                      ? 'bg-success/20 border border-success text-success' 
                      : 'bg-surface-dark/50 text-text-light'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {option === question.answer && <CheckCircle className="w-4 h-4" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-surface-dark/50 rounded text-sm text-text-light">
              <strong>Explication :</strong> {question.explanation}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderMindmap = (mindmapData: any) => (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="gradient-text">{mindmapData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mindmapData.nodes.map((node: any, index: number) => (
            <div key={index} className="border border-white/10 rounded-lg p-4">
              <h4 className="font-bold text-white mb-3">{node.title}</h4>
              <div className="ml-4 space-y-2">
                {node.children?.map((child: any, childIndex: number) => (
                  <div key={childIndex}>
                    <div className="font-semibold text-electric-blue">{child.title}</div>
                    {child.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {child.children.map((subChild: any, subIndex: number) => (
                          <div key={subIndex} className="text-text-light text-sm">
                            • {subChild.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {response.type === 'markdown' && renderSummary(response.content)}
      {response.type === 'json' && actionType === 'quiz' && renderQuiz(response.content)}
      {response.type === 'json' && actionType === 'mindmap' && renderMindmap(response.content)}
    </motion.div>
  );
};

export default GeneratedContent;
