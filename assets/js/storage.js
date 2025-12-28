function CacheThemeMode(mode) {
  CacheData("themeMode", mode);
}

function LoadCachedThemeMode() {
  return GetCachedData("themeMode");
}
function CacheFont(font) {
  CacheData("font", font);
}

function LoadCachedFontData() {
  return GetCachedData("font");
}

function CacheColors(primaryColor, secondaryColor) {
  CacheData("primaryColor", primaryColor);
  CacheData("secondaryColor", secondaryColor);
}

function LoadCachedColors() {
  const primaryColor = GetCachedData("primaryColor");
  const secondaryColor = GetCachedData("secondaryColor");
  return primaryColor && secondaryColor
    ? { primaryColor, secondaryColor }
    : null;
}

function CacheData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function GetCachedData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

const storage = {
  CacheColors,
  LoadCachedColors,
  CacheFont,
  LoadCachedFontData,
  CacheThemeMode,
  LoadCachedThemeMode,
};

export default storage;
