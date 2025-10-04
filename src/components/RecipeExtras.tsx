import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Lightbulb } from "lucide-react";

interface RecipeExtrasProps {
  shoppingList: string[];
  tips: string[];
  language: "en" | "es";
}

const translations = {
  en: {
    shoppingList: "Shopping List",
    tips: "Cooking Tips",
    emptyShoppingList: "No items in shopping list",
    emptyTips: "No tips available",
  },
  es: {
    shoppingList: "Lista de Compras",
    tips: "Consejos de Cocina",
    emptyShoppingList: "No hay artículos en la lista de compras",
    emptyTips: "No hay consejos disponibles",
  },
};

export const RecipeExtras = ({ shoppingList, tips, language }: RecipeExtrasProps) => {
  const t = translations[language];

  const hasShoppingList = shoppingList && shoppingList.length > 0;
  const hasTips = tips && tips.length > 0;

  if (!hasShoppingList && !hasTips) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Shopping List */}
        {hasShoppingList && (
          <Card className="hover:shadow-soft transition-smooth">
            <CardHeader className="bg-gradient-subtle">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {t.shoppingList}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {shoppingList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

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
