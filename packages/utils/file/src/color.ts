export const colorsExtension: Record<string, string> = {
  psd: '#467faf',
  jpg: '#73ba96',
  ai: '#cf8b47',
  png: '#df7971',
  bmp: '#c2c859',
  dwg: '#526f88',
  gif: '#6e784a',
  eps: '#ed9669',
  tiff: '#84a284',

  ots: '#8e9d3a',
  php: '#3d5d8e',
  py: '#5d9451',
  c: '#ca394f',
  sql: '#527ca1',
  rb: '#0e7580',
  cpp: '#0b6994',
  css: '#aaac79',
  java: '#ed4f24',

  tga: '#e9b334',
  dxf: '#c77c81',
  doc: '#51add4',
  pdf: '#e93f5e',
  key: '#669887',
  odt: '#5a8090',
  xls: '#96c03e',
  docx: '#4494b5',
  ppt: '#e0682b',

  asp: '#516288',
  ics: '#05465b',
  dat: '#b9cd2d',
  xml: '#d88726',
  yml: '#9b5a2b',
  h: '#bc3127',
  exe: '#ddaf1e',
  avi: '#f8bc80',
  mp4: '#982948',

  odp: '#8e476a',
  dotx: '#356853',
  xlsx: '#80a430',
  ods: '#80a430',
  pps: '#f5b73f',
  otp: '#179d7b',
  dot: '#396b57',
  txt: '#18a196',
  rtf: '#788b73',

  mov: '#306e8e',
  m4v: '#7ac348',
  flv: '#af3d2c',
  mpg: '#462e54',
  qt: '#44748e',
  mp3: '#b3d543',
  mid: '#dd7441',
  '3g2': '#45e9eb',
  '3gp': '#2cd3d5',

  aiff: '#c65f8e',
  aac: '#799ea5',
  wav: '#9dc990',
  zip: '#efc41a',
  ott: '#666d87',
  tgz: '#ba6f3b',
  dmg: '#d35128',
  iso: '#abb8b5',
  rar: '#3f6ea5',
};

export const getColorByExtension = (extension: string): string =>
  colorsExtension[extension] || '#5E6B7E';
