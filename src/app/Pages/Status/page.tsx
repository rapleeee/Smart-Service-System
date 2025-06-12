'use client'

import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface RequestStatus {
  id: string;
  type: string;
  date: string;
  vendor: string;
  status: 'pending' | 'completed' | 'in-progress';
  feedback?: {
    rating: number;
    comment: string;
  };
}

const dummyRequests: RequestStatus[] = [
  {
    id: "REQ-2025-001",
    type: "Kendaraan",
    date: "2025-06-15",
    vendor: "PT Trans Jaya",
    status: "in-progress"
  },
  {
    id: "REQ-2025-002",
    type: "Ruang Meeting",
    date: "2025-06-16",
    vendor: "Hotel Bidakara",
    status: "completed"
  }
];

export default function StatusPage() {
  const [requests, setRequests] = useState<RequestStatus[]>(dummyRequests);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestStatus | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleConfirmation = (request: RequestStatus) => {
    setSelectedRequest(request);
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    if (selectedRequest) {
      setRequests(requests.map(req => 
        req.id === selectedRequest.id 
          ? { 
              ...req, 
              status: 'completed',
              feedback: { rating, comment }
            } 
          : req
      ));
      
      toast.success("Terima kasih atas feedback Anda!");
      setShowFeedback(false);
      setRating(0);
      setComment('');
    }
  };

  return (
 <SidebarLayout>
      <div className="p-6 space-y-6 relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Status Pengajuan
            </h1>
            <p className="text-muted-foreground">
              Pantau status dan berikan feedback untuk layanan kami
            </p>
          </div>
          
          {/* Status Summary */}
          <div className="flex gap-3">
            {[
              { label: 'Menunggu', status: 'pending', color: 'yellow' },
              { label: 'Dalam Proses', status: 'in-progress', color: 'blue' },
              { label: 'Selesai', status: 'completed', color: 'green' }
            ].map(({ label, status, color }) => (
              <div 
                key={status}
                className={`px-4 py-2 rounded-lg border flex items-center gap-2 
                  ${color === 'yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                    color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                    'bg-green-50 border-green-200 text-green-700'
                  }`}
              >
                <div className={`w-2 h-2 rounded-full 
                  ${color === 'yellow' ? 'bg-yellow-500' :
                    color === 'blue' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`} 
                />
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm">
                  {requests.filter(r => r.status === status).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {requests.map((request) => (
            <Card 
              key={request.id}
              className="hover:shadow-lg transition-all duration-300 border-l-4
                ${request.status === 'completed' ? 'border-l-green-500' :
                  request.status === 'in-progress' ? 'border-l-blue-500' :
                  'border-l-yellow-500'
                }"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {request.type}
                    <span className="text-sm font-normal text-muted-foreground">
                      {request.id}
                    </span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {request.vendor}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium
                  ${request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {request.status === 'completed' ? 'Selesai' :
                   request.status === 'in-progress' ? 'Dalam Proses' :
                   'Menunggu'}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Tanggal:</span>
                      <span className="font-medium">{request.date}</span>
                    </div>
                  </div>
                  
                  {request.status === 'in-progress' && (
                    <Button 
                      onClick={() => handleConfirmation(request)}
                      className="mt-2 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      Konfirmasi Pengajuan diTerima
                    </Button>
                  )}

                  {request.feedback && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i}
                            className={`w-4 h-4 ${
                              i < request.feedback!.rating 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{request.feedback.comment}"
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feedback Modal with animation */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
            <Card className="w-full max-w-md mx-4 shadow-xl animate-in slide-in-from-bottom duration-300">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Berikan Feedback
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Bagaimana pengalaman Anda menggunakan layanan kami?
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex justify-center gap-3">
                  {[...Array(5)].map((_, i) => (
                    <button
                    aria-label='Rate service'
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className="focus:outline-none transform hover:scale-110 transition-transform"
                    >
                      <StarIcon 
                        className={`w-10 h-10 ${
                          i < rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-200'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                
                <Textarea
                  placeholder="Berikan komentar Anda..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary/20"
                />

                <div className="flex gap-3 justify-end pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFeedback(false)}
                    className="hover:bg-gray-100"
                  >
                    Batal
                  </Button>
                  <Button 
                    onClick={submitFeedback}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Kirim Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </SidebarLayout>
  )
}