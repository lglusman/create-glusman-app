import { ChangeEvent, useReducer, useEffect } from "react";

export const useForm = (initialState: any) => {
  const reducer = (
    state: typeof initialState,
    payload: { field: string; value: string }
  ) => {
    return {
      ...state,
      [payload.field]: payload.value,
    };
  };

  useEffect(() => {
    Object.keys(initialState).forEach((key) => {
      dispatch({ field: key, value: initialState[key] });
    });
    
  }, [initialState])
  

  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  return {
    state,
    bind: {
      onChange: handleChange,
    },
  };
};