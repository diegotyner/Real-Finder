const makeCaps = (str: string) => {
  if (str.length >= 2 && "({[,".includes(str.charAt(0))) {
    return str[0] + str[1].toUpperCase() + str.slice(2);
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

export const titleCase = (str: string) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => makeCaps(word))
    .join(" ");
};

export const createLinkTarget = (
  song_name: string,
  page_num: number,
  edition: number,
) => {
  // Use a computed property for cleaned song name once
  const cleanedName = song_name.trim().replaceAll(" ", "_").toUpperCase();
  return `/jrb-${edition}-ed/${page_num}/${cleanedName}.pdf`;
};
