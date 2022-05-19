import utilStyles from "../styles/utils.module.css";

export default function MetaData({ metadata }) {
    const {
        tabAuthor,
        tabAuthorUrl,
        originalUrl,
        capoFret
    } = metadata
    return (
        <div className={utilStyles.metadata}>
            {tabAuthor && <p>Chords courtesy of {tabAuthorUrl ? <a href={tabAuthorUrl}>{tabAuthor}</a> : { tabAuthor }}</p>}
            {originalUrl && (<p>Original URL:
                {' '}<a href={originalUrl} target="_blank">{originalUrl}</a>
            </p>)}
            {capoFret && <div className={utilStyles.highlight}>Place capo on fret {capoFret}</div>}
        </div>)
}