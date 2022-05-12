import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllSongIds, getSongData } from "../../utils/songs";
import Song from "../../components/song"

export const getStaticProps = async ({ params }) => {
  const songData = await getSongData(params.id);
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
  const { artist, title, content, song } = songData;
  return (
    <Layout>
      <Head>
        <title>Chords! - songData.</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>{artist}</div>
        <Song song={content} />
      </article>
    </Layout>
  );
}
