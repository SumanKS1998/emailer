export const validateInput = (value, setError, fieldName) => {
  if (!value.trim()) {
    setError(`${fieldName} cannot be empty.`);
    return false;
  }
  setError("");
  return true;
};
