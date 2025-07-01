
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface FormData {
  // Basic Details
  organizationName: string;
  contactPerson: string;
  position: string;
  email: string;
  phone: string;
  employeeCount: string;
  industry: string;
  
  // Organization Activity and Current Challenges
  organizationActivity: string;
  targetAudience: string[];
  mainChallenges: string;
  
  // AI Implementation Goals
  aiGoals: string[];
  specificNeeds: string;
  timelineExpectation: string;
  budgetRange: string;
  successMetrics: string;
  
  // Current Infrastructure and Technical Requirements
  currentSystems: string[];
  dataTypes: string;
  securityRequirements: string;
  integrationNeeds: string;
  
  // Additional Information
  additionalInfo: string;
  consultationDate: Date | null;
  signature: string;
  signatureDate: Date;
}

const initialFormData: FormData = {
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
};

export const useOrganizationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);

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

  const validateForm = (): boolean => {
    // Basic validation
    if (!formData.organizationName || !formData.contactPerson || !formData.email) {
      toast({
        title: "שגיאה",
        description: "נא למלא את כל השדות החובה",
        variant: "destructive",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "שגיאה",
        description: "נא להזין כתובת מייל תקינה",
        variant: "destructive",
      });
      return false;
    }

    // Phone validation
    if (formData.phone && formData.phone.length < 10) {
      toast({
        title: "שגיאה",
        description: "נא להזין מספר טלפון תקין",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      console.log('Form Data:', formData);
      
      toast({
        title: "הטופס נשלח בהצלחה!",
        description: "נחזור אליך בהקדם עם המלצות מותאמות אישית",
      });
      
      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      toast({
        title: "תקלה בשליחת הטופס",
        description: "אנא נסה שוב או צור קשר ישירות",
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit
  };
};
