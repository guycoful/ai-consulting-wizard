import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  // פרטים כלליים
  fullName: string;
  phone: string;
  email: string;
  businessField: string;
  
  // חלק א': ניהול לידים ופניות נכנסות
  leadChannels: {
    facebook: number | '';
    whatsapp: number | '';
    website: number | '';
    phone: number | '';
    referrals: number | '';
    other: number | '';
  };
  
  leadProcessStep2: string; // באיזו מערכת רושמים הליד
  leadProcessResponseTime: string; // תוך כמה זמן מגיבים ללידים
  leadFirstResponse: string; // מה התגובה הראשונית
  leadQualificationCriteria: string; // קריטריונים לסינון לידים
  leadManagementTools: string[]; // כלים לניהול לידים
  leadManagementToolsOther: string;
  
  // חלק ב': תהליכי שיווק ושמירת קשר
  contentTypes: string[]; // סוגי תוכן שמייצרים
  contentProductionTime: {
    posts: number | '';
    newsletter: number | '';
    videos: number | '';
  };
  customerDatabase: number | ''; // כמה אנשי קשר יש במאגר
  customerDatabaseLocation: string; // היכן מנוהל המאגר
  customerSegmentation: string[]; // איך מפולח המאגר
  followUpProcess: string; // תהליך פנייה מחודשת
  followUpTools: string[]; // כלים לשמירת קשר
  
  // חלק ג': תפעול, אדמיניסטרציה וניהול משימות
  weeklyMeetings: number | ''; // כמה פגישות מתאמים בשבוע
  remindersSent: number | ''; // כמה תזכורות נשלחות
  meetingSchedulingProcess: string; // תהליך תיאום פגישות
  recurringTasks: string[]; // משימות שחוזרות על עצמן
  adminTimeSpent: number | ''; // שעות עבודה בשבוע על מנהלה
  documentGeneration: string; // תהליך הפקת מסמכים
  
  // חלק ד': מערכות קיימות ואינטגרציות
  currentSoftware: string[]; // תוכנות בשימוש
  currentSoftwareOther: string;
  
  existingAutomations: string; // אוטומציות קיימות
  automationTools: string[]; // כלים לאוטומציה
  
  // פירוט תהליך העבודה המרכזי
  mainWorkflowDetail: string;
  
  // מטרות ותכנון
  budgetStatus: string;
  budgetAmount: number | '';
  budgetDetails: string; // פרטי התקציב כאשר בוחרים "כן"
  successMetric: string; // המדד הכמותי לקביעת הצלחה
  
  startDate: string;
  preferredTime: string;
  additionalComments: string;
}

