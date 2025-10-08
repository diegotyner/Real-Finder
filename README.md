# Real-Finder

A personal utility for quickly indexing and searching the Jazz Real Book. Currently the fifth and sixth editions are indexed, more to come soon.

- Check out a minimal deployment [here](https://real-finder.vercel.app/)

The site is ugly, but that's part of its charm to me. Reminds me of all the CS professors who have a raw html website.

### Working:

A minimal finder for songs in the real book. Simply open up the index.html file and search for songs by entering queries into the input text area. When the song you were searching for pops up, click the link to jump to the song pdf.

Also working is the OCR pipeline to scan the table of contents and extract song names and page numbers.

- Run the General_OCR_Pipeline.ipynb
- Copy and paste the output into a TSV, and perform minimal cleaning on output (joining multiline songs for instance)
- Run the PDF splitting notebook

### Future:

Hopefully a more complete finder with options to search for composer, feel/genre, etc, as well as adding in additional real book editions. Certain classics aren't present in the indexed edition (like Just The Way You Are by Billy Joel). For now, you can try searching them on this similar site: [therealbook.info](https://therealbook.info/)
