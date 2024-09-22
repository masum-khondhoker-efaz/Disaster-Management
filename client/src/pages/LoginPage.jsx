import LoginForm from '../components/LoginForm.jsx';

const LoginPage = ({ onLogin }) => {
    return (
        <div>
            <LoginForm onLogin={onLogin} />
        </div>
    );
};

export default LoginPage;
