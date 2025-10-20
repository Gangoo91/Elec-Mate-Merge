import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CategorisedItems } from "@/utils/toolsCategorisation";

interface CategorisedToolsListProps {
  categorisedItems: CategorisedItems;
  icon?: React.ReactNode;
}

export const CategorisedToolsList = ({ categorisedItems, icon }: CategorisedToolsListProps) => {
  const categories = Object.keys(categorisedItems);

  if (categories.length === 0) {
    return null;
  }

  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {categories.map((category) => (
        <AccordionItem key={category} value={category} className="border border-primary/10 rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-2 w-full">
              {icon}
              <span className="font-semibold text-sm text-foreground">{category}</span>
              <Badge variant="secondary" className="ml-auto mr-2 bg-primary/10 text-primary hover:bg-primary/20">
                {categorisedItems[category].length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1">
            <ul className="text-sm text-foreground space-y-1.5 pl-1">
              {categorisedItems[category].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
