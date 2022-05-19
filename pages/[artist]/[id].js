import Head from "next/head";
import Link from "next/link"
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllSongIds, getSongData } from "../../utils/songs";
import MetaData from "../../components/metadata"
import Song from "../../components/song"

export const getStaticProps = async ({ params }) => {
  const songData = await getSongData(params.artist, params.id);
  return {
    props: {
      songData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllSongIds();
  return {
    paths,
    fallback: false,
  };
};

export default function Chords({ songData }) {
  const { artist, title, content, tabAuthor, tabAuthorUrl, originalUrl, capoFret } = songData;
  const metadata = {
    tabAuthor,
    tabAuthorUrl,
    originalUrl,
    capoFret
  }
  console.log(songData)
  return (
    <Layout>
      <Head>
        <title>Chords! - {artist} - {title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <Link href={`/${artist}`}>
          <a className={utilStyles.lightText}>{artist}</a>
        </Link>
        <MetaData metadata={metadata} />
        <Song song={content} />
      </article>
    </Layout>
  );
}
