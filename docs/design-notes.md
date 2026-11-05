# Design and content

The second version follows the supplied reference images through a powder-pink and deep burgundy palette, condensed display headings, pill-shaped buttons, large product imagery, and full-width editorial sections. Pale yellow-green provides an accent.

The public writing uses complete sentences and adds practical relationship guidance, a clearly fictional adult relationship story, five boundary scripts, a seven-day starter plan, and expanded FAQs. Gift spending is not presented as proof of love, and abstinence is not presented as a guarantee of commitment or a measure of a person's worth.

The full ebook remains separate from the free website samples. The generated book image is explicitly labelled as a mockup representing a digital ebook.

## Book cover (second edition)

The current cover is an original illustrated design in a soft-pink, romance-novel style: an elegant serif title, the author name, a handwritten list that crosses out “prove you love me” and “just this once” and keeps “my choice.”, and a line illustration of a desk with an open workbook (“I am choosing to wait because…”), a cup of tea, a single tulip, a face-down phone and a framed heart reading “you set the pace”.

- `public/images/choosing-abstinence-cover.webp`: the flat front cover (1200×1800), ready for the ebook itself.
- `public/images/choosing-abstinence-book-standing.webp`: the standing book with the burgundy ball, on a transparent background, used in the hero.
- `public/images/choosing-abstinence-book-flatlay.webp`: the book lying on white bedsheets, used in the guide section.

The editable sources are in `design/book-cover/` (HTML and CSS rendered to images in a browser; render `cover.html` to `cover.png` first, because the two mockups use it). Fonts: Cormorant Garamond, Caveat and DM Sans from Google Fonts (Open Font License).

## Artwork and butterflies

The founder chose five images to give the page a softer, more feminine mood. They were added to the project folder as `image.png`, `download.jpg`, `Divine Feminine Energy.jpg`, `image-1.png` and `magnolia parks.jpg`, and converted into `public/images/art/`:

| File | From | Where it appears | Changes made |
| --- | --- | --- | --- |
| `butterfly-smoke.webp` | `download.jpg` (flowing pink butterfly) | Floats in the hero and the closing section | Its pale background was evened out to pure white so `mix-blend-mode: multiply` melts it into the pink. |
| `butterfly-glow.webp` | `image.png` (pink butterfly on black) | Glows beside "Your worth does not depend on your sexual history." | Cropped to the butterfly; blacks deepened so `mix-blend-mode: screen` leaves only its light on the wine. |
| `moon-woman.webp` | `Divine Feminine Energy.jpg` | Gallery, arch frame ("Take your time.") | Portrait crop; hue moved slightly from violet towards rose. |
| `rose-woman.webp` | `image-1.png` | Gallery, oval frame ("Choose yourself first.") | The black screenshot bar at the top was removed. The mark at the bottom was kept. |
| `lily-painting.webp` | `magnolia parks.jpg` | Gallery, taped print ("Rest in your decision.") | Hue nudged slightly towards pink. |

The gallery text, alt text and credits live in `lib/art.ts`. **These pictures appear to come from other artists. Before the site goes public, confirm permission to use each one and add the artist's name to its `credit` field** (a filled-in credit is shown under the picture). Do not remove artists' signatures or watermarks.

Motion: the gallery frames unveil from the bottom up as they scroll into view, each picture drifts slightly inside its frame (`data-depth`), and small stars twinkle. With reduced motion turned on, everything is shown still.

## Earlier image asset

The first-edition mockup below is no longer shown on the page but is still the social-sharing image on the live site.


`public/images/choosing-abstinence-book.webp` was created with the built-in image-generation tool and converted to WebP for faster loading. The original generated image remains separate from the repository.

Prompt: Create a premium photorealistic 3D product image for the digital ebook Choosing Abstinence. A powder-pink book stands upright on a seamless pale pink studio floor, slightly rotated to reveal its thin spine and front cover. Bold condensed burgundy cover typography reads “CHOOSING ABSTINENCE.” Smaller text reads “Your body. Your boundaries. Your choice.” and “THE GUIDE & WORKBOOK”. Include a minimal embossed heart outline and a glossy burgundy sphere beside the book. Use soft directional light, tactile paper and a long soft shadow. Show the whole book in a landscape composition. Do not include people, webpage controls, browser windows or unrelated logos.

## Typography

Barlow Condensed ExtraBold and DM Sans are self-hosted. Their Open Font License files are included beside the fonts in `public/fonts/`.

## Privacy

The script picker and checklist use page memory only. They reset on reload. The server receives no script identifier, checklist state, free-text answer or persistent visitor identifier. Analytics records only generic `script_copy` and `plan_download` events alongside the existing event kinds. Each of these interaction events is recorded at most once per page load by its client control. Copy counts are recorded after a successful clipboard operation; plan-download counts describe downloads started, not proof that a file was saved.
