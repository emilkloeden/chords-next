import fs from "fs";
import path from "path";
import matter from "gray-matter";

const chordsDirectory = path.join(process.cwd(), "chords");

export function getSortedSongsData() {
  const artists = fs.readdirSync(chordsDirectory);
  const allSongsData = artists.flatMap(artist => {
    const artistDirectory = path.join(chordsDirectory, artist)
    const fileNames = fs.readdirSync(artistDirectory);
    return fileNames.map((fileName) => {
      const id = fileName.replace(/.md$/, "");
      const fullPath = path.join(artistDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      
      return {
        id,
        ...matterResult.data,
      };
    });
  })
    
  return allSongsData.sort(({ artist: a }, { artist: b }) => {
    return a < b ? 1 : a > b ? -1 : 0;
  });
}

export function getAllSongIds() {
  const artists = fs.readdirSync(chordsDirectory);
  return artists.flatMap(artist => {
    const artistDirectory = path.join(chordsDirectory, artist)
    const fileNames = fs.readdirSync(artistDirectory);
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
          artist,
        },
      };
    });
  })
  }

export async function getSongData(artist, id) {
  const fullPath = path.join(chordsDirectory, artist, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const { content } = matterResult
  // const song = parseChords(content)
  
  return {
    artist,
    id,
    content,
    // song,
    ...matterResult.data,
  };
}

