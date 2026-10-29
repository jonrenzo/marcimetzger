# Marci Metzger landing page

Run `npm run dev` and open the printed local address. `npm run build` creates the production build; `npm start` serves it.

## Editing the page

- `app/page.tsx`: sections, content, contact details, and footer.
- `app/interactions.tsx`: directional header, mobile navigation, photo carousel, search preview, contact dialog, and scroll effects.
- `app/globals.css`: palette, type scale, grid, responsive rules, and motion.
- `app/layout.tsx`: title, description, and self-hosted fonts.

The revised design follows the Vista reference’s composition closely: full-screen hero, 130/40/24px gutters, 120/80/48px section spacing, large introductory text, alternating image/text sections, oversized outlined words, 3+2 service mosaic, 3/2-column gallery with a phone carousel, warm closing panel, and charcoal footer.

Colors come from the saved research: white, charcoal #1e1e1e, off-white #edebe4, gold #baa184, red #d43331 for the returned header, and blue #265073 for the mobile menu. Libre Franklin and Libre Baskerville match the reference’s body/accent families. Manrope is the open-font substitute for its Avenir headings. The page uses Marci’s own ridge motif and content from `home.md`; sales figures are labeled as 2021 results.

## Replacing the placeholders

1. Put photographs in `public/images/`.
2. Open `app/visuals.tsx` and find the `images` object.
3. Set a slot’s `src` to a public path, such as `/images/marci.jpg`, and write descriptive `alt` text.

Slots: `hero`, `aerial`, `portrait`, `buying`, `selling`, `exterior`, `interior`, `landscape`, `details`, `living`, and `outdoor`. Empty paths show labeled placeholders. Images fill their frames using `object-fit: cover`.

The hero fills the viewport, the aerial slot is wide and hidden below 992px, the three editorial images are square on desktop and 300px tall on smaller screens, and gallery frames use a 3:2 ratio. Adjust `object-position` for a slot’s image to tune its crop. The gallery captions describe editorial themes; these are not claimed listings.

## Mock behavior and interaction

Search previews selected criteria, validates price ranges, and resets filters. It has no live listing feed. “Send a message” opens a contact dialog with required name, email, and message inputs. Submitting confirms that nothing was sent or saved. No input is sent to a server, email service, browser storage, or analytics. Phone and directions links use the supplied business details.

The mobile menu and contact form use native modal dialogs for focus containment, Escape, and focus restoration. The phone gallery supports arrows, dots, keyboard arrows, and horizontal touch gestures; navigation wraps without autoplay. The header hides on downward scrolling after 150px and returns in its compact style on upward scrolling.

Content remains visible without animation. Reduced motion disables scroll displacement and transitions. Native scrolling replaces the reference’s Lenis behavior. No reference-site photographs, proprietary font files, cookie banners, or newsletter integrations are included.
