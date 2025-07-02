
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface FormData {
  // פרטים כלליים
  fullName: string;
  phone: string;
  email: string;
  businessField: string;
  position: string;
  organizationName: string;
  employeeCount: number | '';
  geographicArea: string;
  yearsActive: number | '';
  
  // פעילות הארגון ואתגרים מרכזיים
  organizationActivity: string;
  targetAudience: string[];
  targetAudienceOther: string;
  mainServices: string;
  mainChallenges: string;
  
  // תהליכים קיימים ומערכות
  mainDepartments: string[];
  mainDepartmentsOther: string;
  digitalSystems: string[];
  digitalSystemsOther: string;
  inefficientProcesses: string;
  aiOptimizationGoals: string;
  
  // רמת היכרות, ניסיון ומוכנות ל-AI
  aiKnowledgeLevel: string;
  aiUsageDetails: string;
  aiTrainingHistory: string;
  aiToolsUsed: string[];
  aiToolsUsedOther: string;
  
  // מטרות וציפיות מהתהליך
  aiImplementationGoals: string[];
  aiImplementationGoalsOther: string;
  successMetrics: string;
  budgetStatus: string;
  budgetAmount: number | '';
  processLeader: string;
  
  // השראה ותחומים לפיילוט
  inspiration: string;
  pilotAreas: string[];
  pilotAreasOther: string;
  startDate: string;
  
  // לסיום
  additionalComments: string;
}

const OrganizationProfilingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    businessField: '',
    position: '',
    organizationName: '',
    employeeCount: '',
    geographicArea: '',
    yearsActive: '',
    organizationActivity: '',
    targetAudience: [],
    targetAudienceOther: '',
    mainServices: '',
    mainChallenges: '',
    mainDepartments: [],
    mainDepartmentsOther: '',
    digitalSystems: [],
    digitalSystemsOther: '',
    inefficientProcesses: '',
    aiOptimizationGoals: '',
    aiKnowledgeLevel: '',
    aiUsageDetails: '',
    aiTrainingHistory: '',
    aiToolsUsed: [],
    aiToolsUsedOther: '',
    aiImplementationGoals: [],
    aiImplementationGoalsOther: '',
    successMetrics: '',
    budgetStatus: '',
    budgetAmount: '',
    processLeader: '',
    inspiration: '',
    pilotAreas: [],
    pilotAreasOther: '',
    startDate: '',
    additionalComments: ''
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      handleInputChange(field, [...currentArray, value]);
    } else {
      handleInputChange(field, currentArray.filter(item => item !== value));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'fullName', 'phone', 'email', 'businessField', 'mainServices', 'mainChallenges', 'startDate'
    ];
    
    const requiredArrayFields = [
      'targetAudience', 'mainDepartments', 'digitalSystems', 'aiToolsUsed', 'aiImplementationGoals'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast.error(`השדה "${field}" הוא חובה`);
        return false;
      }
    }

    for (const field of requiredArrayFields) {
      const arrayValue = formData[field as keyof FormData] as string[];
      if (!arrayValue || arrayValue.length === 0) {
        toast.error(`יש לבחור לפחות אפשרות אחת בשדה "${field}"`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      toast.success('הטופס נשלח בהצלחה!');
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-navy-dark">
              טופס איפיון לארגון להטמעת AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* פרטים כלליים */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-navy-dark">1. פרטים כלליים</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="position">תפקיד בארגון</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizationName">שם הארגון</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeCount">מספר עובדים (משוער)</Label>
                    <Input
                      id="employeeCount"
                      type="number"
                      value={formData.employeeCount}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value ? parseInt(e.target.value) : '')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="geographicArea">אזור פעילות גאוגרפי</Label>
                    <Input
                      id="geographicArea"
                      value={formData.geographicArea}
                      onChange={(e) => handleInputChange('geographicArea', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsActive">שנות פעילות</Label>
                    <Input
                      id="yearsActive"
                      type="number"
                      value={formData.yearsActive}
                      onChange={(e) => handleInputChange('yearsActive', e.target.value ? parseInt(e.target.value) : '')}
                    />
                  </div>
                </div>
              </section>

              {/* פעילות הארגון ואתגרים מרכזיים */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-navy-dark">2. פעילות הארגון ואתגרים מרכזיים</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="organizationActivity">תאר בקצרה את הפעילות של הארגון</Label>
                    <Textarea
                      id="organizationActivity"
                      value={formData.organizationActivity}
                      onChange={(e) => handleInputChange('organizationActivity', e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label>מהם קהלי היעד המרכזיים שלכם? *</Label>
                    <div className="space-y-2 mt-2">
                      {['לקוחות פרטיים', 'עסקים', 'מוסדות / ציבורי'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`targetAudience-${option}`}
                            checked={formData.targetAudience.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange('targetAudience', option, checked as boolean)}
                          />
                          <Label htmlFor={`targetAudience-${option}`}>{option}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="targetAudience-other"
                          checked={formData.targetAudience.includes('אחר')}
                          onCheckedChange={(checked) => handleCheckboxChange('targetAudience', 'אחר', checked as boolean)}
                        />
                        <Label htmlFor="targetAudience-other">אחר:</Label>
                        <Input
                          value={formData.targetAudienceOther}
                          onChange={(e) => handleInputChange('targetAudienceOther', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mainServices">מהם השירותים / המוצרים המרכזיים שאתם מציעים *</Label>
                    <Textarea
                      id="mainServices"
                      value={formData.mainServices}
                      onChange={(e) => handleInputChange('mainServices', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="mainChallenges">מהם האתגרים המרכזיים שאתם מתמודדים איתם כיום בתהליכי העבודה או בשירות *</Label>
                    <Textarea
                      id="mainChallenges"
                      value={formData.mainChallenges}
                      onChange={(e) => handleInputChange('mainChallenges', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* תהליכים קיימים ומערכות */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-navy-dark">3. תהליכים קיימים ומערכות</h3>
                <div className="space-y-4">
                  <div>
                    <Label>אילו מחלקות עיקריות פועלות אצלכם? *</Label>
                    <div className="space-y-2 mt-2">
                      {['שיווק', 'שירות לקוחות', 'מכירות', 'כספים', 'תפעול', 'BI / דאטה', 'פיתוח / מוצר', 'משאבי אנוש'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mainDepartments-${option}`}
                            checked={formData.mainDepartments.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange('mainDepartments', option, checked as boolean)}
                          />
                          <Label htmlFor={`mainDepartments-${option}`}>{option}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mainDepartments-other"
                          checked={formData.mainDepartments.includes('אחר')}
                          onCheckedChange={(checked) => handleCheckboxChange('mainDepartments', 'אחר', checked as boolean)}
                        />
                        <Label htmlFor="mainDepartments-other">אחר:</Label>
                        <Input
                          value={formData.mainDepartmentsOther}
                          onChange={(e) => handleInputChange('mainDepartmentsOther', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>באילו מערכות / כלים דיגיטליים אתם משתמשים כיום? *</Label>
                    <div className="space-y-2 mt-2">
                      {['CRM', 'ERP', 'מערכת Helpdesk / צ\'אט', 'BI', 'כלי דיוור', 'Zapier / Make'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`digitalSystems-${option}`}
                            checked={formData.digitalSystems.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange('digitalSystems', option, checked as boolean)}
                          />
                          <Label htmlFor={`digitalSystems-${option}`}>{option}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="digitalSystems-other"
                          checked={formData.digitalSystems.includes('אחר')}
                          onCheckedChange={(checked) => handleCheckboxChange('digitalSystems', 'אחר', checked as boolean)}
                        />
                        <Label htmlFor="digitalSystems-other">אחר:</Label>
                        <Input
                          value={formData.digitalSystemsOther}
                          onChange={(e) => handleInputChange('digitalSystemsOther', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inefficientProcesses">אילו תהליכים כיום מתבצעים בצורה לא יעילה / ידנית / גוזלת זמן</Label>
                    <Textarea
                      id="inefficientProcesses"
                      value={formData.inefficientProcesses}
                      onChange={(e) => handleInputChange('inefficientProcesses', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="aiOptimizationGoals">אילו משימות היית רוצה לייעל או להוריד מהשולחן באמצעות AI</Label>
                    <Textarea
                      id="aiOptimizationGoals"
                      value={formData.aiOptimizationGoals}
                      onChange={(e) => handleInputChange('aiOptimizationGoals', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </section>

              {/* רמת היכרות, ניסיון ומוכנות ל-AI */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-navy-dark">4. רמת היכרות, ניסיון ומוכנות ל-AI</h3>
                <div className="space-y-4">
                  <div>
                    <Label>עד כמה העובדים/המנהלים בארגון מכירים או משתמשים בכלי AI?</Label>
                    <RadioGroup
                      value={formData.aiKnowledgeLevel}
                      onValueChange={(value) => handleInputChange('aiKnowledgeLevel', value)}
                      className="mt-2"
                    >
                      {['אין ידע כלל', 'שמעו אך לא משתמשים', 'משתמשים בסיסיים', 'מתקדמים', 'מומחים פנימיים'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`aiKnowledge-${option}`} />
                          <Label htmlFor={`aiKnowledge-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="aiUsageDetails">אם יש שימוש – ציין שם, תפקיד, תחום עיסוק</Label>
                    <Textarea
                      id="aiUsageDetails"
                      value={formData.aiUsageDetails}
                      onChange={(e) => handleInputChange('aiUsageDetails', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>האם התקיימו הכשרות / סדנאות בתחום ה-AI בארגון?</Label>
                    <RadioGroup
                      value={formData.aiTrainingHistory}
                      onValueChange={(value) => handleInputChange('aiTrainingHistory', value)}
                      className="mt-2"
                    >
                      {['כן', 'לא', 'יש עניין'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`aiTraining-${option}`} />
                          <Label htmlFor={`aiTraining-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>אילו סוגי כלים מבוססי AI אתם מכירים / משתמשים בפועל? *</Label>
                    <div className="space-y-2 mt-2">
                      {['טקסט', 'BI', 'תמונה/וידאו', 'כתיבה שיווקית', 'אוטומציה', 'אין שימוש'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`aiTools-${option}`}
                            checked={formData.aiToolsUsed.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange('aiToolsUsed', option, checked as boolean)}
                          />
                          <Label htmlFor={`aiTools-${option}`}>{option}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="aiTools-other"
                          checked={formData.aiToolsUsed.includes('אחר')}
                          onCheckedChange={(checked) => handleCheckboxChange('aiToolsUsed', 'אחר', checked as boolean)}
                        />
                        <Label htmlFor="aiTools-other">אחר:</Label>
                        <Input
                          value={formData.aiToolsUsedOther}
                          onChange={(e) => handleInputChange('aiToolsUsedOther', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* מטרות וציפיות מהתהליך */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-navy-dark">5. מטרות וציפיות מהתהליך</h3>
                <div className="space-y-4">
                  <div>
                    <Label>מה הייתם רוצים להשיג מהטמעת AI בארגון? *</Label>
                    <div className="space-y-2 mt-2">
                      {['חיסכון בזמן', 'חיסכון בכוח אדם', 'ייעול', 'שירות', 'שיווק', 'ניתוח נתונים', 'יצירת תוכן'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`aiGoals-${option}`}
                            checked={formData.aiImplementationGoals.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange('aiImplementationGoals', option, checked as boolean)}
                          />
                          <Label htmlFor={`aiGoals-${option}`}>{option}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="aiGoals-other"
                          checked={formData.aiImplementationGoals.includes('אחר')}
                          onCheckedChange={(checked) => handleCheckboxChange('aiImplementationGoals', 'אחר', checked as boolean)}
                        />
                        <Label htmlFor="aiGoals-other">אחר:</Label>
                        <Input
                          value={formData.aiImplementationGoalsOther}
                          onChange={(e) => handleInputChange('aiImplementationGoalsOther', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="successMetrics">איך תדעו שהתהליך הצליח? מהם המדדים להצלחה מבחינתכם</Label>
                    <Textarea
                      id="successMetrics"
                      value={formData.successMetrics}
                      onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>האם יש תקציב ראשוני לתהליך?</Label>
                    <RadioGroup
                      value={formData.budgetStatus}
                      onValueChange={(value) => handleInputChange('budgetStatus', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="כן" id="budget-yes" />
                        <Label htmlFor="budget-yes">כן</Label>
                        {formData.budgetStatus === 'כן' && (
                          <Input
                            type="number"
                            value={formData.budgetAmount}
                            onChange={(e) => handleInputChange('budgetAmount', e.target.value ? parseInt(e.target.value) : '')}
                            placeholder="סכום בש״ח"
                            className="mr-2"
                          />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="לא אך יש נכונות" id="budget-willing" />
                        <Label htmlFor="budget-willing">לא אך יש נכונות</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="דרוש סיוע" id="budget-help" />
                        <Label htmlFor="budget-help">דרוש סיוע</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="processLeader">מי יוביל את התהליך מטעמכם? נא לציין שם, תפקיד ורמת טכנולוגית</Label>
                    <Textarea
                      id="processLeader"
                      value={formData.processLeader}
                      onChange={(e) => handleInputChange('processLeader', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </section>

              {/* השראה ותחומים לפיילוט */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-navy-dark">6. השראה ותחומים לפיילוט</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="inspiration">האם ראיתם פתרונות טכנולוגיים או תהליכים בארגונים אחרים שהייתם רוצים לבדוק גם אצלכם</Label>
                    <Textarea
                      id="inspiration"
                      value={formData.inspiration}
                      onChange={(e) => handleInputChange('inspiration', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>באילו תחומים נראה לכם שכדאי להתחיל פיילוט?</Label>
                    <div className="space-y-2 mt-2">
                      {['שירות לקוחות', 'המלצות', 'שיווק', 'BI', 'יצירת תוכן', 'מסמכים'].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`pilot-${option}`}
                            checked={formData.pilotAreas.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange('pilotAreas', option, checked as boolean)}
                          />
                          <Label htmlFor={`pilot-${option}`}>{option}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pilot-other"
                          checked={formData.pilotAreas.includes('אחר')}
                          onCheckedChange={(checked) => handleCheckboxChange('pilotAreas', 'אחר', checked as boolean)}
                        />
                        <Label htmlFor="pilot-other">אחר:</Label>
                        <Input
                          value={formData.pilotAreasOther}
                          onChange={(e) => handleInputChange('pilotAreasOther', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="startDate">מתי נוח לכם להתחיל את התהליך *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* לסיום */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-navy-dark">7. לסיום</h3>
                <div>
                  <Label htmlFor="additionalComments">האם יש משהו נוסף שתרצו לשתף, לציין או לשאול לפני שנתחיל</Label>
                  <Textarea
                    id="additionalComments"
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                    rows={4}
                  />
                </div>
              </section>

              <div className="flex justify-center pt-6">
                <Button type="submit" size="lg" className="bg-blue-primary hover:bg-blue-primary/90">
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

export default OrganizationProfilingForm;
