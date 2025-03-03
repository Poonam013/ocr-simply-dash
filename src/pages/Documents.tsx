
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock documents data
  const documents = [
    { id: 1, name: 'Invoice-2023.pdf', date: '2023-10-15', type: 'PDF' },
    { id: 2, name: 'Scanned_Document.jpg', date: '2023-09-22', type: 'Image' },
    { id: 3, name: 'Contract_Agreement.png', date: '2023-08-10', type: 'Image' },
    { id: 4, name: 'Meeting_Notes.pdf', date: '2023-07-05', type: 'PDF' },
    { id: 5, name: 'Receipt_123.jpg', date: '2023-06-20', type: 'Image' },
  ];
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background blur effects */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="floating-blur floating-blur-1"></div>
        <div className="floating-blur floating-blur-2"></div>
        <div className="floating-blur floating-blur-3"></div>
      </div>
      
      <Header />
      
      <main className="flex-grow pt-24 px-6 py-12">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Documents</h1>
            <p className="text-gray-400">Access and manage your saved documents and extracted text</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload New
            </Button>
          </div>
          
          <div className="glass-morphism rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 grid grid-cols-12 gap-4 text-sm text-gray-400 font-medium">
              <div className="col-span-7 sm:col-span-6">Name</div>
              <div className="hidden sm:block col-span-3">Date</div>
              <div className="col-span-3 sm:col-span-2">Type</div>
              <div className="col-span-2 sm:col-span-1 text-right">Actions</div>
            </div>
            
            <div className="divide-y divide-white/5">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map(doc => (
                  <div key={doc.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors">
                    <div className="col-span-7 sm:col-span-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="truncate">{doc.name}</span>
                    </div>
                    <div className="hidden sm:block col-span-3 text-gray-400">{doc.date}</div>
                    <div className="col-span-3 sm:col-span-2 text-gray-400">{doc.type}</div>
                    <div className="col-span-2 sm:col-span-1 flex justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <Trash className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No documents found</h3>
                  <p className="text-gray-400 mb-4">
                    {searchQuery ? 'Try a different search term' : 'Upload your first document to get started'}
                  </p>
                  {!searchQuery && (
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documents;