const OrganizationProfilingForm = () => {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    businessField: '',
    
    leadChannels: {
      facebook: '',
      whatsapp: '',
      website: '',
      phone: '',
      referrals: '',
      other: ''
    },
    
    leadProcessStep2: '',
    leadProcessResponseTime: '',
    leadFirstResponse: '',
    leadQualificationCriteria: '',
    leadManagementTools: [],
    leadManagementToolsOther: '',
    
    contentTypes: [],
    contentProductionTime: {
      posts: '',
      newsletter: '',
      videos: ''
    },
    customerDatabase: '',
    customerDatabaseLocation: '',
    customerSegmentation: [],
    followUpProcess: '',
    followUpTools: [],
    
    weeklyMeetings: '',
    remindersSent: '',
    meetingSchedulingProcess: '',
    recurringTasks: [],
    adminTimeSpent: '',
    documentGeneration: '',
    
    currentSoftware: [],
    currentSoftwareOther: '',
    
    existingAutomations: '',
    automationTools: [],
    
    mainWorkflowDetail: '',
    
    budgetStatus: '',
    budgetAmount: '',
    budgetDetails: '',
    successMetric: '',
    
    startDate: '',
    preferredTime: '',
    additionalComments: ''
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    console.log(`Field changed: ${field}`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (parentField: keyof FormData, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as object),
        [childField]: value
      }
    }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    console.log(`Checkbox changed: ${field}`, value, checked);
    const currentArray = formData[field] as string[];
    if (checked) {
      handleInputChange(field, [...currentArray, value]);
    } else {
      handleInputChange(field, currentArray.filter(item => item !== value));
    }
  };

  const validateForm = () => {
    console.log('Starting form validation...');
    const requiredFields = [
      'fullName', 'phone', 'email', 'businessField', 'leadProcessStep2', 
      'leadProcessResponseTime', 'leadFirstResponse', 'leadQualificationCriteria',
      'customerDatabaseLocation', 'followUpProcess', 'meetingSchedulingProcess',
      'documentGeneration', 'existingAutomations', 'mainWorkflowDetail',
      'budgetStatus', 'successMetric', 'startDate', 'preferredTime'
    ];

    for (const field of requiredFields) {
      const value = formData[field as keyof FormData];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        console.error(`Missing required field: ${field}`);
        toast.error(`השדה "${field}" הוא חובה`);
        return false;
      }
    }

    // בדיקת שדות מחויבים שהם מערכים
    const requiredArrayFields = ['leadManagementTools', 'contentTypes', 'customerSegmentation', 
      'followUpTools', 'recurringTasks', 'currentSoftware', 'automationTools'];
    
    for (const field of requiredArrayFields) {
      const value = formData[field as keyof FormData] as string[];
      if (!value || value.length === 0) {
        console.error(`Missing required array field: ${field}`);
        toast.error(`השדה "${field}" הוא חובה`);
        return false;
      }
    }

    // בדיקת שדות מספריים מחויבים
    const requiredNumberFields = ['customerDatabase', 'weeklyMeetings', 'remindersSent', 'adminTimeSpent'];
    for (const field of requiredNumberFields) {
      const value = formData[field as keyof FormData];
      if (value === '' || value === null || value === undefined) {
        console.error(`Missing required number field: ${field}`);
        toast.error(`השדה "${field}" הוא חובה`);
        return false;
      }
    }

    // בדיקת שדות זמן ייצור תוכן (לפחות אחד חובה)
    const { posts, newsletter, videos } = formData.contentProductionTime;
    if (posts === '' && newsletter === '' && videos === '') {
      toast.error('חובה למלא לפחות זמן אחד לייצור תוכן');
      return false;
    }

    // בדיקת שדות לידים (לפחות אחד חובה)
    const { facebook, whatsapp, website, phone, referrals, other } = formData.leadChannels;
    if (facebook === '' && whatsapp === '' && website === '' && phone === '' && referrals === '' && other === '') {
      toast.error('חובה למלא לפחות ערוץ אחד ללידים');
      return false;
    }

    // בדיקת שדה פרטי תקציב אם בחרו "כן"
    if (formData.budgetStatus === 'כן' && (!formData.budgetDetails || formData.budgetDetails.trim() === '')) {
      toast.error('אנא פרט על התקציב הזמין');
      return false;
    }

    console.log('Form validation passed');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Current form data:', formData);
    
    if (!validateForm()) {
      console.error('Form validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      // בניית הנתונים עם המבנה החדש
      const submissionData = {
        שם_מלא: formData.fullName || null,
        טלפון: formData.phone || null,
        מייל: formData.email || null,
        תחום_פעילות: formData.businessField || null,
        
        // חלק א': ניהול לידים
        לידים_פייסבוק_חודשי: formData.leadChannels.facebook ? Number(formData.leadChannels.facebook) : null,
        לידים_וואטסאפ_חודשי: formData.leadChannels.whatsapp ? Number(formData.leadChannels.whatsapp) : null,
        לידים_אתר_חודשי: formData.leadChannels.website ? Number(formData.leadChannels.website) : null,
        לידים_טלפון_חודשי: formData.leadChannels.phone ? Number(formData.leadChannels.phone) : null,
        לידים_הפניות_חודשי: formData.leadChannels.referrals ? Number(formData.leadChannels.referrals) : null,
        לידים_אחר_חודשי: formData.leadChannels.other ? Number(formData.leadChannels.other) : null,
        
        מערכת_רישום_לידים: formData.leadProcessStep2 || null,
        זמן_תגובה_ללידים: formData.leadProcessResponseTime || null,
        תגובה_ראשונית_ללידים: formData.leadFirstResponse || null,
        קריטריונים_סינון_לידים: formData.leadQualificationCriteria || null,
        כלים_ניהול_לידים: formData.leadManagementTools.concat(formData.leadManagementToolsOther ? [formData.leadManagementToolsOther] : []),
        
        // חלק ב': שיווק ושמירת קשר
        סוגי_תוכן_מיוצרים: formData.contentTypes,
        זמן_פוסטים_דקות: formData.contentProductionTime.posts ? Number(formData.contentProductionTime.posts) : null,
        זמן_ניוזלטר_דקות: formData.contentProductionTime.newsletter ? Number(formData.contentProductionTime.newsletter) : null,
        זמן_וידאו_דקות: formData.contentProductionTime.videos ? Number(formData.contentProductionTime.videos) : null,
        מספר_אנשי_קשר_במאגר: formData.customerDatabase ? Number(formData.customerDatabase) : null,
        מיקום_מאגר_לקוחות: formData.customerDatabaseLocation || null,
        פילוח_מאגר_לקוחות: formData.customerSegmentation,
        תהליך_פנייה_מחודשת: formData.followUpProcess || null,
        כלים_שמירת_קשר: formData.followUpTools,
        
        // חלק ג': תפעול ואדמיניסטרציה
        פגישות_שבועיות: formData.weeklyMeetings ? Number(formData.weeklyMeetings) : null,
        תזכורות_שבועיות: formData.remindersSent ? Number(formData.remindersSent) : null,
        תהליך_תיאום_פגישות: formData.meetingSchedulingProcess || null,
        משימות_חוזרות: formData.recurringTasks,
        שעות_מנהלה_שבועיות: formData.adminTimeSpent ? Number(formData.adminTimeSpent) : null,
        תהליך_הפקת_מסמכים: formData.documentGeneration || null,
        
        // חלק ד': מערכות ואינטגרציות
        תוכנות_נוכחיות: formData.currentSoftware.concat(formData.currentSoftwareOther ? [formData.currentSoftwareOther] : []),
        
        אוטומציות_קיימות: formData.existingAutomations || null,
        כלי_אוטומציה: formData.automationTools,
        
        // פירוט תהליך העבודה המרכזי
        פירוט_תהליך_עבודה_מרכזי: formData.mainWorkflowDetail || null,
        
        // מטרות ותכנון
        סטטוס_תקציב: formData.budgetStatus || null,
        סכום_תקציב: formData.budgetAmount ? Number(formData.budgetAmount) : null,
        פרטי_תקציב: formData.budgetDetails || null,
        מדד_הצלחה_כמותי: formData.successMetric || null,
        
        תאריך_התחלה: formData.startDate || null,
        זמן_מועדף_פגישה: formData.preferredTime ? [formData.preferredTime] : null,
        הערות_נוספות: formData.additionalComments || null
      };

      console.log('Prepared submission data:', submissionData);

      // שליחה ל-Supabase
      console.log('Attempting to insert data to Supabase...');
      const { data, error } = await supabase
        .from('profiling_form_submissions')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Supabase insertion error:', error);
        toast.error(`שגיאה בשמירת הטופס: ${error.message}`);
        return;
      }

      console.log('Form submitted successfully:', data);
      toast.success('הטופס נשלח בהצלחה!');
      setShowThankYou(true);
      
    } catch (error) {
      console.error('Unexpected error during form submission:', error);
      toast.error('שגיאה בלתי צפויה. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-navy-dark p-2 sm:p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white w-full">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="text-navy-dark hover:bg-gray-100 self-start"
                >
                  ← חזור לדף הבית
                </Button>
                <div className="flex-1 text-center">
                  <CardTitle className="text-lg sm:text-2xl text-navy-dark mb-2 sm:mb-4">
                    שאלון אפיון תהליכים עסקיים לקראת הטמעת AI
                  </CardTitle>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
                    השאלון נועד לאסוף מידע מדויק ותכני על התהליכים העסקיים בארגון שלך, כדי לבנות פתרונות AI מותאמים לצרכים הספציפיים שלכם.
                    <br />
                    מילוי השאלון צפוי לקחת 10-15 דקות.
                  </p>
                </div>
                <div className="hidden sm:block w-20"></div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                
                {/* פרטים כלליים */}
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-navy-dark">פרטי יצירת קשר</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="fullName">שם מלא *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">טלפון *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">מייל *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessField">תחום פעילות *</Label>
                      <Input
                        id="businessField"
                        value={formData.businessField}
                        onChange={(e) => handleInputChange('businessField', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </section>

                {/* פירוט תהליך העבודה המרכזי */}
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-navy-dark">פירוט תהליך העבודה המרכזי</h3>
                  <div>
                    <Label htmlFor="mainWorkflowDetail">
                      בחר את התהליך האחד שהכי גוזל ממך זמן (לדוגמה: טיפול בלידים, הכנת חומרים לשיווק, תיאום פגישות). כעת, תאר אותו שלב אחר שלב, כאילו אתה כותב מדריך לעובד חדש. תתחיל מהנקודה שבה התהליך מתחיל ותסיים בתוצאה הסופית. *
                    </Label>
                    <Textarea
                      id="mainWorkflowDetail"
                      value={formData.mainWorkflowDetail}
                      onChange={(e) => handleInputChange('mainWorkflowDetail', e.target.value)}
                      rows={8}
                      className="mt-2"
                    />
                  </div>
                </section>

                {/* חלק א': ניהול לידים ופניות נכנסות */}
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-navy-dark">חלק א': ניהול לידים ופניות נכנסות</h3>
                  <div className="space-y-6">
                    
                    <div>
                      <Label className="text-base font-medium">כמה לידים (פניות) אתם מקבלים בממוצע בחודש מכל ערוץ? *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3">
                        <div>
                          <Label htmlFor="facebook-leads">פייסבוק</Label>
                          <Input
                            id="facebook-leads"
                            type="number"
                            placeholder="מספר לידים"
                            value={formData.leadChannels.facebook}
                            onChange={(e) => handleNestedInputChange('leadChannels', 'facebook', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="whatsapp-leads">וואטסאפ</Label>
                          <Input
                            id="whatsapp-leads"
                            type="number"
                            placeholder="מספר לידים"
                            value={formData.leadChannels.whatsapp}
                            onChange={(e) => handleNestedInputChange('leadChannels', 'whatsapp', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website-leads">אתר אינטרנט</Label>
                          <Input
                            id="website-leads"
                            type="number"
                            placeholder="מספר לידים"
                            value={formData.leadChannels.website}
                            onChange={(e) => handleNestedInputChange('leadChannels', 'website', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone-leads">טלפון</Label>
                          <Input
                            id="phone-leads"
                            type="number"
                            placeholder="מספר לידים"
                            value={formData.leadChannels.phone}
                            onChange={(e) => handleNestedInputChange('leadChannels', 'phone', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="referrals-leads">הפניות</Label>
                          <Input
                            id="referrals-leads"
                            type="number"
                            placeholder="מספר לידים"
                            value={formData.leadChannels.referrals}
                            onChange={(e) => handleNestedInputChange('leadChannels', 'referrals', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="other-leads">אחר: פרט</Label>
                          <Input
                            id="other-leads"
                            type="number"
                            placeholder="מספר לידים"
                            value={formData.leadChannels.other}
                            onChange={(e) => handleNestedInputChange('leadChannels', 'other', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                      </div>
                    </div>


                    <div>
                      <Label htmlFor="leadProcessStep2">באיזו מערכת אתם רושמים את הליד? (שם המערכת בדיוק) *</Label>
                      <Input
                        id="leadProcessStep2"
                        value={formData.leadProcessStep2}
                        onChange={(e) => handleInputChange('leadProcessStep2', e.target.value)}
                        placeholder="לדוגמה: HubSpot, Excel, Monday, אין מערכת"
                      />
                    </div>

                    <div>
                      <Label htmlFor="leadProcessResponseTime">תוך כמה זמן אתם מגיבים ללידים (בממוצע)? *</Label>
                      <Select value={formData.leadProcessResponseTime} onValueChange={(value) => handleInputChange('leadProcessResponseTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="בחר זמן תגובה" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="מיידי (עד 5 דקות)">מיידי (עד 5 דקות)</SelectItem>
                          <SelectItem value="עד שעה">עד שעה</SelectItem>
                          <SelectItem value="עד 3 שעות">עד 3 שעות</SelectItem>
                          <SelectItem value="עד יום עבודה">עד יום עבודה</SelectItem>
                          <SelectItem value="מעל יום עבודה">מעל יום עבודה</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="leadFirstResponse">מה התגובה הראשונית ללידים? (הודעה אוטומטית/שיחת טלפון/הודעת וואטסאפ) *</Label>
                      <Textarea
                        id="leadFirstResponse"
                        value={formData.leadFirstResponse}
                        onChange={(e) => handleInputChange('leadFirstResponse', e.target.value)}
                        placeholder="תאר בדיוק מה קורה ברגע שליד נכנס"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="leadQualificationCriteria">איך אתם מסנים לידים? מהם הקריטריונים להגדרת ליד כ"חם" או "קר"? *</Label>
                      <Textarea
                        id="leadQualificationCriteria"
                        value={formData.leadQualificationCriteria}
                        onChange={(e) => handleInputChange('leadQualificationCriteria', e.target.value)}
                        placeholder="לדוגמה: תקציב מעל X, צורך דחוף, איזור גאוגרפי מסוים"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>באילו כלים אתם משתמשים לניהול הלידים? *</Label>
                      <div className="space-y-2 mt-2">
                        {['CRM ייעודי', 'Excel/Google Sheets', 'WhatsApp Business', 'Monday.com', 'ClickUp', 'אין כלי ניהול'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={`leadTools-${option}`}
                              checked={formData.leadManagementTools.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('leadManagementTools', option, checked as boolean)}
                            />
                            <Label htmlFor={`leadTools-${option}`}>{option}</Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id="leadTools-other"
                            checked={formData.leadManagementTools.includes('אחר')}
                            onCheckedChange={(checked) => handleCheckboxChange('leadManagementTools', 'אחר', checked as boolean)}
                          />
                          <Label htmlFor="leadTools-other">אחר:</Label>
                          <Input
                            value={formData.leadManagementToolsOther}
                            onChange={(e) => handleInputChange('leadManagementToolsOther', e.target.value)}
                            placeholder="שם הכלי"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* חלק ב': תהליכי שיווק ושמירת קשר */}
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-navy-dark">חלק ב': תהליכי שיווק ושמירת קשר</h3>
                  <div className="space-y-6">
                    
                    <div>
                      <Label>איזה סוגי תוכן אתם מייצרים? *</Label>
                      <div className="space-y-2 mt-2">
                        {['פוסטים ברשתות חברתיות', 'ניוזלטר', 'סרטוני וידאו', 'בלוג/מאמרים', 'חומרי שיווק', 'אין יצירת תוכן'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={`content-${option}`}
                              checked={formData.contentTypes.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('contentTypes', option, checked as boolean)}
                            />
                            <Label htmlFor={`content-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">כמה זמן (בדקות/שעות/ימים) בממוצע לוקח לכם להפיק כל סוג תוכן? *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3">
                        <div>
                          <Label htmlFor="posts-time">פוסט בפייסבוק/אינסטגרם</Label>
                          <Input
                            id="posts-time"
                            type="number"
                            placeholder="דקות/שעות/ימים"
                            value={formData.contentProductionTime.posts}
                            onChange={(e) => handleNestedInputChange('contentProductionTime', 'posts', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="newsletter-time">ניוזלטר</Label>
                          <Input
                            id="newsletter-time"
                            type="number"
                            placeholder="דקות/שעות/ימים"
                            value={formData.contentProductionTime.newsletter}
                            onChange={(e) => handleNestedInputChange('contentProductionTime', 'newsletter', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                        <div>
                          <Label htmlFor="videos-time">וידאו</Label>
                          <Input
                            id="videos-time"
                            type="number"
                            placeholder="דקות/שעות/ימים"
                            value={formData.contentProductionTime.videos}
                            onChange={(e) => handleNestedInputChange('contentProductionTime', 'videos', e.target.value ? parseInt(e.target.value) : '')}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="customerDatabase">כמה אנשי קשר יש לכם במאגר הלקוחות? *</Label>
                      <Input
                        id="customerDatabase"
                        type="number"
                        placeholder="מספר אנשי קשר"
                        value={formData.customerDatabase}
                        onChange={(e) => handleInputChange('customerDatabase', e.target.value ? parseInt(e.target.value) : '')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="customerDatabaseLocation">היכן מנוהל מאגר הלקוחות שלכם? (שם המערכת בדיוק) *</Label>
                      <Input
                        id="customerDatabaseLocation"
                        value={formData.customerDatabaseLocation}
                        onChange={(e) => handleInputChange('customerDatabaseLocation', e.target.value)}
                        placeholder="לדוגמה: MailChimp, Excel, CRM ספציפי"
                      />
                    </div>

                    <div>
                      <Label>איך מפולח המאגר שלכם? *</Label>
                      <div className="space-y-2 mt-2">
                        {['לקוחות עבר', 'מתעניינים פעילים', 'לידים קרים', 'לקוחות VIP', 'אין פילוח'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={`segmentation-${option}`}
                              checked={formData.customerSegmentation.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('customerSegmentation', option, checked as boolean)}
                            />
                            <Label htmlFor={`segmentation-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="followUpProcess">איך אתם מבצעים פנייה מחודשת ללקוחות עבר או למתעניינים שלא סגרו? *</Label>
                      <Textarea
                        id="followUpProcess"
                        value={formData.followUpProcess}
                        onChange={(e) => handleInputChange('followUpProcess', e.target.value)}
                        placeholder="תאר את התהליך המדויק - תדירות, אמצעים, מי אחראי"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>באילו כלים אתם משתמשים לשמירת קשר עם לקוחות? *</Label>
                      <div className="space-y-2 mt-2">
                        {['WhatsApp Business', 'מערכת דיוור (MailChimp וכו\')', 'שיחות טלפון', 'SMS', 'פגישות פיזיות', 'אין מעקב שיטתי'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={`followUpTools-${option}`}
                              checked={formData.followUpTools.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('followUpTools', option, checked as boolean)}
                            />
                            <Label htmlFor={`followUpTools-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* חלק ג': תפעול, אדמיניסטרציה וניהול משימות */}
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-navy-dark">חלק ג': תפעול, אדמיניסטרציה וניהול משימות</h3>
                  <div className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label htmlFor="weeklyMeetings">כמה פגישות אתם מתאמים בשבוע בממוצע? *</Label>
                        <Input
                          id="weeklyMeetings"
                          type="number"
                          placeholder="מספר פגישות"
                          value={formData.weeklyMeetings}
                          onChange={(e) => handleInputChange('weeklyMeetings', e.target.value ? parseInt(e.target.value) : '')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="remindersSent">כמה תזכורות אתם שולחים בשבוע בממוצע? *</Label>
                        <Input
                          id="remindersSent"
                          type="number"
                          placeholder="מספר תזכורות"
                          value={formData.remindersSent}
                          onChange={(e) => handleInputChange('remindersSent', e.target.value ? parseInt(e.target.value) : '')}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="meetingSchedulingProcess">מה התהליך המדויק לתיאום פגישה אצלכם? *</Label>
                      <Textarea
                        id="meetingSchedulingProcess"
                        value={formData.meetingSchedulingProcess}
                        onChange={(e) => handleInputChange('meetingSchedulingProcess', e.target.value)}
                        placeholder="תאר בדיוק: מי מתאם, איך בודקים זמינות, איך מוודאים, איך מזכירים"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>אילו משימות אדמיניסטרטיביות חוזרות על עצמן אצלכם? *</Label>
                      <div className="space-y-2 mt-2">
                        {['הפקת הצעות מחיר', 'הכנת דוחות', 'עדכון מלאי', 'שליחת חשבוניות', 'איסוף נתונים ללקוחות', 'עדכון מערכות'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={`recurring-${option}`}
                              checked={formData.recurringTasks.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('recurringTasks', option, checked as boolean)}
                            />
                            <Label htmlFor={`recurring-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="adminTimeSpent">כמה שעות עבודה בשבוע אתם מעריכים שמתבזבזות על מנהלה ומשימות חוזרות? *</Label>
                      <Input
                        id="adminTimeSpent"
                        type="number"
                        placeholder="שעות בשבוע"
                        value={formData.adminTimeSpent}
                        onChange={(e) => handleInputChange('adminTimeSpent', e.target.value ? parseInt(e.target.value) : '')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="documentGeneration">איך אתם מפיקים מסמכים (הצעות מחיר, חוזים, דוחות)? *</Label>
                      <Textarea
                        id="documentGeneration"
                        value={formData.documentGeneration}
                        onChange={(e) => handleInputChange('documentGeneration', e.target.value)}
                        placeholder="תאר את התהליך: תבניות, מי מכין, כמה זמן לוקח"
                        rows={3}
                      />
                    </div>
                  </div>
                </section>

                {/* חלק ד': מערכות קיימות ואינטגרציות */}
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-navy-dark">חלק ד': מערכות קיימות ואינטגרציות</h3>
                  <div className="space-y-6">
                    
                    <div>
                      <Label>באילו תוכנות ומערכות אתם משתמשים? (ציין שמות מדויקים) *</Label>
                      <div className="space-y-2 mt-2">
                        {['Monday.com', 'HubSpot', 'Salesforce', 'ClickUp', 'Slack', 'Microsoft 365', 'Google Workspace', 'Zoom', 'WhatsApp Business'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={`software-${option}`}
                              checked={formData.currentSoftware.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('currentSoftware', option, checked as boolean)}
                            />
                            <Label htmlFor={`software-${option}`}>{option}</Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id="software-other"
                            checked={formData.currentSoftware.includes('אחר')}
                            onCheckedChange={(checked) => handleCheckboxChange('currentSoftware', 'אחר', checked as boolean)}
                          />
                          <Label htmlFor="software-other">אחר:</Label>
                          <Input
                            value={formData.currentSoftwareOther}
                            onChange={(e) => handleInputChange('currentSoftwareOther', e.target.value)}
                            placeholder="שם התוכנה/מערכת"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>


                    <div>
                      <Label htmlFor="existingAutomations">האם יש לכם כיום אוטומציות (Zapier, Make, או אוטומציה אחרת)? אם כן, מה הן עושות? *</Label>
                      <Textarea
                        id="existingAutomations"
                        value={formData.existingAutomations}
                        onChange={(e) => handleInputChange('existingAutomations', e.target.value)}
                        placeholder="תאר בקצרה אילו אוטומציות יש ומה הן מבצעות"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>באילו כלי אוטומציה אתם מכירים או משתמשים? *</Label>
                      <div className="space-y-2 mt-2">
                        {['Zapier', 'Microsoft Power Automate', 'Make (לשעבר Integromat)', 'IFTTT', 'n8n', 'אוטומציות מובנות במערכות', 'לא מכיר'].map((option) => (
                          <div key={option} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={`automation-${option}`}
                              checked={formData.automationTools.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('automationTools', option, checked as boolean)}
                            />
                            <Label htmlFor={`automation-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* מטרות ותכנון */}
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-navy-dark">מטרות ותכנון</h3>
                  <div className="space-y-6">
                    
                    <div>
                      <Label>האם יש תקציב ראשוני לתהליך? *</Label>
                      <RadioGroup
                        value={formData.budgetStatus}
                        onValueChange={(value) => handleInputChange('budgetStatus', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center gap-2 flex-row-reverse">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="budget-yes" className="cursor-pointer">כן</Label>
                            {formData.budgetStatus === 'כן' && (
                              <Input
                                type="number"
                                value={formData.budgetAmount}
                                onChange={(e) => handleInputChange('budgetAmount', e.target.value ? parseInt(e.target.value) : '')}
                                placeholder="סכום בש״ח"
                                className="w-32"
                              />
                            )}
                          </div>
                          <RadioGroupItem value="כן" id="budget-yes" />
                        </div>
                        <div className="flex items-center gap-2 flex-row-reverse">
                          <Label htmlFor="budget-willing" className="cursor-pointer">לא אך יש נכונות</Label>
                          <RadioGroupItem value="לא אך יש נכונות" id="budget-willing" />
                        </div>
                        <div className="flex items-center gap-2 flex-row-reverse">
                          <Label htmlFor="budget-help" className="cursor-pointer">דרוש סיוע</Label>
                          <RadioGroupItem value="דרוש סיוע" id="budget-help" />
                        </div>
                      </RadioGroup>
                      
                      {formData.budgetStatus === 'כן' && (
                        <div className="mt-4 border-t pt-4">
                          <Label htmlFor="budgetDetails" className="text-base font-medium">פרטי התקציב *</Label>
                          <Textarea
                            id="budgetDetails"
                            value={formData.budgetDetails}
                            onChange={(e) => handleInputChange('budgetDetails', e.target.value)}
                            placeholder="אנא פרט על התקציב הזמין - סכום בש״ח, מקור התקציב, מגבלות זמן, תנאים מיוחדים"
                            rows={4}
                            className="mt-2"
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="successMetric">מהו המדד הכמותי האחד שהצלחת התהליך תימדד לפיו? תהיה מדויק ככל האפשר. המטרה היא להגדיר יעד ברור שנוכל למדוד לפני ואחרי ההטמעה. *</Label>
                      <Textarea
                        id="successMetric"
                        value={formData.successMetric}
                        onChange={(e) => handleInputChange('successMetric', e.target.value)}
                        placeholder="לדוגמה: להגדיל את כמות הפניות האיכותיות ב-25%, לחסוך 8 שעות עבודה שבועיות על תפעול, לקצר את זמן המענה הראשוני לליד ל-5 דקות, להפחית את כמות הפגישות המבוטלות ב-40%."
                        required
                        className="mt-2"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label htmlFor="startDate">מתי נוח לכם להתחיל את התהליך? *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">זמן מועדף לפגישת אפיון *</Label>
                        <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר זמן מועדף" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="בוקר">בוקר (9:00-12:00)</SelectItem>
                            <SelectItem value="צהריים">צהריים (12:00-16:00)</SelectItem>
                            <SelectItem value="ערב">ערב (16:00-20:00)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="additionalComments">הערות נוספות או מידע שחשוב לכם לשתף</Label>
                      <Textarea
                        id="additionalComments"
                        value={formData.additionalComments}
                        onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </section>

                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-blue-primary hover:bg-blue-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'שולח...' : 'שלח טופס'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={showThankYou} onOpenChange={setShowThankYou}>
        <AlertDialogContent className="text-center" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-navy-dark">
              תודה על מילוי הפרטים!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              נציג ייצור קשר בקרוב לתיאום פגישת אפיון מפורטת
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={handleCloseThankYou} className="bg-blue-primary hover:bg-blue-primary/90">
            סגור
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrganizationProfilingForm;