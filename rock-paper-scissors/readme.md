# Rock! Paper! Scissors!

I am progressing thru the Foundations section of [The Odin Project](https://www.theodinproject.com) and this is the first project that I have completed with a user interface.

Per the instructions, it was supposed to be simple GUI -- focus was to be the JavsScript-based game play -- but I got a little extra with my HTML and CSS. _Very extra._ (I suppose my justification is that I had writtwn very little DOM manipulation code, so I was making up for lost time.)

## Among the things I learned to do:

### The site in both light and dark mode:

![Light and Dark Modes](/img/Light_and_Dark_modes.png)

---

![Mobile Layout](/img/Mobile_layout.png)

### Responsve design, including...

1.  swapping the position of the user buttons from top to bottom of the screen (I'd like to think of this as a UX improvement and yeah, I guess I'm a fan of flexbox now).
2.  Switching the buttons to a column layout and the full width of the available viewport (minus padding for existing box elements) when said viewport is less than 550px wide.
3.  shrinking the computer choice window to only show one button instead of 3 (as with the player section)
4.  I stumbled upon a [Fluid Type Calculator](https://websemantics.uk/tools/responsive-font-calculator/) based on the work of Michael Riethmuller, which allowed me to greatly enhance my CSS code, as all 'sizes' (svg icons, padding, margins, borders) are calculation based on the font size.
    1. This allows the site to be zoomed in or out via the browser (150%, etc.) and still work well without any hiccups at all.
5.  Built a toggle between light and dark mode (upper right corner), using [a blog post by Ryan Feigenbaum](https://ryanfeigenbaum.com/dark-mode/) as my North Star.
6.  I added (what I think is) a subtle click sound to when the user chooses rock, paper, or scissors. And, as anyone who's ever been busted at work with the sound on knows, you need to have a button to toggle the sound off (it's on the upper left).
7.  Finally, from a UX perspective, I made sure the reset button -- who doesn't want to reset if they're losing? -- triggers a modal to confirm that the user does indeed want to reset and didn't just click the button by mistake.
    ![Modal window](/img/Modal.png)
8.  Since this is a kid's game, I wanted a 'fun' font, and went with [Grandstander](https://fonts.google.com/specimen/Grandstander?query=grandstan) from Google Fonts. Not a font that I would consider using in any other type of project (I'm a geometic Sans Serif person) but I think it turned out well here.
9.  Being a kid's game, I wanted the colors to have 'pop' hence the almost flurescent quality to the light mode colors (something I learned from [Elizabeth of DesignerUp](https://designerup.co/blog/practical-guide-to-perfect-ui-color-palettes/)). Trying to get Dark Mode correct -- and I'm a _huge_ Dark Mode person (I avoid sites that don't have a dark mode) -- was **really** hard. I learned a lot about how to desaturate colors and adjust lightness.
10. I am now, to paraphrase one of [Kevin Powell's](https://www.kevinpowell.co/) sayings, "madly, deeply in love with CSS" variables. My girlfriend would be jealous, so I haven't told her...

---

### From a JavaScript perspective:

1. Deep diving into DOM manipulation was very satisfying -- am I jinxing my career by saying that? -- even if it took _forever_ to get everything right because of the numerous color and visibility changes that I had mapped out.
2. Wrapping my head around how to stagger the game play -- via `setTimeout()` -- rather than everything happening in 1.2389ms or so and overwhelming the user was, shall we say, _an experience._ This is the newbie in me talking, but in the end I am happy with how the elements of a round turned out. If I look back at this code in 2 years tho...
3. I also tried to use functional programming as much as possible in order to follow DRY. Perhaps I could have switched a few things over to arrays tho...
4. Naming variables so that they are both descriptive yet not overly complex is **_hard_**.

---

Anyway, if you've read this far and can take the time to play the game, please let me know what you think. If not here, then on [Twitter](https://twitter.com/nkg_dev).

Thanks!
