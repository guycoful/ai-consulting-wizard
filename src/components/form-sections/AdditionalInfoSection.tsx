
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DigitalSignature from "@/components/DigitalSignature";
import { FormData } from "@/hooks/useOrganizationForm";

interface AdditionalInfoSectionProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const AdditionalInfoSection = ({ formData, onInputChange }: AdditionalInfoSectionProps) => {
  return (
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
          onChange={(e) => onInputChange('additionalInfo', e.target.value)}
          className="bg-navy-dark text-white border-gold/30"
          rows={4}
        />
      </div>

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
                onSelect={(date) => onInputChange('consultationDate', date)}
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
          onSignatureChange={(signature) => onInputChange('signature', signature)}
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
  );
};

export default AdditionalInfoSection;
