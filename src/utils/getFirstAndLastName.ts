const getFirstAndLastName = (fullName: string | null | undefined) => {
  if (!fullName || !fullName.trim()?.length) {
    return "Nome não encontrado";
  }

  const trimmedName = fullName.trim();
  const nameParts = trimmedName.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0];
  }

  const firstName = nameParts[0];

  const lastName = nameParts[nameParts.length - 1];

  return `${firstName} ${lastName}`;
};

export default getFirstAndLastName;
