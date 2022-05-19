import Layout from "../../components/layout";
import Head from "next/head"
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import { getAllSongIds, getSongsByArtist } from "../../utils/songs";

export const getStaticProps = async ({params}) => {
    const songs = getSongsByArtist(params.artist)
    const {artist} = params
    return {
        props: {
            artist,
            songs
        }
    }
}

export const getStaticPaths = async () => {
    const paths = getAllSongIds();
    return {
      paths,
      fallback: false,
    };
  };

export default function ArtistIndexPage ({artist, songs}) {
    return (
        <Layout>
            <Head>
                <title>Chords! - {artist}</title>
            </Head>
            <article>
            <h1 className={utilStyles.headingXl}>{artist}</h1>
            <ul className={utilStyles.list}>
            {songs.map((title) => {
                console.log(title)
                return (
                <li className={utilStyles.listItem} key={title}>
                <Link href={`${artist}/${title}`}>
                  <a>
                    {title}
                  </a>
                </Link>
                <br />
              </li>
            ) 
        })
        }
            </ul>
            </article>
        </Layout>
    )
}