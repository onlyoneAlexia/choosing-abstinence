import { artPieces, butterflies } from '../../lib/art';

/** Small twinkling stars. Their positions are set in globals.css for each place they are used. */
export function Sparkles({ count, className = '' }: { count: number; className?: string }) {
  return <span className={`sparkles ${className}`.trim()} aria-hidden="true">
    {Array.from({ length: count }, (_, i) => <span className="sparkle" key={i}/>)}
  </span>;
}

/** The flowing pink butterfly that drifts over the hero and the closing section. Purely decorative. */
export function FloatingButterfly({ className }: { className: string }) {
  const { src, width, height } = butterflies.smoke;
  return <span className={`floating-butterfly ${className}`} aria-hidden="true">
    <img src={src} alt="" width={width} height={height} decoding="async"/>
    <Sparkles count={3}/>
  </span>;
}

export default function ArtGallery() {
  return <section className="art-section section-pad" aria-labelledby="art-heading">
    <Sparkles count={7} className="art-sparkles"/>
    <div className="section-heading">
      <div>
        <span className="eyebrow"><i/> A softer place to land.</span>
        <h2 id="art-heading">Gentle with yourself. <span>Firm with your no.</span></h2>
      </div>
      <p>Choosing to wait is not only about what you refuse. It is also about what you protect: your peace, your plans and your right to love at your own pace.</p>
    </div>
    <div className="art-gallery">
      {artPieces.map((piece, index) => <figure className={`art-piece art-${piece.shape}`} key={piece.src}>
        <div className="art-frame" data-depth={piece.depth}>
          <img src={piece.src} alt={piece.alt} width={piece.width} height={piece.height} loading="lazy" decoding="async"/>
        </div>
        <figcaption>
          <span className="art-number">0{index + 1}</span>
          <strong>{piece.title}</strong>
          <span className="art-text">{piece.text}</span>
          {piece.credit && <small>Artwork by {piece.credit}.</small>}
        </figcaption>
      </figure>)}
    </div>
  </section>;
}
