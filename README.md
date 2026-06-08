# Real-Finder

Live Site: [here](https://sheets.tynerlab.com/)

## About

The [Real Book](https://en.wikipedia.org/wiki/Real_Book) is a collection of lead sheets (music with the melody and chords) for various classic jazz tunes (like Autumn Leaves and Misty).

The Real Finder is a tool for searching, browsing, and building setlists from these hundreds of songs. Currently the second, third, fourth, fifth, and sixth editions are indexed.

> To find songs in alternate clefs or transposed, try [therealbook.info](https://therealbook.info/).

## Features

- Search and fuzzy-find songs across indexed editions
- Open song PDFs directly from search results
- Build and persist personal setlists
- `/legacy.html` — a no-build, no-framework version for direct use

## Tech

**Frontend:** Vite, Vue.js, Tailwind, Fuse.js

**Data Wrangling:** PaddlePaddle, PyMuPDF, rapidfuzz, pandas

## Pages

| Route                    | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `/`                      | Search homepage; includes PDF download links for 3rd, 5th, and 6th editions |
| `/Setlist/Personal`      | Your current setlist                                                        |
| `/Setlist/Example`       | An example setlist                                                          |
| `/index/{2\|3\|4\|5\|6}` | Browse all songs in a specific edition                                      |
| `/legacy.html`           | Legacy search page (no Vue)                                                 |

## OCR Pipeline

To index a new edition:

1. Run `/utility_notebooks/General_OCR_Pipeline.ipynb` on the raw PDF of the new edition
2. Paste the output into a TSV and do minimal cleaning (fix OCR errors, etc.).
3. Run `/utility_notebooks/PDF_Splitting.ipynb` using the page number outputs
4. Run `/utility_notebooks/JRB_Metadata_Joining.ipynb` to link found songs to an existing database of Jazz Standard chord changes (found [here](https://github.com/mikeoliphant/JazzStandards), thanks to mikeoliphant for compiling). It also merges songs listed under different names (e.g. _Girl From Ipanema, The_ → _The Girl From Ipanema_).
   - I'd recommend persisting change logs somewhere, like I've done in `src/data/log_of_manual_edits.txt`. These can be helpful when rerunning the pipeline for a future edition.
5. Run `/utility_notebooks/metadata2keyed.ipynb` to pre-index for the page view table

## Roadmap

I'm pretty happy with this project for my usecase (quickly pulling up tunes on my iPad), but if I were to continue it, here are the most likely next steps:

- Index additional editions
- Search by composer, feel, key, or genre
- A "progression finder" - see what standards have a Imaj7 -> III#5 -> IVmaj7 progression for instance (like Some Day My Prince Will Come)
- A "noodle saver" - jot down ideas in ABC notation and come back to them later
