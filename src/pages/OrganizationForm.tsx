import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
    
    // Current Technology Status
    currentTech: [],
    techChallenges: '',
    budgetRange: '',
    implementationTimeline: '',
    
    // AI Implementation Goals
    aiGoals: [],
    specificNeeds: '',
    expectedROI: '',
    keyMetrics: '',
    
    // Technical Requirements
    integrationNeeds: [],
    dataTypes: '',
    securityRequirements: '',
    complianceNeeds: '',
    
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

    try {
      // Here you would integrate with Google Sheets API
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
        currentTech: [],
        techChallenges: '',
        budgetRange: '',
        implementationTimeline: '',
        aiGoals: [],
        specificNeeds: '',
        expectedROI: '',
        keyMetrics: '',
        integrationNeeds: [],
        dataTypes: '',
        securityRequirements: '',
        complianceNeeds: '',
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
              באופן מדויק. אמצעותו נוכל לקבוע את המסגרת התקנית של הארגון שלך ולהציע מומחיות טכנולוגית מותאמת.
              מילוי השאלון צפוי לקחת 10-7 דקות בלבד.
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
                    <Label className="text-white font-heebo mb-2 block">שם הארגון:</Label>
                    <Input
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      className="bg-navy-dark text-white border-gold/30"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white font-heebo mb-2 block">איש הקשר:</Label>
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
                    <Label className="text-white font-heebo mb-2 block">כתובת מייל:</Label>
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
                    1. מה הגדרת את הפעילות של הארגון?
                  </Label>
                  <Textarea
                    value={formData.techChallenges}
                    onChange={(e) => handleInputChange('techChallenges', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    2. מתי קולית הגדולים של הארגון שלכם?
                  </Label>
                  <div className="space-y-2">
                    {['סטארט-אפים', 'חברות בינוניות', 'תאגידים גדולים', 'מוסדות ציבור', 'ארגונים ללא כוונת רווח', 'עצמאיים', 'אחר'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`budget-${option}`}
                          checked={formData.currentTech.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange('currentTech', option, checked)}
                        />
                        <Label htmlFor={`budget-${option}`} className="text-white font-heebo">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* מטרת יציאת AI בארגון */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 מטרת יציאת AI בארגון
                </h3>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    12. מה הזמן לוקח לכם לבצע דוח מכירות בדרך כלל חזרה הראשון? צליזה הגיע זמן לאחד:
                  </Label>
                  <div className="space-y-2">
                    {['הסצמן הגדרות', 'חזרה נוכחיים', 'יבוא נוכחיים', 'צרוות לוקעים', 'יבוא סצקעים', 'צרכת הפקיעים', 'צרכת החטקיעים'].map((option) => (
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
                    13. אך תיש בהגדרת? איזה הדל המדוע לאחקעים לכל תחקצעיק?
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
                    14. הצע הדבר התיצית הפעילית יחסת?
                  </Label>
                  <Input
                    value={formData.expectedROI}
                    onChange={(e) => handleInputChange('expectedROI', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                  />
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    15. מה יבטיח הצלתו הארגון עם לוקרט לצרך חוצע טיסר כעסווח?
                  </Label>
                  <Textarea
                    value={formData.keyMetrics}
                    onChange={(e) => handleInputChange('keyMetrics', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                    rows={3}
                  />
                </div>
              </div>

              {/* תשתית וחתיעתיים קיימיים */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 תשתית וחתיעתיים קיימיים
                </h3>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    16. האם אתם מפטרתם סנתביעיל על הגרמל פסק הבאירגן והבם יער אחר עם סצייויות הרים לפגרכם אטלטיום:
                  </Label>
                  <div className="space-y-2">
                    {['ERP', 'CRM', 'הוכרבת Helpdesk', 'לוח בל', 'וכח הדביר', 'גכים / נכירי / סטטר / לוטם', 'דטר', 'אחדים'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`integration-${option}`}
                          checked={formData.integrationNeeds.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange('integrationNeeds', option, checked)}
                        />
                        <Label htmlFor={`integration-${option}`} className="text-white font-heebo">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    17. באירק החתונים בארכת עם נצרך אלים אדרכת הטרכנות פיסטרות:
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
                    18. מה ללכת חתיירת את הדשתיך?
                  </Label>
                  <Input
                    value={formData.securityRequirements}
                    onChange={(e) => handleInputChange('securityRequirements', e.target.value)}
                    className="bg-navy-dark text-white border-gold/30"
                  />
                </div>
              </div>

              {/* לטיחים */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
                  🔹 לטיחים
                </h3>
                
                <div>
                  <Label className="text-white font-heebo mb-3 block">
                    19. האם יש לטיר גווים רוסרישי לצליש עם השטות?
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
                    העיבוד ציפוינויות ודצוכן /ירי היכולרוו התכצרוה, ברית היבניעם, הלוכולן הבינוניעם
                    צרוים מתולצע בנעים רחצות בו מצגונה רעמונו.
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
