
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormData } from "@/hooks/useOrganizationForm";

interface ActivityChallengesSectionProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
  onCheckboxChange: (field: string, value: string, checked: boolean | string) => void;
}

const ActivityChallengesSection = ({ formData, onInputChange, onCheckboxChange }: ActivityChallengesSectionProps) => {
  const targetAudienceOptions = [
    'סטארט-אפים', 'חברות בינוניות', 'תאגידים גדולים', 
    'מוסדות ציבור', 'ארגונים ללא כוונת רווח', 'עצמאיים', 'אחר'
  ];

  return (
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
          onChange={(e) => onInputChange('organizationActivity', e.target.value)}
          className="bg-navy-dark text-white border-gold/30"
          rows={3}
        />
      </div>
      
      <div>
        <Label className="text-white font-heebo mb-3 block">
          מי הקהל הגדול של הארגון שלכם?
        </Label>
        <div className="space-y-2">
          {targetAudienceOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={`audience-${option}`}
                checked={formData.targetAudience.includes(option)}
                onCheckedChange={(checked) => onCheckboxChange('targetAudience', option, checked)}
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
          onChange={(e) => onInputChange('mainChallenges', e.target.value)}
          className="bg-navy-dark text-white border-gold/30"
          rows={3}
        />
      </div>
    </div>
  );
};

export default ActivityChallengesSection;
