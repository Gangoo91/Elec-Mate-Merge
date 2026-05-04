import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, FileText, Download, Eye, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  dateAdded: string;
  category: string;
}

const FavouritesTab = () => {
  const [favouriteDocuments, setFavouriteDocuments] = useState<PersonalDocument[]>([
    {
      id: 1,
      name: 'Electrical Installation Certificate',
      type: 'PDF',
      size: '2.4 MB',
      dateAdded: '2024-01-15',
      category: 'Certificates',
    },
    {
      id: 2,
      name: 'Risk Assessment Template',
      type: 'PDF',
      size: '1.8 MB',
      dateAdded: '2024-01-10',
      category: 'Safety',
    },
    {
      id: 3,
      name: 'Site Inspection Form',
      type: 'PDF',
      size: '1.2 MB',
      dateAdded: '2024-01-08',
      category: 'Inspections',
    },
  ]);

  const { toast } = useToast();

  const handleDownload = (document: PersonalDocument) => {
    toast({
      title: 'Download Started',
      description: `${document.name} is downloading...`,
      variant: 'default',
    });

    setTimeout(() => {
      toast({
        title: 'Download Complete',
        description: `${document.name} has been downloaded successfully.`,
        variant: 'default',
      });
    }, 1500);
  };

  const handleRemoveFavourite = (documentId: number) => {
    setFavouriteDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
    toast({
      title: 'Removed from Favourites',
      description: 'Document has been removed from your favourites.',
      variant: 'default',
    });
  };

  const quickAccessDocuments = [
    {
      name: 'Electrical Installation Certificate',
      category: 'Certificates',
      lastUsed: '2 days ago',
    },
    { name: 'Risk Assessment Template', category: 'Safety', lastUsed: '1 week ago' },
    { name: 'Site Inspection Form', category: 'Inspections', lastUsed: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Quick access
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickAccessDocuments.map((doc, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-white/55" />
                <h4 className="text-[14px] font-medium text-white">{doc.name}</h4>
              </div>
              <p className="text-[13px] text-white/85">{doc.category}</p>
              <p className="text-[11px] text-white/55 font-mono">Last used {doc.lastUsed}</p>
              <Button
                size="sm"
                className="mt-2 w-full h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Favourites summary
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
            <div className="text-2xl font-mono text-white">{favouriteDocuments.length}</div>
            <div className="text-[12px] text-white/55">Favourite documents</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
            <div className="text-2xl font-mono text-white">
              {new Set(favouriteDocuments.map((d) => d.category)).size}
            </div>
            <div className="text-[12px] text-white/55">Document categories</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
            <div className="text-2xl font-mono text-white">24</div>
            <div className="text-[12px] text-white/55">Downloads this month</div>
          </div>
        </div>
      </div>

      {favouriteDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favouriteDocuments.map((document) => (
            <div
              key={document.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3 relative"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="h-5 w-5 text-white/55 flex-shrink-0" />
                  <h3 className="text-[14px] font-semibold text-white leading-snug">
                    {document.name}
                  </h3>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Star className="h-4 w-4 fill-elec-yellow text-elec-yellow" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-1 h-auto text-white/55 hover:text-white hover:bg-white/[0.05]"
                    onClick={() => handleRemoveFavourite(document.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-[12px] text-white/55 font-mono space-y-0.5">
                <p>
                  {document.type} · {document.size}
                </p>
                <p>{new Date(document.dateAdded).toLocaleDateString()}</p>
                <p className="font-sans normal-case">{document.category}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-10 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  className="flex-1 h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                  onClick={() => handleDownload(document)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
          <h3 className="text-[18px] font-semibold text-white">No favourites yet</h3>
          <p className="text-[14px] text-white/85">
            Star your most important documents for quick access
          </p>
          <Button
            variant="outline"
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload documents
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavouritesTab;
