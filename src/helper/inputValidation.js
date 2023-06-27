export const validateInput = (value, setError, fieldName) => {
  if (!value.trim()) {
    setError(`${fieldName} can not be empty.`);
    return false;
  }
  setError("");
  return true;
};
