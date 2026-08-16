import ContNav from '../Components/ContNav';
import Footer from '../Components/Footer';
import CreateNewPasswordForm from '../Components/forms/CreateNewPasswordForm';

export default function CreateNewPasswordPage() {
  return (
    <div>
        <div>
            <ContNav/>
        </div>

       <div>
        <CreateNewPasswordForm/>
       </div>

        <div>
            <Footer/>
        </div>
    </div>
  );
}
