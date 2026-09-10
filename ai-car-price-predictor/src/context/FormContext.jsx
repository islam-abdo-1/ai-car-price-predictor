import { createContext, useContext, useReducer, useCallback } from 'react';
import { DEFAULT_FORM_VALUES } from '../utils/constants';

const FormContext = createContext(null);

const initialState = {
  values: DEFAULT_FORM_VALUES,
  errors: {},
  touched: {},
  isSubmitting: false,
  isDirty: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD_VALUE': {
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        isDirty: true,
      };
    }
    case 'SET_FIELD_ERROR': {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };
    }
    case 'CLEAR_FIELD_ERROR': {
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    }
    case 'SET_TOUCHED': {
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    }
    case 'SET_SUBMITTING': {
      return {
        ...state,
        isSubmitting: action.value,
      };
    }
    case 'RESET_FORM': {
      return {
        ...initialState,
      };
    }
    case 'SET_VALUES': {
      return {
        ...state,
        values: { ...state.values, ...action.values },
        isDirty: true,
      };
    }
    default:
      return state;
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setFieldValue = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD_VALUE', field, value });
  }, []);

  const setFieldError = useCallback((field, error) => {
    dispatch({ type: 'SET_FIELD_ERROR', field, error });
  }, []);

  const clearFieldError = useCallback((field) => {
    dispatch({ type: 'CLEAR_FIELD_ERROR', field });
  }, []);

  const setTouched = useCallback((field) => {
    dispatch({ type: 'SET_TOUCHED', field });
  }, []);

  const setSubmitting = useCallback((value) => {
    dispatch({ type: 'SET_SUBMITTING', value });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const setValues = useCallback((values) => {
    dispatch({ type: 'SET_VALUES', values });
  }, []);

  const getFieldProps = useCallback((field) => ({
    value: state.values[field] ?? '',
    onChange: (e) => {
      const value = e?.target?.type === 'checkbox' ? e.target.checked : e?.target?.value ?? e;
      setFieldValue(field, value);
      if (state.errors[field]) {
        clearFieldError(field);
      }
    },
    onBlur: () => setTouched(field),
    error: state.touched[field] && state.errors[field],
  }), [state.errors, state.touched, setFieldValue, clearFieldError, setTouched]);

  return (
    <FormContext.Provider value={{
      ...state,
      setFieldValue,
      setFieldError,
      clearFieldError,
      setTouched,
      setSubmitting,
      resetForm,
      setValues,
      getFieldProps,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}