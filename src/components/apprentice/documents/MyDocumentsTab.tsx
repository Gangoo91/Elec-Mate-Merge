import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Edit, Share } from 'lucide-react';

interface UserDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  lastModified: string;
  category: string;
}

const MyDocumentsTab = () => {
  const [documents, setDocuments] = useState<UserDocument[]>([
    {
      id: 1,
      name: 'Site_Safety_Assessment_Project_A.pdf',
      type: 'PDF',
      size: '2.3 MB',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-15',
      category: 'Safety',
    },
    {
      id: 2,
      name: 'Electrical_Test_Results_Office_Block.xlsx',
      type: 'Excel',
      size: '1.8 MB',
      uploadDate: '2024-01-12',
      lastModified: '2024-01-14',
      category: 'Testing',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newDoc: UserDocument = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.split('/')[1]?.toUpperCase() || 'Unknown',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          lastModified: new Date().toISOString().split('T')[0],
          category: 'General',
        };
        setDocuments((prev) => [...prev, newDoc]);
      });

      toast({
        title: 'Upload Successful',
        description: `${files.length} file(s) uploaded successfully.`,
        variant: 'default',
      });
    }
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast({
      title: 'Document Deleted',
      description: 'Document has been removed from your collection.',
      variant: 'default',
    });
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Upload documents
        </span>
        <div className="border-2 border-dashed border-white/15 rounded-xl p-8 text-center space-y-3">
          <Upload className="h-10 w-10 text-white/55 mx-auto" />
          <h3 className="text-[16px] font-semibold text-white">Upload your documents</h3>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Drag and drop files here, or click to browse
          </p>
          <Input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button
            asChild
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose files
            </label>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Storage overview
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
            <div className="text-2xl font-mono text-white">{documents.length}</div>
            <div className="text-[12px] text-white/55">Total documents</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
            <div className="text-2xl font-mono text-white">
              {documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0).toFixed(1)} MB
            </div>
            <div className="text-[12px] text-white/55">Total size</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
            <div className="text-2xl font-mono text-white">2.5 GB</div>
            <div className="text-[12px] text-white/55">Available space</div>
          </div>
        </div>
      </div>

      <Input
        placeholder="Search your documents..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
      />

      {filteredDocuments.length > 0 ? (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between gap-3 flex-wrap"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="h-5 w-5 text-white/55 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-white truncate">{doc.name}</h4>
                  <p className="text-[12px] text-white/55 font-mono">
                    {doc.type} · {doc.size} · {doc.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Rename
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Share className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
          <h3 className="text-[18px] font-semibold text-white">No documents found</h3>
          <p className="text-[14px] text-white/85">Upload your first document to get started</p>
        </div>
      )}
    </div>
  );
};

export default MyDocumentsTab;
