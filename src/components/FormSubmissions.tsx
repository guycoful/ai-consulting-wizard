
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Phone, Mail, Calendar, Building } from 'lucide-react';

interface FormSubmission {
  id: number;
  created_at: string;
  שם_מלא: string;
  טלפון: string;
  מייל: string;
  תחום_פעילות: string;
  שם_בארגון: string;
  'מספר_עובדים_(משוער)': number;
  מתי_נוח_לכם_להתחיל_את_התהליך: string;
  'מהם_קהלי_היעד_המרכזיים_שלכם?': string[];
  'מהם_השירותים_/_המוצרים_המרכזיים_שא': string;
  מהם_האתגרים_המרכזיים_שאתם_מתמודדי: string;
}

const FormSubmissions = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiling_form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        toast.error('שגיאה בטעינת הטפסים');
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('שגיאה בטעינת הטפסים');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.שם_מלא?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.מייל?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.שם_בארגון?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.תחום_פעילות?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">טוען...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">טפסי איפיון שהתקבלו</h1>
        
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="חפש לפי שם, מייל, ארגון או תחום פעילות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        <div className="text-sm text-gray-600 mb-4">
          סה"כ {filteredSubmissions.length} טפסים
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{submission.שם_מלא}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(submission.created_at)}
                    </div>
                    {submission.שם_בארגון && (
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {submission.שם_בארגון}
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant="secondary">{submission.תחום_פעילות}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${submission.טלפון}`} className="text-blue-600 hover:underline">
                    {submission.טלפון}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${submission.מייל}`} className="text-blue-600 hover:underline">
                    {submission.מייל}
                  </a>
                </div>
              </div>

              {submission['מספר_עובדים_(משוער)'] && (
                <div className="mb-2">
                  <strong>מספר עובדים:</strong> {submission['מספר_עובדים_(משוער)']}
                </div>
              )}

              {submission['מהם_השירותים_/_המוצרים_המרכזיים_שא'] && (
                <div className="mb-2">
                  <strong>שירותים מרכזיים:</strong>
                  <p className="text-sm text-gray-700 mt-1">
                    {submission['מהם_השירותים_/_המוצרים_המרכזיים_שא']}
                  </p>
                </div>
              )}

              {submission.מהם_האתגרים_המרכזיים_שאתם_מתמודדי && (
                <div className="mb-4">
                  <strong>אתגרים מרכזיים:</strong>
                  <p className="text-sm text-gray-700 mt-1">
                    {submission.מהם_האתגרים_המרכזיים_שאתם_מתמודדי}
                  </p>
                </div>
              )}

              {submission.מתי_נוח_לכם_להתחיל_את_התהליך && (
                <div className="mb-4">
                  <strong>תאריך התחלה מועדף:</strong> {new Date(submission.מתי_נוח_לכם_להתחיל_את_התהליך).toLocaleDateString('he-IL')}
                </div>
              )}

              <Button 
                onClick={() => setSelectedSubmission(submission)}
                variant="outline"
                size="sm"
              >
                צפה בפרטים המלאים
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>פרטים מלאים - {selectedSubmission.שם_מלא}</CardTitle>
                <Button 
                  onClick={() => setSelectedSubmission(null)}
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                  {JSON.stringify(selectedSubmission, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FormSubmissions;
