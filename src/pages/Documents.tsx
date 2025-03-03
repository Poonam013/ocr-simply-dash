
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileImage, Trash2, Download, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for recently processed images
  const images = [
    { id: 1, name: 'Image_001.jpg', date: '2023-05-15', type: 'image' },
    { id: 2, name: 'Document_scan.pdf', date: '2023-05-14', type: 'pdf' },
    { id: 3, name: 'Blurry_photo.jpg', date: '2023-05-13', type: 'image' },
    { id: 4, name: 'Notes.pdf', date: '2023-05-12', type: 'pdf' },
    { id: 5, name: 'Family_picture.jpg', date: '2023-05-11', type: 'image' },
    { id: 6, name: 'Contract.pdf', date: '2023-05-10', type: 'pdf' },
  ];
  
  const filteredItems = images.filter(img => 
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      
      <main className="flex-grow container mx-auto py-10 px-4">
        <div className="max-w-5xl mx-auto bg-black/20 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold">Your Documents</h1>
            <p className="text-gray-400 mt-1">Access your processed images and documents</p>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between mb-6 flex-col sm:flex-row gap-4">
              <div className="relative max-w-md w-full">
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black/30 border-white/10"
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full sm:w-auto">
                <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-5">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No documents found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {searchTerm 
                    ? `No documents matching "${searchTerm}" were found.` 
                    : "You haven't processed any documents yet."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <div key={item.id} className="bg-black/40 rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-colors group">
                    {item.type === 'image' ? (
                      <div className="h-40 bg-black/30 flex items-center justify-center">
                        <FileImage className="h-12 w-12 text-gray-400" />
                      </div>
                    ) : (
                      <div className="h-40 bg-black/30 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-1 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.date}</p>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Download className="h-3 w-3 mr-1" /> Download
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs text-red-400 hover:text-red-300">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documents;
