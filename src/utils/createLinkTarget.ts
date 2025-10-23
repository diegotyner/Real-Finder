export const createLinkTarget = (
  song_name: string,
  page_num: number,
  edition: number,
) => {
  // Use a computed property for cleaned song name once
  const cleanedName = song_name.trim().replaceAll(" ", "_").toUpperCase();
  return `/jrb-${edition}-ed/${page_num}/${cleanedName}.pdf`;
};
