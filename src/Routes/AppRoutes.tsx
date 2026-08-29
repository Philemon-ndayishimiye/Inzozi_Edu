
import { Route , Routes } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import Registration from '../Pages/Registration';
import Login from '../Pages/Login';
import SchoolPage from '../Pages/SchoolPage';
import SchoolRegister from '../Pages/SchoolRegister';
import SuccessPage from '../Pages/SuccessPage';
import Pending from '../Pages/Pending';
import ResetPasswordPage from '../Pages/ResetPasswordPage';
import CreateNewPasswordPage from '../Pages/CreateNewPasswordPage';
import { SchoolAdminPage } from '../Pages/SchoolAdminPage';
import Admin from '../Pages/Admin';
import Settings from '../Pages/Settings';
import Application from '../Pages/Admin/Application';
import Dashboard from '../Pages/Admin/Dashboard';
import NotFound from '../Pages/NotFound';
import ProtectedRoute from '../Components/ProtectedRoutes';
import SchoolInfoPage from '../Pages/SchoolInfoPage';
import StudentApplication from '../Pages/StudentApplication';
import ApplicationConfirmation from '../Pages/ApplicationConfirmation';
import TrackApplication from '../Pages/TrackApplication';
 import HaveAccountPage from '../Pages/HaveAccount';
 import OtpPage from '../Pages/Otp';
 import SchoolProfile from '../Pages/Admin/SchoolProfile';
import { SuperAdminPage } from '../Pages/SuperAdminPage';
import SuperAdminDashboard from '../Pages/Admin/SuperAdminDashboard';
import SuperAdminSchool from '../Pages/superAdmin/SuperAdminSchool';
import Gallery from '../Pages/Admin/Gallery';
import ViewSchool from '../Pages/superAdmin/ViewSchool';
import Users from '../Pages/superAdmin/Users';
import Analytics from '../Pages/superAdmin/Analytics';
import SuperAdminSettings from '../Pages/superAdmin/SuperAdminSettings';
import ResetPasswordSuccessPagenp from '../Pages/ResetPasswordSuccessPage';
import StudentInfo from '../Pages/Admin/StudentInfo';
import Seats from '../Pages/Admin/Seats';
import AddSeats from '../Pages/Admin/AddSeats';
import AdmissionManager from '../Pages/Admin/AdmissionManager';
import SchoolApprovals from '../Pages/superAdmin/SchoolApprovals';
import AdmissionManagerPage from '../Pages/admissionManager/AdmissionManagerPage';
import AdmissionManagerDashboard from '../Pages/admissionManager/AdmissionManagerDashboard';
import AdmissionManagerApplicationDetail from '../Pages/admissionManager/AdmissionManagerApplicationDetail';
import SchoolManagerSettings from '../Pages/Admin/Settings';
import MustChangePassword from '../Pages/MustChangePassword';





export default function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/schoolManager' element={<SchoolPage/>}/>
            <Route path='/schoolRegister' element={<ProtectedRoute><SchoolRegister/></ProtectedRoute> }/>
            <Route path='/success' element={<SuccessPage/>}/>
            <Route path='/pending' element={ <ProtectedRoute><Pending/></ProtectedRoute> }/>
            <Route path='/viewSchool/:id' element={<SchoolInfoPage/>}/>
            <Route path='/reset' element={<ResetPasswordPage/>}/>
            <Route path='/newpassword' element={<CreateNewPasswordPage/>}/>
            <Route path='/haveaccount' element={<HaveAccountPage/>}/>
            <Route path='/verification' element={<OtpPage/>}/>
             <Route path='/resetSucess' element={<ResetPasswordSuccessPagenp/>}/>
             <Route path='/apply' element={<Application/>}/>
             <Route path='/apply/:schoolId' element={<StudentApplication/>}/>
             <Route path='/application/confirmation' element={<ApplicationConfirmation/>}/>
             <Route path='/track' element={<TrackApplication/>}/>
             <Route path='/must-change-password' element={ <ProtectedRoute><MustChangePassword/></ProtectedRoute> }/>

          
            <Route path='/schoolAdmin' element={
              <ProtectedRoute><SchoolAdminPage/></ProtectedRoute> }>
               <Route path='application' element={<Application />} />
               <Route path='dashboard' element={<Dashboard />} />
               <Route path='schoolProfile' element={<SchoolProfile/>} />
               <Route path='studentInfo/:ref' element={<StudentInfo/>} />
               <Route path='admissionManager' element={<AdmissionManager/>} />

               <Route path='gallery' element={<Gallery/>} />
               <Route path='seats' element={<Seats/>} />
               <Route path='addSeats' element={<AddSeats/>} />
               <Route path='settings' element={<SchoolManagerSettings/>} />
             </Route>
             <Route path='/superAdmin' element={
              <ProtectedRoute><SuperAdminPage/></ProtectedRoute> }>
                <Route path='dashboard' element={<SuperAdminDashboard/>} />
                <Route path='schoolApprovals' element={<SchoolApprovals/>} />
                <Route path='schools' element={<SuperAdminSchool/>} />
                <Route path='ViewSchool/:id' element={<ViewSchool/>} />
                <Route path='users' element={<Users/>} />
                <Route path='analytics' element={<Analytics/>} />
                <Route path='superSettings' element={<SuperAdminSettings/>} />
             </Route>
             <Route path='/admissionManager' element={
              <ProtectedRoute><AdmissionManagerPage/></ProtectedRoute> }>
                <Route path='dashboard' element={<AdmissionManagerDashboard/>} />
                <Route path='application/:ref' element={<AdmissionManagerApplicationDetail/>} />
                <Route path='seats' element={<Seats/>} />
                <Route path='addSeats' element={<AddSeats/>} />
             </Route>

            <Route path='/admin' element={<Admin/>}> </Route>
            <Route path='/setting' element={<Settings/>}> </Route>
            
        </Routes>
    </div>
  );
}
