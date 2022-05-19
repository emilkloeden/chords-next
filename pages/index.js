import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedSongsData } from "../utils/songs";

export const getStaticProps = () => {
  const allSongsData = getSortedSongsData();
  return {
    props: {
      allSongsData,
    },
  };
};

export default function Home({ allSongsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>A portfolio project displaying guitar chords with finger-positions on-hover.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Chords</h2>
        <ul className={utilStyles.list}>
          {allSongsData.map(({ id, artist, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/${artist}/${id}`}>
                <a>
                  {artist} - {title}
                </a>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
