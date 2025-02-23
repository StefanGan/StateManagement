import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const NavigationGuard = ({children, requiredFields, redirectTo}) => {
  const navigate = useNavigate();
  const questionnaire = useSelector(state => state.questionnaire);

  useEffect(() => {
    const hasRequiredFields = requiredFields.every(field => {
      const value = questionnaire[field];
      return Array.isArray(value) ? value.length > 0 : value !== null;
    });

    if (!hasRequiredFields) {
      navigate(redirectTo);
    }
  }, [navigate, requiredFields, redirectTo, questionnaire]);

  return children;
};

export default NavigationGuard;
