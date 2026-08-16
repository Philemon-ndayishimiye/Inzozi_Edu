
import { useUser } from '../Hooks/useUser';


export default function Admin() {
  const{user}= useUser();

  console.log(user);
  return (
    <div>Admin Page</div>
  );
}
