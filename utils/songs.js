import fs from "fs";
import path from "path";
import matter from "gray-matter";

const chordsDirectory = path.join(process.cwd(), "chords");

export function getSortedSongsData() {
  const fileNames = fs.readdirSync(chordsDirectory);
  const allSongsData = fileNames.map((fileName) => {
    const id = fileName.replace(/.md$/, "");
    const fullPath = path.join(chordsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allSongsData.sort(({ artist: a }, { artist: b }) => {
    return a < b ? 1 : a > b ? -1 : 0;
  });
}

export function getAllSongIds() {
  const fileNames = fs.readdirSync(chordsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getSongData(id) {
  const fullPath = path.join(chordsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const { content } = matterResult
  // const song = parseChords(content)
  
  return {
    id,
    content,
    // song,
    ...matterResult.data,
  };
}

