import CrisisList from "../components/CrisisList.jsx";
import CrisisForm from "../components/CrisisForm.jsx";
import '../assets/CrisisPage.css';
const CrisisPage = () => {
    return (
        <div className="crisis-page-wrapper">
            <CrisisList />
            <CrisisForm />
        </div>
    );
};
export default CrisisPage;