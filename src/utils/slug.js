export const generarSlug = (texto) => {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quita acentos/tildes
    .replace(/[^a-z0-9 -]/g, "")     // Quita caracteres especiales
    .replace(/\s+/g, "-")            // Reemplaza espacios por guiones
    .replace(/-+/g, "-")             // Evita guiones múltiples
    .trim();                         // Quita espacios en extremos si los hubiera
};
