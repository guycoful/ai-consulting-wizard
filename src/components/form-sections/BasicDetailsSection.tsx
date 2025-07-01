
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { FormData } from "@/hooks/useOrganizationForm";

interface BasicDetailsSectionProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const BasicDetailsSection = ({ formData, onInputChange }: BasicDetailsSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gold font-heebo mb-4">
        🔹 פרטים כלליים
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-white font-heebo mb-2 block">שם הארגון: *</Label>
          <Input
            value={formData.organizationName}
            onChange={(e) => onInputChange('organizationName', e.target.value)}
            className="bg-navy-dark text-white border-gold/30"
            required
          />
        </div>
        
        <div>
          <Label className="text-white font-heebo mb-2 block">איש הקשר: *</Label>
          <Input
            value={formData.contactPerson}
            onChange={(e) => onInputChange('contactPerson', e.target.value)}
            className="bg-navy-dark text-white border-gold/30"
            required
          />
        </div>
        
        <div>
          <Label className="text-white font-heebo mb-2 block">תפקיד:</Label>
          <Input
            value={formData.position}
            onChange={(e) => onInputChange('position', e.target.value)}
            className="bg-navy-dark text-white border-gold/30"
          />
        </div>
        
        <div>
          <Label className="text-white font-heebo mb-2 block">כתובת מייל: *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="bg-navy-dark text-white border-gold/30"
            required
          />
        </div>
        
        <div>
          <Label className="text-white font-heebo mb-2 block">מספר טלפון:</Label>
          <PhoneNumberInput
            value={formData.phone}
            onChange={(value) => onInputChange('phone', value)}
          />
        </div>
        
        <div>
          <Label className="text-white font-heebo mb-2 block">מספר עובדים (משוער):</Label>
          <Input
            type="number"
            min="1"
            value={formData.employeeCount}
            onChange={(e) => onInputChange('employeeCount', e.target.value)}
            className="bg-navy-dark text-white border-gold/30"
          />
        </div>
      </div>
      
      <div>
        <Label className="text-white font-heebo mb-2 block">תחום פעילות:</Label>
        <Input
          value={formData.industry}
          onChange={(e) => onInputChange('industry', e.target.value)}
          className="bg-navy-dark text-white border-gold/30"
        />
      </div>
    </div>
  );
};

export default BasicDetailsSection;
