
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "@/hooks/useOrganizationForm";

interface AIGoalsSectionProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
  onCheckboxChange: (field: string, value: string, checked: boolean | string) => void;
}

const AIGoalsSection = ({ formData, onInputChange, onCheckboxChange }: AIGoalsSectionProps) => {
  const aiGoalsOptions = [
    'חיסכון בעלויות', 'שיפור היעילות', 'שיפור שירות הלקוחות', 
    'אוטומציה של תהליכים', 'יצירת תובנות עסקיות', 'שיפור קבלת החלטות', 
    'המצאת שירותים חדשים'
  ];

  const timelineOptions = ['עד חודש', '1-3 חודשים', '3-6 חודשים', '6-12 חודשים', 'מעל שנה'];
  const budgetOptions = ['עד 10,000 ₪', '10,000-50,000 ₪', '50,000-100,000 ₪', '100,000-500,000 ₪', 'מעל 500,000 ₪'];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
        🔹 מטרות הטמעת AI בארגון
      </h3>
      
      <div>
        <Label className="text-white font-heebo mb-3 block">
          מה המטרה העיקרית שלכם מהטמעת AI? (ניתן לבחור כמה תשובות)
        </Label>
        <div className="space-y-2">
          {aiGoalsOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={`goals-${option}`}
                checked={formData.aiGoals.includes(option)}
                onCheckedChange={(checked) => onCheckboxChange('aiGoals', option, checked)}
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
          onChange={(e) => onInputChange('specificNeeds', e.target.value)}
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
          onValueChange={(value) => onInputChange('timelineExpectation', value)}
          className="space-y-2"
        >
          {timelineOptions.map((option) => (
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
          onValueChange={(value) => onInputChange('budgetRange', value)}
          className="space-y-2"
        >
          {budgetOptions.map((option) => (
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
          onChange={(e) => onInputChange('successMetrics', e.target.value)}
          className="bg-navy-dark text-white border-gold/30"
          rows={3}
        />
      </div>
    </div>
  );
};

export default AIGoalsSection;
