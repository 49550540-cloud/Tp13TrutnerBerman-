// Normaliza texto para comparar respuestas: minúsculas, sin acentos ni signos.
export function normalize(text) {
  return (text || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// La API devuelve SVGs de Wikimedia. El componente Image de React Native no
// dibuja SVG, así que pedimos la miniatura PNG que Wikimedia genera para cada
// archivo (misma imagen, otro formato).
export function flagPngUrl(url) {
  const clean = (url || '').trim();
  const match = clean.match(
    /^https:\/\/upload\.wikimedia\.org\/wikipedia\/(commons|en)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+\.svg)$/
  );
  if (!match) return clean;
  const [, project, a, ab, file] = match;
  return `https://upload.wikimedia.org/wikipedia/${project}/thumb/${a}/${ab}/${file}/330px-${file}.png`;
}

// Respaldo por si Wikimedia no responde: imagen PNG de la bandera según el ISO2.
export function fallbackFlagUrl(iso2) {
  return `https://flagcdn.com/w320/${(iso2 || '').toLowerCase()}.png`;
}
