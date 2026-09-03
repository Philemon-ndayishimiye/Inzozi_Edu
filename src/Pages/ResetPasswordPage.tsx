
import ResetPasswordForm from '../Components/forms/ResetPasswordForm';
import Navigation from '../Components/Navigation';

export default function ResetPasswordPage() {
  return (
    <div>
        <Navigation/>

        <div className="pt-[50px]">
            <ResetPasswordForm/>
        </div>
    </div>
  );
}
