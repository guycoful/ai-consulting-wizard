
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganizationForm } from "@/hooks/useOrganizationForm";
import BasicDetailsSection from "@/components/form-sections/BasicDetailsSection";
import ActivityChallengesSection from "@/components/form-sections/ActivityChallengesSection";
import AIGoalsSection from "@/components/form-sections/AIGoalsSection";
import InfrastructureSection from "@/components/form-sections/InfrastructureSection";
import AdditionalInfoSection from "@/components/form-sections/AdditionalInfoSection";

const OrganizationForm = () => {
  const { formData, handleInputChange, handleCheckboxChange, handleSubmit } = useOrganizationForm();

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
              <BasicDetailsSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <ActivityChallengesSection 
                formData={formData} 
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />

              <AIGoalsSection 
                formData={formData} 
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />

              <InfrastructureSection 
                formData={formData} 
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />

              <AdditionalInfoSection 
                formData={formData} 
                onInputChange={handleInputChange}
              />

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
