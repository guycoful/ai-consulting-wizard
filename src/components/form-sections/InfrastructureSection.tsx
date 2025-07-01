
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormData } from "@/hooks/useOrganizationForm";

interface InfrastructureSectionProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
  onCheckboxChange: (field: string, value: string, checked: boolean | string) => void;
}

const InfrastructureSection = ({ formData, onInputChange, onCheckboxChange }: InfrastructureSectionProps) => {
  const systemsOptions = [
    'ERP', 'CRM', 'מערכת Helpdesk', 'לוח בקרה', 
    'מערכת הנהלת חשבונות', 'גוגל / אופיס / מיקרוסופט / אחר', 'מערכת אחרת'
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
        🔹 תשתית וחוקרים קיימים
      </h3>
      
      <div>
        <Label className="text-white font-heebo mb-3 block">
          באילו מערכות אתם משתמשים כיום? (ניתן לבחור כמה תשובות)
        </Label>
        <div className="space-y-2">
          {systemsOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={`systems-${option}`}
                checked={formData.currentSystems.includes(option)}
                onCheckedChange={(checked) => onCheckboxChange('currentSystems', option, checked)}
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
          onChange={(e) => onInputChange('dataTypes', e.target.value)}
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
          onChange={(e) => onInputChange('securityRequirements', e.target.value)}
          className="bg-navy-dark text-white border-gold/30"
        />
      </div>
      
      <div>
        <Label className="text-white font-heebo mb-3 block">
          האם תרצו להתחבר למערכות קיימות? אם כן, אילו?
        </Label>
        <Textarea
          value={formData.integrationNeeds}
          onChange={(e) => onInputChange('integrationNeeds', e.target.value)}
          className="bg-navy-dark text-white border-gold/30"
          rows={3}
        />
      </div>
    </div>
  );
};

export default InfrastructureSection;
