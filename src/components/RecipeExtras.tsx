import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface RecipeExtrasProps {
  tips: string[];
  language: "en" | "es";
}

const translations = {
  en: {
    tips: "Cooking Tips",
    emptyTips: "No tips available",
  },
  es: {
    tips: "Consejos de Cocina",
    emptyTips: "No hay consejos disponibles",
  },
};

export const RecipeExtras = ({ tips, language }: RecipeExtrasProps) => {
  const t = translations[language];

  const hasTips = tips && tips.length > 0;

  if (!hasTips) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto">
        {/* Tips */}
        {hasTips && (
          <Card className="hover:shadow-soft transition-smooth">
            <CardHeader className="bg-gradient-subtle">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                {t.tips}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {tips.map((tip, i) => (
                  <li key={i} className="pl-2">{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
