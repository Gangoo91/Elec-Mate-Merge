
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "../types";

interface ContentManagementProps {
  contentItems: ContentItem[];
}

const ContentManagement = ({ contentItems }: ContentManagementProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Content Management</h3>
        <div className="flex gap-2">
          <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded hover:bg-elec-yellow/90 flex items-center gap-1">
            <FileText className="h-3 w-3" /> New Content
          </button>
          <button className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded hover:bg-elec-gray-light/70">
            Categories
          </button>
        </div>
      </div>
      
      <div className="rounded-md border border-elec-yellow/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <Badge 
                    variant={item.status === 'Published' ? 'gold' : 'outline'} 
                    className={item.status === 'Draft' ? 'bg-blue-900/20 text-blue-300' : ''}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button className="text-xs bg-elec-gray-light/30 hover:bg-elec-gray-light/50 px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="text-xs bg-elec-gray-light/30 hover:bg-elec-gray-light/50 px-2 py-1 rounded">
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>Showing 1-4 of 872 content items</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
          <button className="px-2 py-1 rounded bg-elec-yellow/20 text-elec-yellow">1</button>
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">2</button>
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">3</button>
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">Next</button>
        </div>
      </div>
    </Card>
  );
};

export default ContentManagement;
