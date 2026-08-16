import { useRef, useState } from 'react';
import { useVerifyOtpMutation } from '../App/api/Auth/auth';
import AuthLayout from '../Components/AuthLayout';
import { useNavigate } from 'react-router-dom';

const DIGIT_KEYS = ['firstNumber', 'secondNumber', 'thirdNumber', 'fouthNumber', 'firthNumber', 'sixthNumber'] as const;

type FormDataType = Record<(typeof DIGIT_KEYS)[number], string>;

export default function OtpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    firstNumber: '', secondNumber: '', thirdNumber: '', fouthNumber: '', firthNumber: '', sixthNumber: '',
  });
  const [error, setError] = useState('');
  const [verify, { isLoading }] = useVerifyOtpMutation();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(-1);
    const key = DIGIT_KEYS[index];
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (value && index < DIGIT_KEYS.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formData[DIGIT_KEYS[index]] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const code = DIGIT_KEYS.map((k) => formData[k]).join('');
    if (code.length !== 6) {
      setError('Enter all 6 digits');
      return;
    }

    try {
      await verify(Number(code)).unwrap();
      navigate('/newpassword');
    } catch {
      setError('That code didn\'t work. Please try again.');
    }
  };

  return (
    <AuthLayout title="OTP verification" subtitle="Enter the code sent to your email.">
      <form onSubmit={handleVerification}>
        <div className="flex gap-2 sm:gap-3 justify-center mb-6">
          {DIGIT_KEYS.map((key, i) => (
            <input
              key={key}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={formData[key]}
              onChange={handleChange(i)}
              onKeyDown={handleKeyDown(i)}
              className="border text-center text-[19px] focus:outline-none focus:ring-2 focus:ring-[#F09C00]/40 font-family-playfair font-bold border-[#F09C00] w-[13%] max-w-[48px] aspect-square rounded-xl"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-[13px] text-center mb-3">{error}</p>}

        <button
          disabled={isLoading}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
        >
          {isLoading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
          {isLoading ? 'Verifying…' : 'Verify OTP'}
        </button>
      </form>
    </AuthLayout>
  );
}
