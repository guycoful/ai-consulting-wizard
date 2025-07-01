
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from '@/lib/utils';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const PhoneNumberInput = ({ value, onChange, className }: PhoneNumberInputProps) => {
  const [error, setError] = useState('');

  const handleChange = (phoneValue: string | undefined) => {
    const phone = phoneValue || '';
    onChange(phone);
    
    // Basic validation
    if (phone && phone.length < 10) {
      setError('מספר טלפון לא תקין');
    } else {
      setError('');
    }
  };

  return (
    <div className="space-y-2">
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="IL"
        value={value}
        onChange={handleChange}
        className={cn(
          "phone-input",
          className
        )}
        style={{
          '--PhoneInput-color--focus': '#6D28D9',
          '--PhoneInputInternationalIconPhone-opacity': '0.8',
          '--PhoneInputInternationalIconGlobe-opacity': '0.65',
          '--PhoneInputCountrySelectArrow-color': '#6D28D9',
          '--PhoneInputCountrySelectArrow-color--focus': '#6D28D9',
        }}
      />
      {error && (
        <p className="text-red-400 text-sm font-heebo">{error}</p>
      )}
      
      <style jsx global>{`
        .phone-input .PhoneInputInput {
          border: 1px solid rgba(109, 40, 217, 0.3);
          background-color: #0A1F44;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          font-family: 'Heebo', sans-serif;
        }
        
        .phone-input .PhoneInputInput:focus {
          outline: none;
          border-color: #6D28D9;
          box-shadow: 0 0 0 2px rgba(109, 40, 217, 0.2);
        }
        
        .phone-input .PhoneInputCountrySelect {
          border: 1px solid rgba(109, 40, 217, 0.3);
          background-color: #0A1F44;
          color: white;
          border-radius: 0.375rem;
          margin-left: 0.5rem;
        }
        
        .phone-input .PhoneInputCountrySelect:focus {
          outline: none;
          border-color: #6D28D9;
        }
        
        .phone-input .PhoneInputCountrySelectArrow {
          color: #6D28D9;
        }
      `}</style>
    </div>
  );
};

export default PhoneNumberInput;
