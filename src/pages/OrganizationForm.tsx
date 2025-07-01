
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import DigitalSignature from "@/components/DigitalSignature";

const OrganizationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Basic Details
    organizationName: '',
    contactPerson: '',
    position: '',
    email: '',
    phone: '',
    employeeCount: '',
    industry: '',
    
    // Organization Activity and Current Challenges
    organizationActivity: '',
    targetAudience: [],
    mainChallenges: '',
    
    // AI Implementation Goals
    aiGoals: [],
    specificNeeds: '',
    timelineExpectation: '',
    budgetRange: '',
    successMetrics: '',
    
    // Current Infrastructure and Technical Requirements
    currentSystems: [],
    dataTypes: '',
    securityRequirements: '',
    integrationNeeds: '',
    
    // Additional Information
    additionalInfo: '',
    consultationDate: null,
    signature: '',
    signatureDate: new Date()
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean | string) => {
    const isChecked = checked === true;
    setFormData(prev => ({
      ...prev,
      [field]: isChecked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.organizationName || !formData.contactPerson || !formData.email) {
      toast({
        title: "שגיאה",
        description: "נא למלא את כל השדות החובה",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "שגיאה",
        description: "נא להזין כתובת מייל תקינה",
        variant: "destructive",
      });
      return;
    }

    // Phone validation
    if (formData.phone && formData.phone.length < 10) {
      toast({
        title: "שגיאה",
        description: "נא להזין מספר טלפון תקין",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Form Data:', formData);
      
      toast({
        title: "הטופס נשלח בהצלחה!",
        description: "נחזור אליך בהקדם עם המלצות מותאמות אישית",
      });
      
      // Reset form
      setFormData({
        organizationName: '',
        contactPerson: '',
        position: '',
        email: '',
        phone: '',
        employeeCount: '',
        industry: '',
        organizationActivity: '',
        targetAudience: [],
        mainChallenges: '',
        aiGoals: [],
        specificNeeds: '',
        timelineExpectation: '',
        budgetRange: '',
        successMetrics: '',
        currentSystems: [],
        dataTypes: '',
        securityRequirements: '',
        integrationNeeds: '',
        additionalInfo: '',
        consultationDate: null,
        signature: '',
        signatureDate: new Date()
      });
    } catch (error) {
      toast({
        title: "תקלה בשליחת הטופס",
        description: "אנא נסה שוב או צור קשר ישירות",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-navy-light border-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white font-heebo mb-4">
              🤖 שאלון איפיון לארגון להטמעת AI במארגון
            </CardTitle>
            <p className="text-gray-300 font-heebo leading-relaxed">
              שאלון זה נועד לעזור לנו להבין את הצרכים הייחודיים של הארגון שלך ולהתאמת פתרונות הטמעת AI
              באופן מדויק. מילוי השאלון צפוי לקחת 7-10 דקות בלבד.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit}>
              {/* פרטים כלליים */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 פרטים כלליים
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white font-heebo mb-2 block">שם הארגון: *</Label>
                    <Input
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      className="bg-navy-dark text-white border-gold/30"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white font-heebo mb-2 block">איש הקשר: *</Label>
                    <Input
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="bg-navy-dark text-white border-gold/30"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white font-heebo mb-2 block">תפקיד:</Label>
                    <Input
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="bg-navy-dark text-white border-gold/30"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white font-heebo mb-2 block">כתובת מייל: *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-navy-dark text-white border-gold/30"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white font-heebo mb-2 block">מספר טלפון:</Label>
                    <PhoneNumberInput
                      value={formData.phone}
                      onChange={(value) => handleInputChange('phone', value)}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white font-heebo mb-2 block">מספר עובדים (משוער):</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.employeeCount}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      className="bg-navy-dark text-white border-gold/30"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-2 block">תחום פעילות:</Label>
                  <Input
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                  />
                </div>
              </div>

              {/* פעילות הארגון ואתגרים נוכחיים */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 פעילות הארגון ואתגרים נוכחיים
                </h3>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    איך הייתם מגדירים את הפעילות של הארגון שלכם?
                  </Label>
                  <Textarea
                    value={formData.organizationActivity}
                    onChange={(e) => handleInputChange('organizationActivity', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    מי הקהל הגדול של הארגון שלכם?
                  </Label>
                  <div className="space-y-2">
                    {['סטארט-אפים', 'חברות בינוניות', 'תאגידים גדולים', 'מוסדות ציבור', 'ארגונים ללא כוונת רווח', 'עצמאיים', 'אחר'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`audience-${option}`}
                          checked={formData.targetAudience.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange('targetAudience', option, checked)}
                        />
                        <Label htmlFor={`audience-${option}`} className="text-white font-heebo">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    מהם האתגרים הגדולים שהארגון שלכם מתמודד איתם כיום?
                  </Label>
                  <Textarea
                    value={formData.mainChallenges}
                    onChange={(e) => handleInputChange('mainChallenges', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
              </div>

              {/* מטרות הטמעת AI בארגון */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 מטרות הטמעת AI בארגון
                </h3>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    מה המטרה העיקרית שלכם מהטמעת AI? (ניתן לבחור כמה תשובות)
                  </Label>
                  <div className="space-y-2">
                    {['חיסכון בעלויות', 'שיפור היעילות', 'שיפור שירות הלקוחות', 'אוטומציה של תהליכים', 'יצירת תובנות עסקיות', 'שיפור קבלת החלטות', 'המצאת שירותים חדשים'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`goals-${option}`}
                          checked={formData.aiGoals.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange('aiGoals', option, checked)}
                        />
                        <Label htmlFor={`goals-${option}`} className="text-white font-heebo">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    האם יש לכם צרכים ספציפיים או תחומים מסוימים שתרצו לשפר?
                  </Label>
                  <Textarea
                    value={formData.specificNeeds}
                    onChange={(e) => handleInputChange('specificNeeds', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    מה לוח הזמנים הרצוי להטמעה?
                  </Label>
                  <RadioGroup
                    value={formData.timelineExpectation}
                    onValueChange={(value) => handleInputChange('timelineExpectation', value)}
                    className="space-y-2"
                  >
                    {['עד חודש', '1-3 חודשים', '3-6 חודשים', '6-12 חודשים', 'מעל שנה'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value={option} id={`timeline-${option}`} />
                        <Label htmlFor={`timeline-${option}`} className="text-white font-heebo">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    מה התקציב המשוער להטמעה?
                  </Label>
                  <RadioGroup
                    value={formData.budgetRange}
                    onValueChange={(value) => handleInputChange('budgetRange', value)}
                    className="space-y-2"
                  >
                    {['עד 10,000 ₪', '10,000-50,000 ₪', '50,000-100,000 ₪', '100,000-500,000 ₪', 'מעל 500,000 ₪'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value={option} id={`budget-${option}`} />
                        <Label htmlFor={`budget-${option}`} className="text-white font-heebo">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    איך תמדדו הצלחה? אילו מדדים חשובים לכם?
                  </Label>
                  <Textarea
                    value={formData.successMetrics}
                    onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
              </div>

              {/* תשתית וחוקרים קיימים */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 תשתית וחוקרים קיימים
                </h3>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    באילו מערכות אתם משתמשים כיום? (ניתן לבחור כמה תשובות)
                  </Label>
                  <div className="space-y-2">
                    {['ERP', 'CRM', 'מערכת Helpdesk', 'לוח בקרה', 'מערכת הנהלת חשבונות', 'גוגל / אופיס / מיקרוסופט / אחר', 'מערכת אחרת'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`systems-${option}`}
                          checked={formData.currentSystems.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange('currentSystems', option, checked)}
                        />
                        <Label htmlFor={`systems-${option}`} className="text-white font-heebo">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    באיזה סוג מידע הארגון עובד עם? (למשל: נתונים פיננסיים, מידע לקוחות, מסמכים, תמונות וכו')
                  </Label>
                  <Textarea
                    value={formData.dataTypes}
                    onChange={(e) => handleInputChange('dataTypes', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    מה רמת הביטחון הנדרשת לכם?
                  </Label>
                  <Input
                    value={formData.securityRequirements}
                    onChange={(e) => handleInputChange('securityRequirements', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                  />
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    האם תרצו להתחבר למערכות קיימות? אם כן, אילו?
                  </Label>
                  <Textarea
                    value={formData.integrationNeeds}
                    onChange={(e) => handleInputChange('integrationNeeds', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
              </div>

              {/* מידע נוסף */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 מידע נוסף
                </h3>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    האם יש עוד דבר שחשוב לכם לציין עם השימוש?
                  </Label>
                  <Textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={4}
                  />
                </div>
              </div>

              {/* תאריך וחתימה */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white font-heebo mb-3 block">
                      תאריך לייעוץ רצוי:
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-right font-normal bg-navy-dark text-white border-gold/30",
                            !formData.consultationDate && "text-gray-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.consultationDate ? format(formData.consultationDate, "PPP") : "בחר תאריך"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.consultationDate}
                          onSelect={(date) => handleInputChange('consultationDate', date)}
                          initialFocus
                          className="bg-navy-light text-white border-gold/30"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    אימות/חתימה דיגיטלית:
                  </Label>
                  <DigitalSignature
                    onSignatureChange={(signature) => handleInputChange('signature', signature)}
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-gray-300 font-heebo mb-4">
                    המידע שסופק ישמש לצורך הכנת הצעת מחיר מותאמת אישית ולא יועבר לגורמים חיצוניים.
                  </p>
                  <div className="flex justify-center space-x-4 space-x-reverse">
                    <span className="text-white font-heebo">תאריך: ______</span>
                    <span className="text-white font-heebo">חתימה: ______</span>
                    <span className="text-white font-heebo">שם מלא: ______</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-blue-primary hover:bg-blue-primary/90 text-white px-12 py-4 text-xl font-heebo font-medium rounded-lg"
                >
                  שלח טופס
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationForm;
